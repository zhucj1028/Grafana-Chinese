import React, { FunctionComponent } from 'react';
import { Button, stylesFactory } from '@grafana/ui';
import { css } from 'emotion';

const getStyles = stylesFactory(() => {
  return css`
    width: 508px;
    margin: 128px auto;
  `;
});

interface Props {
  error: Error | null;
}

export const ErrorLoadingChunk: FunctionComponent<Props> = ({ error }) => (
  <div className={getStyles()}>
    <h2>找不到应用程序文件</h2>
    <br />
    <h2 className="page-heading">Grafana可能已更新。请尝试重新加载页面。</h2>
    <br />
    <div className="gf-form-group">
      <Button size="md" variant="secondary" icon="repeat" onClick={() => window.location.reload()}>
        重载
      </Button>
    </div>
    <details style={{ whiteSpace: 'pre-wrap' }}>
      {error && error.message ? error.message : '发生意外错误'}
      <br />
      {error && error.stack ? error.stack : null}
    </details>
  </div>
);

ErrorLoadingChunk.displayName = 'ErrorLoadingChunk';
