import { sharedSingleStatMigrationHandler, BigValueTextMode } from '@grafana/ui';
import { PanelPlugin } from '@grafana/data';
import { StatPanelOptions, addStandardDataReduceOptions } from './types';
import { StatPanel } from './StatPanel';
import { statPanelChangedHandler } from './StatMigrations';

export const plugin = new PanelPlugin<StatPanelOptions>(StatPanel)
  .useFieldConfig()
  .setPanelOptions(builder => {
    addStandardDataReduceOptions(builder);

    builder.addSelect({
      path: 'textMode',
      name: '文字模式',
      description: '控制是否显示名称和值或仅显示名称',
      settings: {
        options: [
          { value: BigValueTextMode.Auto, label: '自动' },
          { value: BigValueTextMode.Value, label: '值' },
          { value: BigValueTextMode.ValueAndName, label: '值和名称' },
          { value: BigValueTextMode.Name, label: '名字' },
          { value: BigValueTextMode.None, label: '无' },
        ],
      },
      defaultValue: 'auto',
    });

    builder
      .addRadio({
        path: 'colorMode',
        name: '色彩模式',
        description: '为值或背景上色',
        defaultValue: 'value',
        settings: {
          options: [
            { value: 'value', label: '值' },
            { value: 'background', label: '背景' },
          ],
        },
      })
      .addRadio({
        path: 'graphMode',
        name: '图形模式',
        description: '统计面板图 / 迷你图模式',
        defaultValue: 'area',
        settings: {
          options: [
            { value: 'none', label: '无' },
            { value: 'area', label: '区域' },
          ],
        },
      })
      .addRadio({
        path: 'justifyMode',
        name: '对齐方式',
        description: '值 & 标题定位',
        defaultValue: 'auto',
        settings: {
          options: [
            { value: 'auto', label: '自动' },
            { value: 'center', label: '中心' },
          ],
        },
      });
  })
  .setNoPadding()
  .setPanelChangeHandler(statPanelChangedHandler)
  .setMigrationHandler(sharedSingleStatMigrationHandler);
