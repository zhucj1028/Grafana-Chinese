import { PanelPlugin, LogsSortOrder } from '@grafana/data';
import { Options } from './types';
import { LogsPanel } from './LogsPanel';

export const plugin = new PanelPlugin<Options>(LogsPanel).setPanelOptions(builder => {
  builder
    .addBooleanSwitch({
      path: 'showTime',
      name: '时间',
      description: '',
      defaultValue: false,
    })
    .addBooleanSwitch({
      path: 'showLabels',
      name: '唯一标签',
      description: '',
      defaultValue: false,
    })
    .addBooleanSwitch({
      path: 'wrapLogMessage',
      name: '换行',
      description: '',
      defaultValue: false,
    })
    .addRadio({
      path: 'sortOrder',
      name: '顺序',
      description: '',
      settings: {
        options: [
          { value: LogsSortOrder.Descending, label: '降序' },
          { value: LogsSortOrder.Ascending, label: '升序' },
        ],
      },
      defaultValue: LogsSortOrder.Descending,
    });
});
