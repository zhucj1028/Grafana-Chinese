import React from 'react';
import { HttpSettingsBaseProps } from './types';
import { Switch } from '../Forms/Legacy/Switch/Switch';

export const HttpProxySettings: React.FC<HttpSettingsBaseProps> = ({ dataSourceConfig, onChange }) => {
  return (
    <>
      <div className="gf-form-inline">
        <Switch
          label="TLS客户端验证"
          labelClass="width-13"
          checked={dataSourceConfig.jsonData.tlsAuth || false}
          onChange={event => onChange({ ...dataSourceConfig.jsonData, tlsAuth: event!.currentTarget.checked })}
        />

        <Switch
          label="使用CA证书"
          labelClass="width-13"
          checked={dataSourceConfig.jsonData.tlsAuthWithCACert || false}
          onChange={event =>
            onChange({ ...dataSourceConfig.jsonData, tlsAuthWithCACert: event!.currentTarget.checked })
          }
          tooltip="验证自签名TLS证书所需"
        />
      </div>
      <div className="gf-form-inline">
        <Switch
          label="跳过TLS验证"
          labelClass="width-13"
          checked={dataSourceConfig.jsonData.tlsSkipVerify || false}
          onChange={event => onChange({ ...dataSourceConfig.jsonData, tlsSkipVerify: event!.currentTarget.checked })}
        />
      </div>
      <div className="gf-form-inline">
        <Switch
          label="转发OAuth身份"
          labelClass="width-13"
          checked={dataSourceConfig.jsonData.oauthPassThru || false}
          onChange={event => onChange({ ...dataSourceConfig.jsonData, oauthPassThru: event!.currentTarget.checked })}
          tooltip="将用户的上游OAuth身份转发到数据源（他们的访问令牌会一起传递）。"
        />
      </div>
    </>
  );
};
