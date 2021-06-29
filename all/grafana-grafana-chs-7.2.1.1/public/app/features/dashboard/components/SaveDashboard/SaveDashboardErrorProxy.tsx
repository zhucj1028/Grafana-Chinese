import React, { useEffect } from 'react';
import { Button, ConfirmModal, HorizontalGroup, Modal, stylesFactory, useTheme } from '@grafana/ui';
import { GrafanaTheme } from '@grafana/data';
import { css } from 'emotion';
import { DashboardModel } from 'app/features/dashboard/state';
import { useDashboardSave } from './useDashboardSave';
import { SaveDashboardModalProps } from './types';
import { SaveDashboardAsButton } from './SaveDashboardButton';

interface SaveDashboardErrorProxyProps {
  /** original dashboard */
  dashboard: DashboardModel;
  /** dashboard save model with applied modifications, i.e. title */
  dashboardSaveModel: any;
  error: any;
  onDismiss: () => void;
}

export const SaveDashboardErrorProxy: React.FC<SaveDashboardErrorProxyProps> = ({
  dashboard,
  dashboardSaveModel,
  error,
  onDismiss,
}) => {
  const { onDashboardSave } = useDashboardSave(dashboard);

  useEffect(() => {
    if (error.data && isHandledError(error.data.status)) {
      error.isHandled = true;
    }
  }, []);

  return (
    <>
      {error.data && error.data.status === 'version-mismatch' && (
        <ConfirmModal
          isOpen={true}
          title="Conflict"
          body={
            <div>
              有人更新了此仪表板
              <br /> <small>您是否仍要保存此仪表板？</small>
            </div>
          }
          confirmText="保存 & 覆盖"
          onConfirm={async () => {
            await onDashboardSave(dashboardSaveModel, { overwrite: true }, dashboard);
            onDismiss();
          }}
          onDismiss={onDismiss}
        />
      )}
      {error.data && error.data.status === 'name-exists' && (
        <ConfirmModal
          isOpen={true}
          title="Conflict"
          body={
            <div>
              所选文件夹中具有相同名称的仪表板已经存在。 <br />
              <small>您是否仍要保存此仪表板？</small>
            </div>
          }
          confirmText="保存 & 覆盖"
          onConfirm={async () => {
            await onDashboardSave(dashboardSaveModel, { overwrite: true }, dashboard);
            onDismiss();
          }}
          onDismiss={onDismiss}
        />
      )}
      {error.data && error.data.status === 'plugin-dashboard' && (
        <ConfirmPluginDashboardSaveModal dashboard={dashboard} onDismiss={onDismiss} />
      )}
    </>
  );
};

const ConfirmPluginDashboardSaveModal: React.FC<SaveDashboardModalProps> = ({ onDismiss, dashboard }) => {
  const theme = useTheme();
  const { onDashboardSave } = useDashboardSave(dashboard);
  const styles = getConfirmPluginDashboardSaveModalStyles(theme);

  return (
    <Modal className={styles.modal} title="插件仪表板" icon="copy" isOpen={true} onDismiss={onDismiss}>
      <div className={styles.modalContent}>
        <div className={styles.modalText}>
          更新插件后，所做的更改将丢失。
          <br /> <small>使用“另存为”创建自定义版本。</small>
        </div>
        <HorizontalGroup justify="center">
          <SaveDashboardAsButton dashboard={dashboard} onSaveSuccess={onDismiss} />
          <Button
            variant="destructive"
            onClick={async () => {
              await onDashboardSave(dashboard.getSaveModelClone(), { overwrite: true }, dashboard);
              onDismiss();
            }}
          >
            覆盖
          </Button>
          <Button variant="secondary" onClick={onDismiss}>
            取消
          </Button>
        </HorizontalGroup>
      </div>
    </Modal>
  );
};

const isHandledError = (errorStatus: string) => {
  switch (errorStatus) {
    case 'version-mismatch':
    case 'name-exists':
    case 'plugin-dashboard':
      return true;

    default:
      return false;
  }
};

const getConfirmPluginDashboardSaveModalStyles = stylesFactory((theme: GrafanaTheme) => ({
  modal: css`
    width: 500px;
  `,
  modalContent: css`
    text-align: center;
  `,
  modalText: css`
    font-size: ${theme.typography.heading.h4};
    color: ${theme.colors.link};
    margin-bottom: calc(${theme.spacing.d} * 2);
    padding-top: ${theme.spacing.d};
  `,
  modalButtonRow: css`
    margin-bottom: 14px;
    a,
    button {
      margin-right: ${theme.spacing.d};
    }
  `,
}));
