import React, { FC } from 'react';
import { getBackendSrv } from '@grafana/runtime';
import Page from 'app/core/components/Page/Page';
import { Button, Input, Field, Form } from '@grafana/ui';
import { getConfig } from 'app/core/config';
import { StoreState } from 'app/types';
import { hot } from 'react-hot-loader';
import { connect } from 'react-redux';
import { NavModel } from '@grafana/data';
import { getNavModel } from '../../core/selectors/navModel';

const createOrg = async (newOrg: { name: string }) => {
  const result = await getBackendSrv().post('/api/orgs/', newOrg);

  await getBackendSrv().post('/api/user/using/' + result.orgId);
  window.location.href = getConfig().appSubUrl + '/org';
};

const validateOrg = async (orgName: string) => {
  try {
    await getBackendSrv().get(`api/orgs/name/${encodeURI(orgName)}`);
  } catch (error) {
    if (error.status === 404) {
      error.isHandled = true;
      return true;
    }
    return 'Something went wrong';
  }
  return 'Organization already exists';
};

interface PropsWithState {
  navModel: NavModel;
}

interface CreateOrgFormDTO {
  name: string;
}

export const NewOrgPage: FC<PropsWithState> = ({ navModel }) => {
  return (
    <Page navModel={navModel}>
      <Page.Contents>
        <h3 className="page-sub-heading">新组织</h3>

        <p className="playlist-description">
          每个组织都包含自己的仪表板，数据源和配置，并且不能在组织之间共享。
          尽管用户可能属于多个用户，但在多租户部署中最经常使用多个组织。{' '}
        </p>

        <Form<CreateOrgFormDTO> onSubmit={createOrg}>
          {({ register, errors }) => {
            return (
              <>
                <Field label="组织名称" invalid={!!errors.name} error={errors.name && errors.name.message}>
                  <Input
                    placeholder="组织名"
                    name="name"
                    ref={register({
                      required: '组织名称是必填项',
                      validate: async orgName => await validateOrg(orgName),
                    })}
                  />
                </Field>
                <Button type="submit">创建</Button>
              </>
            );
          }}
        </Form>
      </Page.Contents>
    </Page>
  );
};

const mapStateToProps = (state: StoreState) => {
  return { navModel: getNavModel(state.navIndex, 'global-orgs') };
};

export default hot(module)(connect(mapStateToProps)(NewOrgPage));
