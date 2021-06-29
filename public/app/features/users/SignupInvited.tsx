import React, { FC, useState } from 'react';
import { hot } from 'react-hot-loader';
import { connect, MapDispatchToProps, MapStateToProps } from 'react-redux';
import { StoreState } from 'app/types';
import { updateLocation } from 'app/core/actions';
import { getBackendSrv } from '@grafana/runtime';
import { Button, Field, Form, Input } from '@grafana/ui';
import { useAsync } from 'react-use';
import Page from 'app/core/components/Page/Page';
import { contextSrv } from 'app/core/core';
import { getConfig } from 'app/core/config';
import { UrlQueryValue } from '@grafana/data';

interface ConnectedProps {
  code?: UrlQueryValue;
}

interface DispatchProps {
  updateLocation: typeof updateLocation;
}

interface FormModel {
  email: string;
  name?: string;
  username: string;
  password?: string;
}

const navModel = {
  main: {
    icon: 'grafana',
    text: 'Invite',
    subTitle: '注册您的Grafana帐户',
    breadcrumbs: [{ title: 'Login', url: 'login' }],
  },
  node: {
    text: '',
  },
};

const SingupInvitedPageUnconnected: FC<DispatchProps & ConnectedProps> = ({ code }) => {
  const [initFormModel, setInitFormModel] = useState<FormModel>();
  const [greeting, setGreeting] = useState<string>();
  const [invitedBy, setInvitedBy] = useState<string>();
  useAsync(async () => {
    const invite = await getBackendSrv().get('/api/user/invite/' + code);
    setInitFormModel({
      email: invite.email,
      name: invite.name,
      username: invite.email,
    });

    setGreeting(invite.name || invite.email || invite.username);
    setInvitedBy(invite.invitedBy);
  }, []);

  const onSubmit = async (formData: FormModel) => {
    await getBackendSrv().post('/api/user/invite/complete', { ...formData, inviteCode: code });
    window.location.href = getConfig().appSubUrl + '/';
  };

  return (
    <Page navModel={navModel}>
      <Page.Contents>
        <h3 className="page-sub-heading">Hello {greeting || 'there'}.</h3>

        <div className="modal-tagline p-b-2">
          <em>{invitedBy || 'Someone'}</em> 邀请你加入Grafana和组织{' '}
          <span className="highlight-word">{contextSrv.user.orgName}</span>
          <br />
          请完成以下操作并选择密码以接受邀请并继续：
        </div>
        <Form defaultValues={initFormModel} onSubmit={onSubmit}>
          {({ register, errors }) => (
            <>
              <Field invalid={!!errors.email} error={errors.email && errors.email.message} label="电子邮件">
                <Input
                  placeholder="email@example.com"
                  name="email"
                  ref={register({
                    required: '电子邮件为必填项',
                    pattern: {
                      value: /^\S+@\S+$/,
                      message: '电子邮件无效',
                    },
                  })}
                />
              </Field>
              <Field invalid={!!errors.name} error={errors.name && errors.name.message} label="名字">
                <Input placeholder="名字（可选）" name="name" ref={register} />
              </Field>
              <Field invalid={!!errors.username} error={errors.username && errors.username.message} label="用户名">
                <Input placeholder="Username" name="username" ref={register({ required: '用户名必填项' })} />
              </Field>
              <Field invalid={!!errors.password} error={errors.password && errors.password.message} label="密码">
                <Input type="password" placeholder="密码" name="password" ref={register({ required: '密码必填项' })} />
              </Field>

              <Button type="submit">注册</Button>
            </>
          )}
        </Form>
      </Page.Contents>
    </Page>
  );
};

const mapStateToProps: MapStateToProps<ConnectedProps, {}, StoreState> = (state: StoreState) => ({
  code: state.location.routeParams.code,
});

const mapDispatchToProps: MapDispatchToProps<DispatchProps, {}> = {
  updateLocation,
};

export default hot(module)(connect(mapStateToProps, mapDispatchToProps)(SingupInvitedPageUnconnected));
