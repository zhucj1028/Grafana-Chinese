import React, { PureComponent } from 'react';
import { dateTimeFormat } from '@grafana/data';
import { LdapUserSyncInfo } from 'app/types';
import { Icon } from '@grafana/ui';

interface Props {
  disableSync: boolean;
  syncInfo: LdapUserSyncInfo;
  onSync?: () => void;
}

interface State {
  isSyncing: boolean;
}

const format = 'dddd YYYY-MM-DD HH:mm zz';

export class UserSyncInfo extends PureComponent<Props, State> {
  state = {
    isSyncing: false,
  };

  onSyncClick = async () => {
    const { onSync } = this.props;
    this.setState({ isSyncing: true });
    try {
      if (onSync) {
        await onSync();
      }
    } finally {
      this.setState({ isSyncing: false });
    }
  };

  render() {
    const { syncInfo, disableSync } = this.props;
    const { isSyncing } = this.state;
    const nextSyncSuccessful = syncInfo && syncInfo.nextSync;
    const nextSyncTime = nextSyncSuccessful ? dateTimeFormat(syncInfo.nextSync!, { format }) : '';
    const prevSyncSuccessful = syncInfo && syncInfo.prevSync;
    const prevSyncTime = prevSyncSuccessful ? dateTimeFormat(syncInfo.prevSync!, { format }) : '';
    const isDisabled = isSyncing || disableSync;

    return (
      <>
        <button className={`btn btn-secondary pull-right`} onClick={this.onSyncClick} disabled={isDisabled}>
          <span className="btn-title">同步用户</span>
          {isSyncing && <Icon name="fa fa-spinner" className="fa-fw fa-spin run-icon" />}
        </button>

        <div className="clearfix" />

        <h3 className="page-heading">LDAP</h3>
        <div className="gf-form-group">
          <div className="gf-form">
            <table className="filter-table form-inline">
              <tbody>
                <tr>
                  <td>最后同步</td>
                  <td>{prevSyncTime}</td>
                  {prevSyncSuccessful && <td className="pull-right">成功</td>}
                </tr>
                <tr>
                  <td>下一步计划同步</td>
                  <td colSpan={2}>{nextSyncTime}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </>
    );
  }
}
