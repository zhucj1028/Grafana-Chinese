import { PanelPlugin } from '@grafana/data';
import { GaugePanel } from './GaugePanel';
import { GaugeOptions } from './types';
import { addStandardDataReduceOptions } from '../stat/types';
import { gaugePanelMigrationHandler, gaugePanelChangedHandler } from './GaugeMigrations';

export const plugin = new PanelPlugin<GaugeOptions>(GaugePanel)
  .useFieldConfig()
  .setPanelOptions(builder => {
    addStandardDataReduceOptions(builder, false);
    builder
      .addBooleanSwitch({
        path: 'showThresholdLabels',
        name: '显示阈值标签',
        description: '渲染量规周围的阈值',
        defaultValue: false,
      })
      .addBooleanSwitch({
        path: 'showThresholdMarkers',
        name: '显示阈值标记',
        description: '将阈值渲染为外栏',
        defaultValue: true,
      });
  })
  .setPanelChangeHandler(gaugePanelChangedHandler)
  .setMigrationHandler(gaugePanelMigrationHandler);
