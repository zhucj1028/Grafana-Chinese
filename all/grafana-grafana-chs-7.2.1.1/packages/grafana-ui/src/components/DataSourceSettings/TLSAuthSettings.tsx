import React from 'react';
import { KeyValue } from '@grafana/data';
import { css, cx } from 'emotion';
import { Tooltip } from '../Tooltip/Tooltip';
import { Icon } from '../Icon/Icon';
import { CertificationKey } from './CertificationKey';
import { HttpSettingsBaseProps } from './types';

export const TLSAuthSettings: React.FC<HttpSettingsBaseProps> = ({ dataSourceConfig, onChange }) => {
  const hasTLSCACert = dataSourceConfig.secureJsonFields && dataSourceConfig.secureJsonFields.tlsCACert;
  const hasTLSClientCert = dataSourceConfig.secureJsonFields && dataSourceConfig.secureJsonFields.tlsClientCert;
  const hasTLSClientKey = dataSourceConfig.secureJsonFields && dataSourceConfig.secureJsonFields.tlsClientKey;

  const onResetClickFactory = (field: string) => (event: React.MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault();
    const newSecureJsonFields: KeyValue<boolean> = { ...dataSourceConfig.secureJsonFields };
    newSecureJsonFields[field] = false;
    onChange({
      ...dataSourceConfig,
      secureJsonFields: newSecureJsonFields,
    });
  };

  const onCertificateChangeFactory = (field: string) => (event: React.SyntheticEvent<HTMLTextAreaElement>) => {
    const newSecureJsonData = { ...dataSourceConfig.secureJsonData };
    newSecureJsonData[field] = event.currentTarget.value;

    onChange({
      ...dataSourceConfig,
      secureJsonData: newSecureJsonData,
    });
  };

  return (
    <div className="gf-form-group">
      <div
        className={cx(
          'gf-form',
          css`
            align-items: baseline;
          `
        )}
      >
        <h6>TLS身份验证详细信息</h6>
        <Tooltip placement="right-end" content="TLS证书被加密并存储在Grafana数据库中。" theme="info">
          <div className="gf-form-help-icon gf-form-help-icon--right-normal">
            <Icon name="info-circle" size="xs" style={{ marginLeft: '10px' }} />
          </div>
        </Tooltip>
      </div>
      <div>
        {dataSourceConfig.jsonData.tlsAuthWithCACert && (
          <CertificationKey
            hasCert={!!hasTLSCACert}
            onChange={onCertificateChangeFactory('tlsCACert')}
            placeholder="起始于 -----BEGIN CERTIFICATE-----"
            label="CA证书"
            onClick={onResetClickFactory('tlsCACert')}
          />
        )}

        {dataSourceConfig.jsonData.tlsAuth && (
          <>
            <CertificationKey
              hasCert={!!hasTLSClientCert}
              label="客户端证书"
              onChange={onCertificateChangeFactory('tlsClientCert')}
              placeholder="起始于 -----BEGIN CERTIFICATE-----"
              onClick={onResetClickFactory('tlsClientCert')}
            />

            <CertificationKey
              hasCert={!!hasTLSClientKey}
              label="客户端密钥"
              placeholder="起始于 -----BEGIN RSA PRIVATE KEY-----"
              onChange={onCertificateChangeFactory('tlsClientKey')}
              onClick={onResetClickFactory('tlsClientKey')}
            />
          </>
        )}
      </div>
    </div>
  );
};
