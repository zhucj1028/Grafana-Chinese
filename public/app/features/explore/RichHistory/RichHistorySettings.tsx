import React from 'react';
import { css } from 'emotion';
import { stylesFactory, useTheme, Select, Button, Switch, Field } from '@grafana/ui';
import { GrafanaTheme, AppEvents } from '@grafana/data';
import appEvents from 'app/core/app_events';
import { CoreEvents } from 'app/types';

export interface RichHistorySettingsProps {
  retentionPeriod: number;
  starredTabAsFirstTab: boolean;
  activeDatasourceOnly: boolean;
  onChangeRetentionPeriod: (option: { label: string; value: number }) => void;
  toggleStarredTabAsFirstTab: () => void;
  toggleactiveDatasourceOnly: () => void;
  deleteRichHistory: () => void;
}

const getStyles = stylesFactory((theme: GrafanaTheme) => {
  return {
    container: css`
      padding-left: ${theme.spacing.sm};
      font-size: ${theme.typography.size.sm};
      .space-between {
        margin-bottom: ${theme.spacing.lg};
      }
    `,
    input: css`
      max-width: 200px;
    `,
    switch: css`
      display: flex;
      align-items: center;
    `,
    label: css`
      margin-left: ${theme.spacing.md};
    `,
  };
});

const retentionPeriodOptions = [
  { value: 2, label: '2 天' },
  { value: 5, label: '5 天' },
  { value: 7, label: '1 周' },
  { value: 14, label: '2 周' },
];

export function RichHistorySettings(props: RichHistorySettingsProps) {
  const {
    retentionPeriod,
    starredTabAsFirstTab,
    activeDatasourceOnly,
    onChangeRetentionPeriod,
    toggleStarredTabAsFirstTab,
    toggleactiveDatasourceOnly,
    deleteRichHistory,
  } = props;
  const theme = useTheme();
  const styles = getStyles(theme);
  const selectedOption = retentionPeriodOptions.find(v => v.value === retentionPeriod);

  const onDelete = () => {
    appEvents.emit(CoreEvents.showConfirmModal, {
      title: '删除',
      text: '您确定要永久删除查询历史记录吗？',
      yesText: '删除',
      icon: 'trash-alt',
      onConfirm: () => {
        deleteRichHistory();
        appEvents.emit(AppEvents.alertSuccess, ['查询历史记录已删除']);
      },
    });
  };

  return (
    <div className={styles.container}>
      <Field label="历史时间跨度" description="选择Grafana将保存查询历史记录的时间段" className="space-between">
        <div className={styles.input}>
          <Select value={selectedOption} options={retentionPeriodOptions} onChange={onChangeRetentionPeriod}></Select>
        </div>
      </Field>
      <Field label="默认活动标签" description=" " className="space-between">
        <div className={styles.switch}>
          <Switch value={starredTabAsFirstTab} onChange={toggleStarredTabAsFirstTab}></Switch>
          <div className={styles.label}>将默认的活动标签从“查询历史记录”更改为“已加星标”</div>
        </div>
      </Field>
      <Field label="数据源行为" description=" " className="space-between">
        <div className={styles.switch}>
          <Switch value={activeDatasourceOnly} onChange={toggleactiveDatasourceOnly}></Switch>
          <div className={styles.label}>仅显示对资源管理器中当前活动的数据源的查询</div>
        </div>
      </Field>
      <div
        className={css`
          font-weight: ${theme.typography.weight.bold};
        `}
      >
        清除查询记录
      </div>
      <div
        className={css`
          margin-bottom: ${theme.spacing.sm};
        `}
      >
        永久删除所有查询历史记录。
      </div>
      <Button variant="destructive" onClick={onDelete}>
        清除查询记录
      </Button>
    </div>
  );
}
