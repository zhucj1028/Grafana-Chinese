import React, { PureComponent } from 'react';
import { dateTimeFormat } from '@grafana/data';
import { SyncInfo, UserDTO } from 'app/types';
import { Button, LinkButton } from '@grafana/ui';

interface Props {
  ldapSyncInfo: SyncInfo;
  user: UserDTO;
  onUserSync: () => void;
}

interface State {}

const format = 'dddd YYYY-MM-DD HH:mm zz';
const debugLDAPMappingBaseURL = '/admin/ldap';

export class UserLdapSyncInfo extends PureComponent<Props, State> {
  onUserSync = () => {
    this.props.onUserSync();
  };

  render() {
    const { ldapSyncInfo, user } = this.props;
    const prevSyncSuccessful = ldapSyncInfo && ldapSyncInfo.prevSync;
    const nextSyncSuccessful = ldapSyncInfo && ldapSyncInfo.nextSync;
    const nextSyncTime = nextSyncSuccessful ? dateTimeFormat(ldapSyncInfo.nextSync, { format }) : '';
    const prevSyncTime = prevSyncSuccessful ? dateTimeFormat(ldapSyncInfo.prevSync!.started, { format }) : '';
    const debugLDAPMappingURL = `${debugLDAPMappingBaseURL}?user=${user && user.login}`;

    return (
      <>
        <h3 className="page-heading">LDAP同步</h3>
        <div className="gf-form-group">
          <div className="gf-form">
            <table className="filter-table form-inline">
              <tbody>
                <tr>
                  <td>外部同步</td>
                  <td>用户通过LDAP同步-必须在LDAP或映射中进行一些更改。</td>
                  <td>
                    <span className="label label-tag">LDAP</span>
                  </td>
                </tr>
                <tr>
                  {ldapSyncInfo.enabled ? (
                    <>
                      <td>下一步计划同步</td>
                      <td colSpan={2}>{nextSyncTime}</td>
                    </>
                  ) : (
                    <>
                      <td>下一步计划同步</td>
                      <td colSpan={2}>未启用</td>
                    </>
                  )}
                </tr>
                <tr>
                  {prevSyncSuccessful ? (
                    <>
                      <td>最后同步</td>
                      <td>{prevSyncTime}</td>
                      <td>成功</td>
                    </>
                  ) : (
                    <td colSpan={3}>最后同步</td>
                  )}
                </tr>
              </tbody>
            </table>
          </div>
          <div className="gf-form-button-row">
            <Button variant="secondary" onClick={this.onUserSync}>
              同步用户
            </Button>
            <LinkButton variant="secondary" href={debugLDAPMappingURL}>
              调试LDAP映射
            </LinkButton>
          </div>
        </div>
      </>
    );
  }
}
