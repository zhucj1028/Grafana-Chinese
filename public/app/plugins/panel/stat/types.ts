import {
  SingleStatBaseOptions,
  BigValueColorMode,
  BigValueGraphMode,
  BigValueJustifyMode,
  BigValueTextMode,
} from '@grafana/ui';
import {
  ReducerID,
  standardEditorsRegistry,
  FieldOverrideContext,
  getFieldDisplayName,
  escapeStringForRegex,
} from '@grafana/data';
import { PanelOptionsEditorBuilder } from '@grafana/data';

// Structure copied from angular
export interface StatPanelOptions extends SingleStatBaseOptions {
  graphMode: BigValueGraphMode;
  colorMode: BigValueColorMode;
  justifyMode: BigValueJustifyMode;
  textMode: BigValueTextMode;
}

export function addStandardDataReduceOptions(
  builder: PanelOptionsEditorBuilder<SingleStatBaseOptions>,
  includeOrientation = true,
  includeFieldMatcher = true
) {
  builder.addRadio({
    path: 'reduceOptions.values',
    name: '显示',
    description: '计算每列或每列一个值或显示每一行',
    settings: {
      options: [
        { value: false, label: '计算' },
        { value: true, label: '所有值' },
      ],
    },
    defaultValue: false,
  });

  builder.addNumberInput({
    path: 'reduceOptions.limit',
    name: '限制',
    description: '显示的最大行数',
    settings: {
      placeholder: '5000',
      integer: true,
      min: 1,
      max: 5000,
    },
    showIf: options => options.reduceOptions.values === true,
  });

  builder.addCustomEditor({
    id: 'reduceOptions.calcs',
    path: 'reduceOptions.calcs',
    name: '计算方式',
    description: '选择减速器功能/计算',
    editor: standardEditorsRegistry.get('stats-picker').editor as any,
    defaultValue: [ReducerID.mean],
    // Hides it when all values mode is on
    showIf: currentConfig => currentConfig.reduceOptions.values === false,
  });

  if (includeFieldMatcher) {
    builder.addSelect({
      path: 'reduceOptions.fields',
      name: '字段',
      description: '选择面板中应包含的字段',
      settings: {
        allowCustomValue: true,
        options: [],
        getOptions: async (context: FieldOverrideContext) => {
          const options = [
            { value: '', label: '数值字段' },
            { value: '/.*/', label: '所有字段' },
          ];
          if (context && context.data) {
            for (const frame of context.data) {
              for (const field of frame.fields) {
                const name = getFieldDisplayName(field, frame, context.data);
                const value = `/^${escapeStringForRegex(name)}$/`;
                options.push({ value, label: name });
              }
            }
          }
          return Promise.resolve(options);
        },
      },
      defaultValue: '',
    });
  }

  if (includeOrientation) {
    builder.addRadio({
      path: 'orientation',
      name: '方向',
      description: '多个序列或多个字段的堆叠方向',
      settings: {
        options: [
          { value: 'auto', label: '自动' },
          { value: 'horizontal', label: '水平' },
          { value: 'vertical', label: '垂直' },
        ],
      },
      defaultValue: 'auto',
    });
  }
}
