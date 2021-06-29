import React from 'react';
import { Icon } from '@grafana/ui';

export interface Props {
  apiKey: string;
  rootPath: string;
}

export const ApiKeysAddedModal = (props: Props) => {
  return (
    <div className="modal-body">
      <div className="modal-header">
        <h2 className="modal-header-title">
          <Icon name="key-skeleton-alt" size="lg" />
          <span className="p-l-1">API密钥已创建</span>
        </h2>

        <a className="modal-header-close" ng-click="dismiss();">
          <Icon name="times" />
        </a>
      </div>

      <div className="modal-content">
        <div className="gf-form-group">
          <div className="gf-form">
            <span className="gf-form-label">密钥</span>
            <span className="gf-form-label">{props.apiKey}</span>
          </div>
        </div>

        <div className="grafana-info-box" style={{ border: 0 }}>
          您将只能在这里查看一次该密钥！ 它不是以这种形式存储的。 因此，请务必立即复制。
          <br />
          <br />
          您可以使用Authorization HTTP标头验证请求，例如：
          <br />
          <br />
          <pre className="small">
            curl -H "Authorization: Bearer {props.apiKey}" {props.rootPath}/api/dashboards/home
          </pre>
        </div>
      </div>
    </div>
  );
};

export default ApiKeysAddedModal;
