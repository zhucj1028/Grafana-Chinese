import React, { FC } from 'react';
import { connect } from 'react-redux';
import { Input, Field, Form, Button, FieldSet, VerticalGroup } from '@grafana/ui';

import { SharedPreferences } from 'app/core/components/SharedPreferences/SharedPreferences';
import { updateTeam } from './state/actions';
import { getRouteParamsId } from 'app/core/selectors/location';
import { getTeam } from './state/selectors';
import { Team } from 'app/types';

export interface Props {
  team: Team;
  updateTeam: typeof updateTeam;
}

export const TeamSettings: FC<Props> = ({ team, updateTeam }) => {
  return (
    <VerticalGroup>
      <FieldSet label="团队设置">
        <Form
          defaultValues={{ ...team }}
          onSubmit={(formTeam: Team) => {
            updateTeam(formTeam.name, formTeam.email);
          }}
        >
          {({ register }) => (
            <>
              <Field label="名字">
                <Input name="name" ref={register({ required: true })} />
              </Field>

              <Field label="电子邮件" description="这是可选的，主要用于设置团队资料的头像（通过gravatar服务）">
                <Input placeholder="team@email.com" type="email" name="email" ref={register} />
              </Field>
              <Button type="submit">更新</Button>
            </>
          )}
        </Form>
      </FieldSet>
      <SharedPreferences resourceUri={`teams/${team.id}`} />
    </VerticalGroup>
  );
};

function mapStateToProps(state: any) {
  const teamId = getRouteParamsId(state.location);

  return {
    team: getTeam(state.team, teamId),
  };
}

const mapDispatchToProps = {
  updateTeam,
};

export default connect(mapStateToProps, mapDispatchToProps)(TeamSettings);
