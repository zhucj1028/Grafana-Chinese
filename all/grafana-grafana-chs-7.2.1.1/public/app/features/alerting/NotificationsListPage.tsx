import React, { useState, FC, useEffect } from 'react';
import EmptyListCTA from 'app/core/components/EmptyListCTA/EmptyListCTA';
import Page from 'app/core/components/Page/Page';
import { getBackendSrv } from '@grafana/runtime';
import { useAsyncFn } from 'react-use';
import { appEvents } from 'app/core/core';
import { useNavModel } from 'app/core/hooks/useNavModel';
import { HorizontalGroup, Button, LinkButton } from '@grafana/ui';
import { CoreEvents } from 'app/types';
import { AlertNotification } from 'app/types/alerting';

const NotificationsListPage: FC = () => {
  const navModel = useNavModel('channels');

  const [notifications, setNotifications] = useState<AlertNotification[]>([]);

  const getNotifications = async () => {
    return await getBackendSrv().get(`/api/alert-notifications`);
  };

  const [state, fetchNotifications] = useAsyncFn(getNotifications);
  useEffect(() => {
    fetchNotifications().then(res => {
      setNotifications(res);
    });
  }, []);

  const deleteNotification = (id: number) => {
    appEvents.emit(CoreEvents.showConfirmModal, {
      title: '删除',
      text: '您要删除此通知频道吗？',
      text2: `删除此通知频道不会从警报中删除对其的任何引用`,
      icon: 'trash-alt',
      confirmText: '删除',
      yesText: '删除',
      onConfirm: async () => {
        deleteNotificationConfirmed(id);
      },
    });
  };

  const deleteNotificationConfirmed = async (id: number) => {
    await getBackendSrv().delete(`/api/alert-notifications/${id}`);
    const notifications = await fetchNotifications();
    setNotifications(notifications);
  };

  return (
    <Page navModel={navModel}>
      <Page.Contents>
        {state.error && <p>{state.error}</p>}
        {!!notifications.length && (
          <>
            <div className="page-action-bar">
              <div className="page-action-bar__spacer" />
              <LinkButton icon="channel-add" href="alerting/notification/new">
                新通道
              </LinkButton>
            </div>
            <table className="filter-table filter-table--hover">
              <thead>
                <tr>
                  <th style={{ minWidth: '200px' }}>
                    <strong>名字</strong>
                  </th>
                  <th style={{ minWidth: '100px' }}>类型</th>
                  <th style={{ width: '1%' }}></th>
                </tr>
              </thead>
              <tbody>
                {notifications.map(notification => (
                  <tr key={notification.id}>
                    <td className="link-td">
                      <a href={`alerting/notification/${notification.id}/edit`}>{notification.name}</a>
                    </td>
                    <td className="link-td">
                      <a href={`alerting/notification/${notification.id}/edit`}>{notification.type}</a>
                    </td>
                    <td className="text-right">
                      <HorizontalGroup justify="flex-end">
                        {notification.isDefault && (
                          <Button disabled variant="secondary" size="sm">
                            默认
                          </Button>
                        )}
                        <Button
                          variant="destructive"
                          icon="times"
                          size="sm"
                          onClick={() => {
                            deleteNotification(notification.id);
                          }}
                        />
                      </HorizontalGroup>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </>
        )}

        {!(notifications.length || state.loading) && (
          <EmptyListCTA
            title="尚未定义通知频道"
            buttonIcon="channel-add"
            buttonLink="alerting/notification/new"
            buttonTitle="新增通道"
            proTip="您可以在警报通知中包含图像。"
            proTipLink="http://docs.grafana.org/alerting/notifications/"
            proTipLinkTitle="了解更多"
            proTipTarget="_blank"
          />
        )}
      </Page.Contents>
    </Page>
  );
};

export default NotificationsListPage;
