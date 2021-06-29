import React, { FC, SyntheticEvent } from 'react';
import { Tooltip, Form, Field, Input, VerticalGroup, Button, LinkButton } from '@grafana/ui';
import { selectors } from '@grafana/e2e-selectors';
import { submitButton } from '../Login/LoginForm';
interface Props {
  onSubmit: (pw: string) => void;
  onSkip?: (event?: SyntheticEvent) => void;
}

interface PasswordDTO {
  newPassword: string;
  confirmNew: string;
}

export const ChangePassword: FC<Props> = ({ onSubmit, onSkip }) => {
  const submit = (passwords: PasswordDTO) => {
    onSubmit(passwords.newPassword);
  };
  return (
    <Form onSubmit={submit}>
      {({ errors, register, getValues }) => (
        <>
          <Field label="新密码" invalid={!!errors.newPassword} error={errors?.newPassword?.message}>
            <Input
              autoFocus
              type="password"
              name="newPassword"
              ref={register({
                required: '新密码必填项',
              })}
            />
          </Field>
          <Field label="确认新密码" invalid={!!errors.confirmNew} error={errors?.confirmNew?.message}>
            <Input
              type="password"
              name="confirmNew"
              ref={register({
                required: '确认新密码必填项',
                validate: v => v === getValues().newPassword || '密码不匹配',
              })}
            />
          </Field>
          <VerticalGroup>
            <Button type="submit" className={submitButton}>
              提交
            </Button>

            {onSkip && (
              <Tooltip content="如果您跳过，则下次登录时将提示您更改密码。" placement="bottom">
                <LinkButton variant="link" onClick={onSkip} aria-label={selectors.pages.Login.skip}>
                  跳过
                </LinkButton>
              </Tooltip>
            )}
          </VerticalGroup>
        </>
      )}
    </Form>
  );
};
