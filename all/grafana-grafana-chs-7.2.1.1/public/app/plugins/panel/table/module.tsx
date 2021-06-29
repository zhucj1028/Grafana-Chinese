import { PanelPlugin } from '@grafana/data';
import { TablePanel } from './TablePanel';
import { CustomFieldConfig, Options } from './types';
import { tableMigrationHandler, tablePanelChangedHandler } from './migrations';
import { TableCellDisplayMode } from '@grafana/ui';

export const plugin = new PanelPlugin<Options, CustomFieldConfig>(TablePanel)
  .setPanelChangeHandler(tablePanelChangedHandler)
  .setMigrationHandler(tableMigrationHandler)
  .setNoPadding()
  .useFieldConfig({
    useCustomConfig: builder => {
      builder
        .addNumberInput({
          path: 'width',
          name: '列宽',
          settings: {
            placeholder: '自动',
            min: 20,
            max: 300,
          },
          shouldApply: () => true,
        })
        .addRadio({
          path: 'align',
          name: '列对齐',
          settings: {
            options: [
              { label: '自动', value: null },
              { label: '左', value: 'left' },
              { label: '中', value: 'center' },
              { label: '右', value: 'right' },
            ],
          },
          defaultValue: null,
        })
        .addSelect({
          path: 'displayMode',
          name: '单元格显示模式',
          description: '彩色文本，背景，显示为量规等',
          settings: {
            options: [
              { value: TableCellDisplayMode.Auto, label: '自动' },
              { value: TableCellDisplayMode.ColorText, label: '彩色文本' },
              { value: TableCellDisplayMode.ColorBackground, label: '彩色背景' },
              { value: TableCellDisplayMode.GradientGauge, label: '坡度计' },
              { value: TableCellDisplayMode.LcdGauge, label: '液晶量规' },
              { value: TableCellDisplayMode.BasicGauge, label: '基本量规' },
              { value: TableCellDisplayMode.JSONView, label: 'JSON视图' },
            ],
          },
        })
        .addBooleanSwitch({
          path: 'filterable',
          name: 'Column filter',
          description: 'Enables/disables field filters in table',
          defaultValue: false,
        });
    },
  })
  .setPanelOptions(builder => {
    builder.addBooleanSwitch({
      path: 'showHeader',
      name: '显示表头',
      description: '显示表头还是不显示',
      defaultValue: true,
    });
  });
