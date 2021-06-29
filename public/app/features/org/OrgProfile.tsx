import React, { FC } from 'react';
import { Input, Field, FieldSet, Button, Form } from '@grafana/ui';

export interface Props {
  orgName: string;
  onSubmit: (orgName: string) => void;
}

interface FormDTO {
  orgName: string;
}

const OrgProfile: FC<Props> = ({ onSubmit, orgName }) => {
  return (
    <Form defaultValues={{ orgName }} onSubmit={({ orgName }: FormDTO) => onSubmit(orgName)}>
      {({ register }) => (
        <FieldSet label="组织概况">
          <Field label="组织名称">
            <Input name="orgName" type="text" ref={register({ required: true })} />
          </Field>

          <Button type="submit">更新组织名称</Button>
        </FieldSet>
      )}
    </Form>
  );
};

export default OrgProfile;
