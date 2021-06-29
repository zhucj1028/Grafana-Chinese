import React from 'react';
import { css, cx } from 'emotion';
import { stylesFactory, Icon } from '@grafana/ui';

type Props = {
  addQueryRowButtonDisabled?: boolean;
  addQueryRowButtonHidden?: boolean;
  richHistoryButtonActive?: boolean;
  queryInspectorButtonActive?: boolean;

  onClickAddQueryRowButton: () => void;
  onClickRichHistoryButton: () => void;
  onClickQueryInspectorButton: () => void;
};

const getStyles = stylesFactory(() => {
  return {
    button: css`
      margin: 1em 4px 0 0;
    `,
  };
});
export function SecondaryActions(props: Props) {
  const styles = getStyles();
  return (
    <div className="gf-form">
      {!props.addQueryRowButtonHidden && (
        <button
          aria-label="添加行按钮"
          className={`gf-form-label gf-form-label--btn ${styles.button}`}
          onClick={props.onClickAddQueryRowButton}
          disabled={props.addQueryRowButtonDisabled}
        >
          <Icon className="icon-margin-right" name="plus" size="sm" />
          <span className="btn-title">{'\xA0' + '添加查询'}</span>
        </button>
      )}
      <button
        aria-label="Rich history button"
        className={cx(`gf-form-label gf-form-label--btn ${styles.button}`, {
          ['explore-active-button']: props.richHistoryButtonActive,
        })}
        onClick={props.onClickRichHistoryButton}
      >
        <Icon className="icon-margin-right" name="history" size="sm" />
        <span className="btn-title">{'\xA0' + '查询历史'}</span>
      </button>
      <button
        aria-label="Query inspector button"
        className={cx(`gf-form-label gf-form-label--btn ${styles.button}`, {
          ['explore-active-button']: props.queryInspectorButtonActive,
        })}
        onClick={props.onClickQueryInspectorButton}
      >
        <Icon className="icon-margin-right" name="info-circle" size="sm" />
        <span className="btn-title">{'\xA0' + '查询检查器'}</span>
      </button>
    </div>
  );
}
