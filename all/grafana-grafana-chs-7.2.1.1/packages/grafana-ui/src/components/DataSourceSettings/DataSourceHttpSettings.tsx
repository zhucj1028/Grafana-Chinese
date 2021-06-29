import React, { useState, useCallback } from 'react';
import { SelectableValue } from '@grafana/data';
import { css, cx } from 'emotion';
import { useTheme } from '../../themes';
import { BasicAuthSettings } from './BasicAuthSettings';
import { HttpProxySettings } from './HttpProxySettings';
import { TLSAuthSettings } from './TLSAuthSettings';
import { DataSourceSettings } from '@grafana/data';
import { HttpSettingsProps } from './types';
import { CustomHeadersSettings } from './CustomHeadersSettings';
import { Select } from '../Forms/Legacy/Select/Select';
import { Input } from '../Forms/Legacy/Input/Input';
import { Icon } from '../Icon/Icon';
import { FormField } from '../FormField/FormField';
import { FormLabel } from '../FormLabel/FormLabel';
import { Switch } from '../Forms/Legacy/Switch/Switch';
import { TagsInput } from '../TagsInput/TagsInput';

const ACCESS_OPTIONS: Array<SelectableValue<string>> = [
  {
    label: '服务器(默认)',
    value: 'proxy',
  },
  {
    label: '浏览器',
    value: 'direct',
  },
];

const DEFAULT_ACCESS_OPTION = {
  label: '服务器(默认)',
  value: 'proxy',
};

const HttpAccessHelp = () => (
  <div className="grafana-info-box m-t-2">
    <p>
      访问模式控制如何处理对数据源的请求。
      <strong>
        <i>服务器</i>
      </strong>{' '}
      如果没有其他说明，则应该是首选方式。
    </p>
    <div className="alert-title">服务器访问模式(默认):</div>
    <p>
      所有请求都将从浏览器发出到Grafana后端/服务器，后者再将请求转发到数据源，从而避免可能的跨域资源共享（CORS）要求。
      如果选择此访问方式，则需要从grafana后端/服务器访问该URL。
    </p>
    <div className="alert-title">浏览器访问模式:</div>
    <p>
      所有请求都将从浏览器直接向数据源发出，并且可能要遵守跨域资源共享（CORS）的要求。
      如果选择此访问方式，则需要从浏览器访问URL。
    </p>
  </div>
);

export const DataSourceHttpSettings: React.FC<HttpSettingsProps> = props => {
  const { defaultUrl, dataSourceConfig, onChange, showAccessOptions } = props;
  let urlTooltip;
  const [isAccessHelpVisible, setIsAccessHelpVisible] = useState(false);
  const theme = useTheme();

  const onSettingsChange = useCallback(
    (change: Partial<DataSourceSettings<any, any>>) => {
      onChange({
        ...dataSourceConfig,
        ...change,
      });
    },
    [dataSourceConfig]
  );

  switch (dataSourceConfig.access) {
    case 'direct':
      urlTooltip = (
        <>
          您的访问方法是<em>浏览器</em>，这意味着需要从浏览器访问该URL。
        </>
      );
      break;
    case 'proxy':
      urlTooltip = (
        <>
          您的访问方法是<em> Server </em>，这意味着需要从grafana后端/服务器访问该URL。
        </>
      );
      break;
    default:
      urlTooltip = '指定完整的HTTP URL(例如 http://your_server:8080)';
  }

  const accessSelect = (
    <Select
      width={20}
      options={ACCESS_OPTIONS}
      value={ACCESS_OPTIONS.filter(o => o.value === dataSourceConfig.access)[0] || DEFAULT_ACCESS_OPTION}
      onChange={selectedValue => onSettingsChange({ access: selectedValue.value })}
    />
  );

  const isValidUrl = /^(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?$/.test(
    dataSourceConfig.url
  );

  const notValidStyle = css`
    box-shadow: inset 0 0px 5px ${theme.palette.red};
  `;

  const inputStyle = cx({ [`width-20`]: true, [notValidStyle]: !isValidUrl });

  const urlInput = (
    <Input
      className={inputStyle}
      placeholder={defaultUrl}
      value={dataSourceConfig.url}
      onChange={event => onSettingsChange({ url: event.currentTarget.value })}
    />
  );

  return (
    <div className="gf-form-group">
      <>
        <h3 className="page-heading">HTTP</h3>
        <div className="gf-form-group">
          <div className="gf-form">
            <FormField label="URL" labelWidth={11} tooltip={urlTooltip} inputEl={urlInput} />
          </div>

          {showAccessOptions && (
            <>
              <div className="gf-form-inline">
                <div className="gf-form">
                  <FormField label="访问" labelWidth={11} inputWidth={20} inputEl={accessSelect} />
                </div>
                <div className="gf-form">
                  <label
                    className="gf-form-label query-keyword pointer"
                    onClick={() => setIsAccessHelpVisible(isVisible => !isVisible)}
                  >
                    帮助&nbsp;
                    <Icon name={isAccessHelpVisible ? 'angle-down' : 'angle-right'} style={{ marginBottom: 0 }} />
                  </label>
                </div>
              </div>
              {isAccessHelpVisible && <HttpAccessHelp />}
            </>
          )}
          {dataSourceConfig.access === 'proxy' && (
            <div className="gf-form">
              <FormLabel width={11} tooltip="Grafana代理默认删除转发的cookie。 通过名称指定应转发到数据源的cookie。">
                白名单Cookie
              </FormLabel>
              <TagsInput
                tags={dataSourceConfig.jsonData.keepCookies}
                onChange={cookies =>
                  onSettingsChange({ jsonData: { ...dataSourceConfig.jsonData, keepCookies: cookies } })
                }
                width={20}
              />
            </div>
          )}
        </div>
      </>

      <>
        <h3 className="page-heading">认证</h3>
        <div className="gf-form-group">
          <div className="gf-form-inline">
            <Switch
              label="基本验证"
              labelClass="width-13"
              checked={dataSourceConfig.basicAuth}
              onChange={event => {
                onSettingsChange({ basicAuth: event!.currentTarget.checked });
              }}
            />
            <Switch
              label="凭证"
              labelClass="width-13"
              checked={dataSourceConfig.withCredentials}
              onChange={event => {
                onSettingsChange({ withCredentials: event!.currentTarget.checked });
              }}
              tooltip="诸如cookie或auth标头之类的凭据是否应与跨站点请求一起发送。"
            />
          </div>

          {dataSourceConfig.access === 'proxy' && (
            <HttpProxySettings
              dataSourceConfig={dataSourceConfig}
              onChange={jsonData => onSettingsChange({ jsonData })}
            />
          )}
        </div>
        {dataSourceConfig.basicAuth && (
          <>
            <h6>基本身份验证详细信息</h6>
            <div className="gf-form-group">
              <BasicAuthSettings {...props} />
            </div>
          </>
        )}

        {(dataSourceConfig.jsonData.tlsAuth || dataSourceConfig.jsonData.tlsAuthWithCACert) && (
          <TLSAuthSettings dataSourceConfig={dataSourceConfig} onChange={onChange} />
        )}

        {dataSourceConfig.access === 'proxy' && (
          <CustomHeadersSettings dataSourceConfig={dataSourceConfig} onChange={onChange} />
        )}
      </>
    </div>
  );
};
