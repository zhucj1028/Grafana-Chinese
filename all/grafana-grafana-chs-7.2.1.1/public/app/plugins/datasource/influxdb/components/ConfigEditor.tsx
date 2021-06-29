import React, { PureComponent } from 'react';
import {
  DataSourcePluginOptionsEditorProps,
  SelectableValue,
  onUpdateDatasourceOption,
  updateDatasourcePluginResetOption,
  onUpdateDatasourceJsonDataOption,
  onUpdateDatasourceJsonDataOptionSelect,
  onUpdateDatasourceSecureJsonDataOption,
} from '@grafana/data';
import { DataSourceHttpSettings, InlineFormLabel, LegacyForms } from '@grafana/ui';
const { Select, Input, SecretFormField } = LegacyForms;
import { InfluxOptions, InfluxSecureJsonData, InfluxVersion } from '../types';

const httpModes = [
  { label: 'GET', value: 'GET' },
  { label: 'POST', value: 'POST' },
] as SelectableValue[];

const versions = [
  {
    label: 'InfluxQL',
    value: InfluxVersion.InfluxQL,
    description: 'InfluxDB类似SQL的查询语言。 在InfluxDB 1.x中受支持',
  },
  {
    label: 'Flux',
    value: InfluxVersion.Flux,
    description: '先进的数据脚本和查询语言。 在InfluxDB 2.x和1.8+（测试版）中受支持',
  },
] as Array<SelectableValue<InfluxVersion>>;

export type Props = DataSourcePluginOptionsEditorProps<InfluxOptions>;

export class ConfigEditor extends PureComponent<Props> {
  // 1x
  onResetPassword = () => {
    updateDatasourcePluginResetOption(this.props, 'password');
  };

  // 2x
  onResetToken = () => {
    updateDatasourcePluginResetOption(this.props, 'token');
  };

  onVersionChanged = (selected: SelectableValue<InfluxVersion>) => {
    const { options, onOptionsChange } = this.props;

    const copy = {
      ...options,
      jsonData: {
        ...options.jsonData,
        version: selected.value,
      },
    };
    if (selected.value === InfluxVersion.Flux) {
      copy.access = 'proxy';
      copy.basicAuth = true;
      copy.jsonData.httpMode = 'POST';

      // Remove old 1x configs
      delete copy.user;
      delete copy.database;
    }
    onOptionsChange(copy);
  };

  onUpdateInflux2xURL = (e: React.SyntheticEvent<HTMLInputElement>) => {
    const { options, onOptionsChange } = this.props;
    onOptionsChange({
      ...options,
      url: e.currentTarget.value,
      access: 'proxy',
      basicAuth: true,
    });
  };

  renderInflux2x() {
    const { options } = this.props;
    const { secureJsonFields } = options;
    const secureJsonData = (options.secureJsonData || {}) as InfluxSecureJsonData;

    return (
      <div>
        <div className="gf-form-group">
          <div className="width-30 grafana-info-box">
            <h5>目前在Beta中支持Grafana中的磁通</h5>
            <p>
              请将任何问题报告给： <br />
              <a href="https://github.com/grafana/grafana/issues/new/choose">
                https://github.com/grafana/grafana/issues
              </a>
            </p>
          </div>
        </div>
        <br />

        <h3 className="page-heading">连接</h3>
        <div className="gf-form-inline">
          <div className="gf-form">
            <InlineFormLabel className="width-10" tooltip="需要从grafana后端/服务器访问此URL。">
              地址
            </InlineFormLabel>
            <div className="width-20">
              <Input
                className="width-20"
                value={options.url || ''}
                placeholder="http://localhost:9999"
                onChange={this.onUpdateInflux2xURL}
              />
            </div>
          </div>
        </div>
        <div className="gf-form-inline">
          <div className="gf-form">
            <InlineFormLabel className="width-10">组织</InlineFormLabel>
            <div className="width-10">
              <Input
                className="width-20"
                value={options.jsonData.organization || ''}
                onChange={onUpdateDatasourceJsonDataOption(this.props, 'organization')}
              />
            </div>
          </div>
        </div>
        <div className="gf-form-inline">
          <div className="gf-form">
            <SecretFormField
              isConfigured={(secureJsonFields && secureJsonFields.token) as boolean}
              value={secureJsonData.token || ''}
              label="令牌"
              labelWidth={10}
              inputWidth={20}
              onReset={this.onResetToken}
              onChange={onUpdateDatasourceSecureJsonDataOption(this.props, 'token')}
            />
          </div>
        </div>
        <div className="gf-form-inline">
          <div className="gf-form">
            <InlineFormLabel className="width-10">默认桶</InlineFormLabel>
            <div className="width-10">
              <Input
                className="width-20"
                placeholder="默认桶"
                value={options.jsonData.defaultBucket || ''}
                onChange={onUpdateDatasourceJsonDataOption(this.props, 'defaultBucket')}
              />
            </div>
          </div>
        </div>

        <div className="gf-form-inline">
          <div className="gf-form">
            <InlineFormLabel
              className="width-10"
              tooltip="自动分组时间间隔的下限。 建议设置为写入频率，例如，如果每分钟写入一次数据，则为1m。"
            >
              最小时间间隔
            </InlineFormLabel>
            <div className="width-10">
              <Input
                className="width-10"
                placeholder="10s"
                value={options.jsonData.timeInterval || ''}
                onChange={onUpdateDatasourceJsonDataOption(this.props, 'timeInterval')}
              />
            </div>
          </div>
        </div>
      </div>
    );
  }

  renderInflux1x() {
    const { options, onOptionsChange } = this.props;
    const { secureJsonFields } = options;
    const secureJsonData = (options.secureJsonData || {}) as InfluxSecureJsonData;

    return (
      <div>
        <DataSourceHttpSettings
          showAccessOptions={true}
          dataSourceConfig={options}
          defaultUrl="http://localhost:8086"
          onChange={onOptionsChange}
        />

        <h3 className="page-heading">InfluxDB详情</h3>
        <div className="gf-form-group">
          <div className="gf-form-inline">
            <div className="gf-form">
              <InlineFormLabel className="width-10">数据库</InlineFormLabel>
              <div className="width-20">
                <Input
                  className="width-20"
                  value={options.database || ''}
                  onChange={onUpdateDatasourceOption(this.props, 'database')}
                />
              </div>
            </div>
          </div>
          <div className="gf-form-inline">
            <div className="gf-form">
              <InlineFormLabel className="width-10">用户</InlineFormLabel>
              <div className="width-10">
                <Input
                  className="width-20"
                  value={options.user || ''}
                  onChange={onUpdateDatasourceOption(this.props, 'user')}
                />
              </div>
            </div>
          </div>
          <div className="gf-form-inline">
            <div className="gf-form">
              <SecretFormField
                isConfigured={(secureJsonFields && secureJsonFields.password) as boolean}
                value={secureJsonData.password || ''}
                label="密码"
                labelWidth={10}
                inputWidth={20}
                onReset={this.onResetPassword}
                onChange={onUpdateDatasourceSecureJsonDataOption(this.props, 'password')}
              />
            </div>
          </div>
          <div className="gf-form-inline">
            <div className="gf-form">
              <InlineFormLabel
                className="width-10"
                tooltip="您可以使用GET或POST HTTP方法来查询您的InfluxDB数据库。 POST方法允许您执行繁重的请求（带有大量WHERE子句），而GET方法将限制您，如果查询太大，则会返回错误。"
              >
                HTTP方法
              </InlineFormLabel>
              <Select
                className="width-10"
                value={httpModes.find(httpMode => httpMode.value === options.jsonData.httpMode)}
                options={httpModes}
                defaultValue={options.jsonData.httpMode}
                onChange={onUpdateDatasourceJsonDataOptionSelect(this.props, 'httpMode')}
              />
            </div>
          </div>
        </div>

        <div className="gf-form-group">
          <div className="grafana-info-box">
            <h5>数据库访问</h5>
            <p>
              为此数据源设置数据库不会拒绝对其他数据库的访问。 InfluxDB查询语法允许在查询中切换数据库。 例如：
              <code> _internal </code>上的显示度量或<code> SELECT * FROM“ _internal” ..“ database” LIMIT 10 </code>
              <br />
              <br />
              为了支持数据隔离和安全性，请确保在InfluxDB中配置了适当的权限。
            </p>
          </div>
        </div>
        <div className="gf-form-group">
          <div className="gf-form-inline">
            <div className="gf-form">
              <InlineFormLabel
                className="width-10"
                tooltip="自动分组时间间隔的下限。 建议设置为写入频率，例如，如果每分钟写入一次，则为1m。"
              >
                最小时间间隔
              </InlineFormLabel>
              <div className="width-10">
                <Input
                  className="width-10"
                  placeholder="10s"
                  value={options.jsonData.timeInterval || ''}
                  onChange={onUpdateDatasourceJsonDataOption(this.props, 'timeInterval')}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  render() {
    const { options } = this.props;

    return (
      <>
        <h3 className="page-heading">查询语法</h3>
        <div className="gf-form-group">
          <div className="gf-form-inline">
            <div className="gf-form">
              <Select
                className="width-30"
                value={options.jsonData.version === InfluxVersion.Flux ? versions[1] : versions[0]}
                options={versions}
                defaultValue={versions[0]}
                onChange={this.onVersionChanged}
              />
            </div>
          </div>
        </div>

        {options.jsonData.version === InfluxVersion.Flux ? this.renderInflux2x() : this.renderInflux1x()}
      </>
    );
  }
}

export default ConfigEditor;
