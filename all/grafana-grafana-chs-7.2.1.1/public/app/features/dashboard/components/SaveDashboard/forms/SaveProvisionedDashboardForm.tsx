import React, { useCallback, useState } from 'react';
import { css } from 'emotion';
import { saveAs } from 'file-saver';
import { Button, HorizontalGroup, stylesFactory, TextArea, useTheme, VerticalGroup } from '@grafana/ui';
import { CopyToClipboard } from 'app/core/components/CopyToClipboard/CopyToClipboard';
import { SaveDashboardFormProps } from '../types';
import { AppEvents, GrafanaTheme } from '@grafana/data';
import appEvents from '../../../../../core/app_events';

export const SaveProvisionedDashboardForm: React.FC<SaveDashboardFormProps> = ({ dashboard, onCancel }) => {
  const theme = useTheme();
  const [dashboardJSON, setDashboardJson] = useState(() => {
    const clone = dashboard.getSaveModelClone();
    delete clone.id;
    return JSON.stringify(clone, null, 2);
  });

  const saveToFile = useCallback(() => {
    const blob = new Blob([dashboardJSON], {
      type: 'application/json;charset=utf-8',
    });
    saveAs(blob, dashboard.title + '-' + new Date().getTime() + '.json');
  }, [dashboardJSON]);

  const onCopyToClipboardSuccess = useCallback(() => {
    appEvents.emit(AppEvents.alertSuccess, ['仪表板JSON复制到剪贴板']);
  }, []);

  const styles = getStyles(theme);
  return (
    <>
      <VerticalGroup spacing="lg">
        <small>
          无法从Grafana的UI保存该仪表板，因为它是从其他来源提供的。 复制JSON或将其保存到下面的文件中。
          然后，您可以在相应的配置源中更新仪表板。
          <br />
          <i>
            See{' '}
            <a
              className="external-link"
              href="http://docs.grafana.org/administration/provisioning/#dashboards"
              target="_blank"
            >
              文档
            </a>{' '}
            有关配置的更多信息。
          </i>
        </small>
        <div>
          <strong>文件路径: </strong> {dashboard.meta.provisionedExternalId}
        </div>
        <TextArea
          spellCheck={false}
          value={dashboardJSON}
          onChange={e => {
            setDashboardJson(e.currentTarget.value);
          }}
          className={styles.json}
        />
        <HorizontalGroup>
          <CopyToClipboard text={() => dashboardJSON} elType={Button} onSuccess={onCopyToClipboardSuccess}>
            将JSON复制到剪贴板
          </CopyToClipboard>
          <Button onClick={saveToFile}>将JSON保存到文件</Button>
          <Button variant="secondary" onClick={onCancel}>
            取消
          </Button>
        </HorizontalGroup>
      </VerticalGroup>
    </>
  );
};

const getStyles = stylesFactory((theme: GrafanaTheme) => {
  return {
    json: css`
      height: 400px;
      width: 100%;
      overflow: auto;
      resize: none;
      font-family: monospace;
    `,
  };
});
