import React, { FC } from 'react';
import config from 'app/core/config';
import { Button, LinkButton, Form, Field, Input, HorizontalGroup } from '@grafana/ui';
import { ChangePasswordFields } from 'app/core/utils/UserProvider';
import { css } from 'emotion';

export interface Props {
  isSaving: boolean;
  onChangePassword: (payload: ChangePasswordFields) => void;
}

export const ChangePasswordForm: FC<Props> = ({ onChangePassword, isSaving }) => {
  const { ldapEnabled, authProxyEnabled } = config;

  if (ldapEnabled || authProxyEnabled) {
    return <p>启用ldap或auth代理身份验证时，无法更改密码。</p>;
  }
  return (
    <div
      className={css`
        max-width: 400px;
      `}
    >
      <Form onSubmit={onChangePassword}>
        {({ register, errors, getValues }) => {
          return (
            <>
              <Field label="旧密码" invalid={!!errors.oldPassword} error={errors?.oldPassword?.message}>
                <Input type="password" name="oldPassword" ref={register({ required: '旧密码必填项' })} />
              </Field>

              <Field label="新密码" invalid={!!errors.newPassword} error={errors?.newPassword?.message}>
                <Input
                  type="password"
                  name="newPassword"
                  ref={register({
                    required: '新密码必填项',
                    validate: {
                      confirm: v => v === getValues().confirmNew || '密码必须匹配',
                      old: v => v !== getValues().oldPassword || `新密码不能与旧密码相同。`,
                    },
                  })}
                />
              </Field>

              <Field label="确认密码" invalid={!!errors.confirmNew} error={errors?.confirmNew?.message}>
                <Input
                  type="password"
                  name="confirmNew"
                  ref={register({
                    required: '需要新的密码确认',
                    validate: v => v === getValues().newPassword || '密码必须匹配',
                  })}
                />
              </Field>
              <HorizontalGroup>
                <Button variant="primary" disabled={isSaving}>
                  更改密码
                </Button>
                <LinkButton variant="secondary" href={`${config.appSubUrl}/profile`}>
                  取消
                </LinkButton>
              </HorizontalGroup>
            </>
          );
        }}
      </Form>
    </div>
  );
};
