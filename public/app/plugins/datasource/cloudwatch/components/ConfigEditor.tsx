import React, { PureComponent } from 'react';
import { InlineFormLabel, LegacyForms, Button } from '@grafana/ui';
const { Select, Input } = LegacyForms;
import {
  DataSourcePluginOptionsEditorProps,
  onUpdateDatasourceJsonDataOptionSelect,
  onUpdateDatasourceOption,
  onUpdateDatasourceResetOption,
  onUpdateDatasourceJsonDataOption,
  onUpdateDatasourceSecureJsonDataOption,
} from '@grafana/data';
import { SelectableValue } from '@grafana/data';
import { getDatasourceSrv } from 'app/features/plugins/datasource_srv';
import { CloudWatchDatasource } from '../datasource';
import { CloudWatchJsonData, CloudWatchSecureJsonData } from '../types';
import { CancelablePromise, makePromiseCancelable } from 'app/core/utils/CancelablePromise';

const authProviderOptions = [
  { label: 'Access & secret key', value: 'keys' },
  { label: 'Credentials file', value: 'credentials' },
  { label: 'ARN', value: 'arn' },
] as SelectableValue[];

export type Props = DataSourcePluginOptionsEditorProps<CloudWatchJsonData, CloudWatchSecureJsonData>;

export interface State {
  regions: SelectableValue[];
}

export class ConfigEditor extends PureComponent<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
      regions: [],
    };
  }

  loadRegionsPromise: CancelablePromise<any> | null = null;

  componentDidMount() {
    this.loadRegionsPromise = makePromiseCancelable(this.loadRegions());
    this.loadRegionsPromise.promise.catch(({ isCanceled }) => {
      if (isCanceled) {
        console.warn('Cloud Watch ConfigEditor has unmounted, intialization was canceled');
      }
    });
  }

  componentWillUnmount() {
    if (this.loadRegionsPromise) {
      this.loadRegionsPromise.cancel();
    }
  }

  async loadRegions() {
    await getDatasourceSrv()
      .loadDatasource(this.props.options.name)
      .then((ds: CloudWatchDatasource) => ds.getRegions())
      .then(
        (regions: any) => {
          this.setState({
            regions: regions.map((region: any) => {
              return {
                value: region.value,
                label: region.text,
              };
            }),
          });
        },
        (err: any) => {
          const regions = [
            'af-south-1',
            'ap-east-1',
            'ap-northeast-1',
            'ap-northeast-2',
            'ap-northeast-3',
            'ap-south-1',
            'ap-southeast-1',
            'ap-southeast-2',
            'ca-central-1',
            'cn-north-1',
            'cn-northwest-1',
            'eu-central-1',
            'eu-north-1',
            'eu-west-1',
            'eu-west-2',
            'eu-west-3',
            'me-south-1',
            'sa-east-1',
            'us-east-1',
            'us-east-2',
            'us-gov-east-1',
            'us-gov-west-1',
            'us-iso-east-1',
            'us-isob-east-1',
            'us-west-1',
            'us-west-2',
          ];

          this.setState({
            regions: regions.map((region: string) => ({
              value: region,
              label: region,
            })),
          });

          // expected to fail when creating new datasource
          // console.error('failed to get latest regions', err);
        }
      );
  }

  render() {
    const { regions } = this.state;
    const { options } = this.props;
    const secureJsonData = (options.secureJsonData || {}) as CloudWatchSecureJsonData;

    return (
      <>
        <h3 className="page-heading">CloudWatch细节</h3>
        <div className="gf-form-group">
          <div className="gf-form-inline">
            <div className="gf-form">
              <InlineFormLabel className="width-14">身份验证提供者</InlineFormLabel>
              <Select
                className="width-30"
                value={authProviderOptions.find(authProvider => authProvider.value === options.jsonData.authType)}
                options={authProviderOptions}
                defaultValue={options.jsonData.authType}
                onChange={option => {
                  if (options.jsonData.authType === 'arn' && option.value !== 'arn') {
                    delete this.props.options.jsonData.assumeRoleArn;
                    delete this.props.options.jsonData.externalId;
                  }
                  onUpdateDatasourceJsonDataOptionSelect(this.props, 'authType')(option);
                }}
              />
            </div>
          </div>
          {options.jsonData.authType === 'credentials' && (
            <div className="gf-form-inline">
              <div className="gf-form">
                <InlineFormLabel
                  className="width-14"
                  tooltip="在〜/.aws/ credentials中指定的凭据配置文件名称，默认保留为空白。"
                >
                  凭证配置文件名称
                </InlineFormLabel>
                <div className="width-30">
                  <Input
                    className="width-30"
                    placeholder="default"
                    value={options.jsonData.database}
                    onChange={onUpdateDatasourceOption(this.props, 'database')}
                  />
                </div>
              </div>
            </div>
          )}
          {options.jsonData.authType === 'keys' && (
            <div>
              {options.secureJsonFields?.accessKey ? (
                <div className="gf-form-inline">
                  <div className="gf-form">
                    <InlineFormLabel className="width-14">访问密钥ID</InlineFormLabel>
                    <Input className="width-25" placeholder="已配置" disabled={true} />
                  </div>
                  <div className="gf-form">
                    <div className="max-width-30 gf-form-inline">
                      <Button
                        variant="secondary"
                        type="button"
                        onClick={onUpdateDatasourceResetOption(this.props, 'accessKey')}
                      >
                        重置
                      </Button>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="gf-form-inline">
                  <div className="gf-form">
                    <InlineFormLabel className="width-14">访问密钥ID</InlineFormLabel>
                    <div className="width-30">
                      <Input
                        className="width-30"
                        value={secureJsonData.accessKey || ''}
                        onChange={onUpdateDatasourceSecureJsonDataOption(this.props, 'accessKey')}
                      />
                    </div>
                  </div>
                </div>
              )}
              {options.secureJsonFields?.secretKey ? (
                <div className="gf-form-inline">
                  <div className="gf-form">
                    <InlineFormLabel className="width-14">秘密访问密钥</InlineFormLabel>
                    <Input className="width-25" placeholder="Configured" disabled={true} />
                  </div>
                  <div className="gf-form">
                    <div className="max-width-30 gf-form-inline">
                      <Button
                        variant="secondary"
                        type="button"
                        onClick={onUpdateDatasourceResetOption(this.props, 'secretKey')}
                      >
                        重置
                      </Button>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="gf-form-inline">
                  <div className="gf-form">
                    <InlineFormLabel className="width-14">秘密访问密钥</InlineFormLabel>
                    <div className="width-30">
                      <Input
                        className="width-30"
                        value={secureJsonData.secretKey || ''}
                        onChange={onUpdateDatasourceSecureJsonDataOption(this.props, 'secretKey')}
                      />
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}
          {options.jsonData.authType === 'arn' && (
            <div className="gf-form-inline">
              <div className="gf-form">
                <InlineFormLabel className="width-14" tooltip="承担角色的ARN">
                  承担角色ARN
                </InlineFormLabel>
                <div className="width-30">
                  <Input
                    className="width-30"
                    placeholder="arn:aws:iam:*"
                    value={options.jsonData.assumeRoleArn || ''}
                    onChange={onUpdateDatasourceJsonDataOption(this.props, 'assumeRoleArn')}
                  />
                </div>
              </div>
              <div className="gf-form">
                <InlineFormLabel
                  className="width-14"
                  tooltip="如果您在另一个使用外部ID创建的帐户中担任角色，请在此处指定外部ID。"
                >
                  外部ID
                </InlineFormLabel>
                <div className="width-30">
                  <Input
                    className="width-30"
                    placeholder="外部ID"
                    value={options.jsonData.externalId || ''}
                    onChange={onUpdateDatasourceJsonDataOption(this.props, 'externalId')}
                  />
                </div>
              </div>
            </div>
          )}
          <div className="gf-form-inline">
            <div className="gf-form">
              <InlineFormLabel
                className="width-14"
                tooltip="指定区域，例如对于美国西部（俄勒冈州），请使用“ us-west-2”作为区域。"
              >
                默认区域
              </InlineFormLabel>
              <Select
                className="width-30"
                value={regions.find(region => region.value === options.jsonData.defaultRegion)}
                options={regions}
                defaultValue={options.jsonData.defaultRegion}
                onChange={onUpdateDatasourceJsonDataOptionSelect(this.props, 'defaultRegion')}
              />
            </div>
          </div>
          <div className="gf-form-inline">
            <div className="gf-form">
              <InlineFormLabel className="width-14" tooltip="自定义指标的命名空间。">
                自定义指标
              </InlineFormLabel>
              <Input
                className="width-30"
                placeholder="命名空间1,命名空间2"
                value={options.jsonData.customMetricsNamespaces || ''}
                onChange={onUpdateDatasourceJsonDataOption(this.props, 'customMetricsNamespaces')}
              />
            </div>
          </div>
        </div>
      </>
    );
  }
}

export default ConfigEditor;
