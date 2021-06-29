import React, { PureComponent } from 'react';
import { DataSourceHttpSettings, InlineFormLabel, LegacyForms } from '@grafana/ui';
const { Select, Switch } = LegacyForms;
import {
  DataSourcePluginOptionsEditorProps,
  onUpdateDatasourceJsonDataOptionSelect,
  onUpdateDatasourceJsonDataOptionChecked,
} from '@grafana/data';
import { GraphiteOptions, GraphiteType } from '../types';

const graphiteVersions = [
  { label: '0.9.x', value: '0.9' },
  { label: '1.0.x', value: '1.0' },
  { label: '1.1.x', value: '1.1' },
];

const graphiteTypes = Object.entries(GraphiteType).map(([label, value]) => ({
  label,
  value,
}));

export type Props = DataSourcePluginOptionsEditorProps<GraphiteOptions>;

export class ConfigEditor extends PureComponent<Props> {
  constructor(props: Props) {
    super(props);
  }

  renderTypeHelp = () => {
    return (
      <p>
        有不同类型的石墨兼容后端。 您可以在此处指定使用的类型。 如果您正在使用{' '}
        <a href="https://github.com/grafana/metrictank" className="pointer" target="_blank">
          Metrictank
        </a>{' '}
        然后在这里选择 这将启用Metrictank特定的功能，例如查询处理元数据。
        Metrictank是面向Graphite和朋友的多租户时间序列引擎。
      </p>
    );
  };

  render() {
    const { options, onOptionsChange } = this.props;

    const currentVersion =
      graphiteVersions.find(item => item.value === options.jsonData.graphiteVersion) ?? graphiteVersions[2];

    return (
      <>
        <DataSourceHttpSettings
          defaultUrl="http://localhost:8080"
          dataSourceConfig={options}
          onChange={onOptionsChange}
        />
        <h3 className="page-heading">石墨细节</h3>
        <div className="gf-form-group">
          <div className="gf-form-inline">
            <div className="gf-form">
              <InlineFormLabel tooltip="此选项控制Graphite查询编辑器中可用的功能。">版本</InlineFormLabel>
              <Select
                value={currentVersion}
                options={graphiteVersions}
                width={8}
                onChange={onUpdateDatasourceJsonDataOptionSelect(this.props, 'graphiteVersion')}
              />
            </div>
          </div>
          <div className="gf-form-inline">
            <div className="gf-form">
              <InlineFormLabel tooltip={this.renderTypeHelp}>类型</InlineFormLabel>
              <Select
                options={graphiteTypes}
                value={graphiteTypes.find(type => type.value === options.jsonData.graphiteType)}
                width={8}
                onChange={onUpdateDatasourceJsonDataOptionSelect(this.props, 'graphiteType')}
              />
            </div>
          </div>
          {options.jsonData.graphiteType === GraphiteType.Metrictank && (
            <div className="gf-form-inline">
              <div className="gf-form">
                <Switch
                  label="汇总指示器"
                  labelClass={'width-10'}
                  tooltip="汇总数据时在面板标题中显示为信息图标"
                  checked={!!options.jsonData.rollupIndicatorEnabled}
                  onChange={onUpdateDatasourceJsonDataOptionChecked(this.props, 'rollupIndicatorEnabled')}
                />
              </div>
            </div>
          )}
        </div>
      </>
    );
  }
}
