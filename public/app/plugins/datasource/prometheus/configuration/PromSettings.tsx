import React, { SyntheticEvent } from 'react';
import { EventsWithValidation, InlineFormLabel, regexValidation, LegacyForms } from '@grafana/ui';
const { Select, Input, FormField, Switch } = LegacyForms;
import {
  SelectableValue,
  onUpdateDatasourceJsonDataOptionChecked,
  DataSourcePluginOptionsEditorProps,
} from '@grafana/data';
import { PromOptions } from '../types';

const httpOptions = [
  { value: 'GET', label: 'GET' },
  { value: 'POST', label: 'POST' },
];

type Props = Pick<DataSourcePluginOptionsEditorProps<PromOptions>, 'options' | 'onOptionsChange'>;

export const PromSettings = (props: Props) => {
  const { options, onOptionsChange } = props;

  return (
    <>
      <div className="gf-form-group">
        <div className="gf-form-inline">
          <div className="gf-form">
            <FormField
              label="刮擦间隔"
              labelWidth={13}
              inputEl={
                <Input
                  className="width-6"
                  value={options.jsonData.timeInterval}
                  spellCheck={false}
                  placeholder="15s"
                  onChange={onChangeHandler('timeInterval', options, onOptionsChange)}
                  validationEvents={promSettingsValidationEvents}
                />
              }
              tooltip="将此设置为Prometheus中配置的典型刮擦和评估间隔。 默认值为15秒。"
            />
          </div>
        </div>
        <div className="gf-form-inline">
          <div className="gf-form">
            <FormField
              label="查询超时"
              labelWidth={13}
              inputEl={
                <Input
                  className="width-6"
                  value={options.jsonData.queryTimeout}
                  onChange={onChangeHandler('queryTimeout', options, onOptionsChange)}
                  spellCheck={false}
                  placeholder="60s"
                  validationEvents={promSettingsValidationEvents}
                />
              }
              tooltip="设置Prometheus查询超时。"
            />
          </div>
        </div>
        <div className="gf-form">
          <InlineFormLabel
            width={13}
            tooltip="指定用于查询Prometheus的HTTP方法。 （仅在Prometheus> = v2.1.0中可用POST）"
          >
            HTTP方法
          </InlineFormLabel>
          <Select
            options={httpOptions}
            value={httpOptions.find(o => o.value === options.jsonData.httpMethod)}
            onChange={onChangeHandler('httpMethod', options, onOptionsChange)}
            width={7}
          />
        </div>
      </div>
      <h3 className="page-heading">杂项</h3>
      <div className="gf-form-group">
        <div className="gf-form">
          <Switch
            checked={options.jsonData.disableMetricsLookup ?? false}
            label="禁用指标查询"
            labelClass="width-14"
            onChange={onUpdateDatasourceJsonDataOptionChecked(props, 'disableMetricsLookup')}
            tooltip="选中此选项将在查询字段的自动完成功能中禁用指标选择器和指标/标签支持。 如果较大的Prometheus实例遇到性能问题，这会有所帮助。"
          />
        </div>
        <div className="gf-form-inline">
          <div className="gf-form max-width-30">
            <FormField
              label="自定义查询参数"
              labelWidth={14}
              tooltip="将自定义参数添加到Prometheus或Thanos查询。"
              inputEl={
                <Input
                  className="width-25"
                  value={options.jsonData.customQueryParameters}
                  onChange={onChangeHandler('customQueryParameters', options, onOptionsChange)}
                  spellCheck={false}
                  placeholder="例: max_source_resolution=5m&timeout=10"
                />
              }
            />
          </div>
        </div>
      </div>
    </>
  );
};

export const promSettingsValidationEvents = {
  [EventsWithValidation.onBlur]: [
    regexValidation(/^$|^\d+(ms|[Mwdhmsy])$/, '值无效，您可以将数字与时间单位说明符一起使用: y, M, w, d, h, m, s'),
  ],
};

export const getValueFromEventItem = (eventItem: SyntheticEvent<HTMLInputElement> | SelectableValue<string>) => {
  if (!eventItem) {
    return '';
  }

  if (eventItem.hasOwnProperty('currentTarget')) {
    return eventItem.currentTarget.value;
  }

  return (eventItem as SelectableValue<string>).value;
};

const onChangeHandler = (
  key: keyof PromOptions,
  options: Props['options'],
  onOptionsChange: Props['onOptionsChange']
) => (eventItem: SyntheticEvent<HTMLInputElement> | SelectableValue<string>) => {
  onOptionsChange({
    ...options,
    jsonData: {
      ...options.jsonData,
      [key]: getValueFromEventItem(eventItem),
    },
  });
};
