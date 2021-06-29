import React, { PureComponent } from 'react';
import { User, UserSession } from 'app/types';
import { LoadingPlaceholder, Button, Icon } from '@grafana/ui';

export interface Props {
  user: User;
  sessions: UserSession[];
  isLoading: boolean;
  loadSessions: () => void;
  revokeUserSession: (tokenId: number) => void;
}

export class UserSessions extends PureComponent<Props> {
  componentDidMount() {
    this.props.loadSessions();
  }

  render() {
    const { isLoading, sessions, revokeUserSession } = this.props;

    if (isLoading) {
      return <LoadingPlaceholder text="加载会话..." />;
    }

    return (
      <>
        {sessions.length > 0 && (
          <>
            <h3 className="page-sub-heading">会话</h3>
            <div className="gf-form-group">
              <table className="filter-table form-inline">
                <thead>
                  <tr>
                    <th>最后一次</th>
                    <th>登陆</th>
                    <th>IP地址</th>
                    <th>浏览器 &amp; 系统信息</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {sessions.map((session: UserSession, index) => (
                    <tr key={index}>
                      {session.isActive ? <td>现在</td> : <td>{session.seenAt}</td>}
                      <td>{session.createdAt}</td>
                      <td>{session.clientIp}</td>
                      <td>
                        {session.browser} on {session.os} {session.osVersion}
                      </td>
                      <td>
                        <Button size="sm" variant="destructive" onClick={() => revokeUserSession(session.id)}>
                          <Icon name="power" />
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </>
        )}
      </>
    );
  }
}

export default UserSessions;
