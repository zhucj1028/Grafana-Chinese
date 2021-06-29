import React, { FC, useState } from 'react';
import { OrgUser } from 'app/types';
import { OrgRolePicker } from '../admin/OrgRolePicker';
import { Button, ConfirmModal } from '@grafana/ui';
import { OrgRole } from '@grafana/data';

export interface Props {
  users: OrgUser[];
  onRoleChange: (role: OrgRole, user: OrgUser) => void;
  onRemoveUser: (user: OrgUser) => void;
}

const UsersTable: FC<Props> = props => {
  const { users, onRoleChange, onRemoveUser } = props;

  const [showRemoveModal, setShowRemoveModal] = useState<string | boolean>(false);
  return (
    <table className="filter-table form-inline">
      <thead>
        <tr>
          <th />
          <th>登陆</th>
          <th>电子邮件</th>
          <th>名字</th>
          <th>最近访问</th>
          <th>角色</th>
          <th style={{ width: '34px' }} />
        </tr>
      </thead>
      <tbody>
        {users.map((user, index) => {
          return (
            <tr key={`${user.userId}-${index}`}>
              <td className="width-2 text-center">
                <img className="filter-table__avatar" src={user.avatarUrl} />
              </td>
              <td className="max-width-6">
                <span className="ellipsis" title={user.login}>
                  {user.login}
                </span>
              </td>

              <td className="max-width-5">
                <span className="ellipsis" title={user.email}>
                  {user.email}
                </span>
              </td>
              <td className="max-width-5">
                <span className="ellipsis" title={user.name}>
                  {user.name}
                </span>
              </td>
              <td className="width-1">{user.lastSeenAtAge}</td>

              <td className="width-8">
                <OrgRolePicker value={user.role} onChange={newRole => onRoleChange(newRole, user)} />
              </td>

              <td>
                <Button size="sm" variant="destructive" onClick={() => setShowRemoveModal(user.login)} icon="times" />
                <ConfirmModal
                  body={`您确定要删除用户 ${user.login}?`}
                  confirmText="删除"
                  title="删除"
                  onDismiss={() => setShowRemoveModal(false)}
                  isOpen={user.login === showRemoveModal}
                  onConfirm={() => {
                    onRemoveUser(user);
                  }}
                />
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

export default UsersTable;
