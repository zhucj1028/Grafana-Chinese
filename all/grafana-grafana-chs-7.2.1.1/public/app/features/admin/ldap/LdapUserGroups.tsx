import React, { FC } from 'react';
import { Tooltip, Icon } from '@grafana/ui';
import { LdapRole } from 'app/types';

interface Props {
  groups: LdapRole[];
  showAttributeMapping?: boolean;
}

export const LdapUserGroups: FC<Props> = ({ groups, showAttributeMapping }) => {
  const items = showAttributeMapping ? groups : groups.filter(item => item.orgRole);

  return (
    <div className="gf-form-group">
      <div className="gf-form">
        <table className="filter-table form-inline">
          <thead>
            <tr>
              {showAttributeMapping && <th>LDAP组</th>}
              <th>
                组织
                <Tooltip placement="top" content="仅会使用组织的第一个匹配项" theme={'info'}>
                  <span className="gf-form-help-icon">
                    <Icon name="info-circle" />
                  </span>
                </Tooltip>
              </th>
              <th>角色</th>
            </tr>
          </thead>
          <tbody>
            {items.map((group, index) => {
              return (
                <tr key={`${group.orgId}-${index}`}>
                  {showAttributeMapping && (
                    <>
                      <td>{group.groupDN}</td>
                      {!group.orgRole && (
                        <>
                          <td />
                          <td>
                            <span className="text-warning">
                              没有匹配
                              <Tooltip placement="top" content="找不到匹配的组" theme={'info'}>
                                <span className="gf-form-help-icon">
                                  <Icon name="info-circle" />
                                </span>
                              </Tooltip>
                            </span>
                          </td>
                        </>
                      )}
                    </>
                  )}
                  {group.orgName && (
                    <>
                      <td>{group.orgName}</td>
                      <td>{group.orgRole}</td>
                    </>
                  )}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};
