import React, { FC, useState } from 'react';
import { css } from 'emotion';
import { Button, HorizontalGroup, Modal, stylesFactory, useTheme } from '@grafana/ui';
import { AppEvents, GrafanaTheme } from '@grafana/data';
import { FolderInfo } from 'app/types';
import { FolderPicker } from 'app/core/components/Select/FolderPicker';
import appEvents from 'app/core/app_events';
import { DashboardSection, OnMoveItems } from '../types';
import { getCheckedDashboards } from '../utils';
import { moveDashboards } from 'app/features/manage-dashboards/state/actions';

interface Props {
  onMoveItems: OnMoveItems;
  results: DashboardSection[];
  isOpen: boolean;
  onDismiss: () => void;
}

export const MoveToFolderModal: FC<Props> = ({ results, onMoveItems, isOpen, onDismiss }) => {
  const [folder, setFolder] = useState<FolderInfo | null>(null);
  const theme = useTheme();
  const styles = getStyles(theme);
  const selectedDashboards = getCheckedDashboards(results);

  const moveTo = () => {
    if (folder && selectedDashboards.length) {
      const folderTitle = folder.title ?? '通用';

      moveDashboards(selectedDashboards.map(d => d.uid) as string[], folder).then((result: any) => {
        if (result.successCount > 0) {
          const ending = result.successCount === 1 ? '' : 's';
          const header = `仪表板 ${ending} 移动`;
          const msg = `${result.successCount} 仪表板 ${ending} 移动到 ${folderTitle}`;
          appEvents.emit(AppEvents.alertSuccess, [header, msg]);
        }

        if (result.totalCount === result.alreadyInFolderCount) {
          appEvents.emit(AppEvents.alertError, ['Error', `仪表板已经属于该文件夹 ${folderTitle}`]);
        } else {
          onMoveItems(selectedDashboards, folder);
        }

        onDismiss();
      });
    }
  };

  return isOpen ? (
    <Modal className={styles.modal} title="选择仪表板文件夹" icon="folder-plus" isOpen={isOpen} onDismiss={onDismiss}>
      <>
        <div className={styles.content}>
          <p>将{selectedDashboards.length}个选定的仪表板移动到以下文件夹：</p>
          <FolderPicker onChange={f => setFolder(f as FolderInfo)} useNewForms />
        </div>

        <HorizontalGroup justify="center">
          <Button variant="primary" onClick={moveTo}>
            移动
          </Button>
          <Button variant="secondary" onClick={onDismiss}>
            取消
          </Button>
        </HorizontalGroup>
      </>
    </Modal>
  ) : null;
};

const getStyles = stylesFactory((theme: GrafanaTheme) => {
  return {
    modal: css`
      width: 500px;
    `,
    content: css`
      margin-bottom: ${theme.spacing.lg};
    `,
  };
});
