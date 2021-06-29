import React, { FC } from 'react';
import { LdapPermissions } from 'app/types';
import { Icon } from '@grafana/ui';

interface Props {
  permissions: LdapPermissions;
}

export const LdapUserPermissions: FC<Props> = ({ permissions }) => {
  return (
    <div className="gf-form-group">
      <div className="gf-form">
        <table className="filter-table form-inline">
          <thead>
            <tr>
              <th colSpan={1}>权限</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="width-16"> Grafana管理员</td>
              <td>
                {permissions.isGrafanaAdmin ? (
                  <>
                    <Icon name="shield" /> 是
                  </>
                ) : (
                  '不是'
                )}
              </td>
            </tr>
            <tr>
              <td className="width-16">状态</td>
              <td>
                {permissions.isDisabled ? (
                  <>
                    <Icon name="times" /> 停用
                  </>
                ) : (
                  <>
                    <Icon name="check" /> 激活
                  </>
                )}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};
