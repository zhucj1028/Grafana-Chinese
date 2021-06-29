import React, { useState } from 'react';
import { css } from 'emotion';
import { Button, stylesFactory, useTheme } from '@grafana/ui';
import { GrafanaTheme, VariableOrigin, DataLinkBuiltInVars } from '@grafana/data';
import { DerivedFieldConfig } from '../types';
import { DerivedField } from './DerivedField';
import { DebugSection } from './DebugSection';

const getStyles = stylesFactory((theme: GrafanaTheme) => ({
  infoText: css`
    padding-bottom: ${theme.spacing.md};
    color: ${theme.colors.textWeak};
  `,
  derivedField: css`
    margin-bottom: ${theme.spacing.sm};
  `,
}));

type Props = {
  value?: DerivedFieldConfig[];
  onChange: (value: DerivedFieldConfig[]) => void;
};

export const DerivedFields = (props: Props) => {
  const { value, onChange } = props;
  const theme = useTheme();
  const styles = getStyles(theme);

  const [showDebug, setShowDebug] = useState(false);

  return (
    <>
      <h3 className="page-heading">派生字段</h3>

      <div className={styles.infoText}>派生字段可用于从日志消息中提取新字段，并根据其值创建链接。</div>

      <div className="gf-form-group">
        {value &&
          value.map((field, index) => {
            return (
              <DerivedField
                className={styles.derivedField}
                key={index}
                value={field}
                onChange={newField => {
                  const newDerivedFields = [...value];
                  newDerivedFields.splice(index, 1, newField);
                  onChange(newDerivedFields);
                }}
                onDelete={() => {
                  const newDerivedFields = [...value];
                  newDerivedFields.splice(index, 1);
                  onChange(newDerivedFields);
                }}
                suggestions={[
                  {
                    value: DataLinkBuiltInVars.valueRaw,
                    label: '原始值',
                    documentation: '正则表达式捕获的确切字符串',
                    origin: VariableOrigin.Value,
                  },
                ]}
              />
            );
          })}
        <div>
          <Button
            variant="secondary"
            className={css`
              margin-right: 10px;
            `}
            icon="plus"
            onClick={event => {
              event.preventDefault();
              const newDerivedFields = [...(value || []), { name: '', matcherRegex: '' }];
              onChange(newDerivedFields);
            }}
          >
            添加
          </Button>

          {value && value.length > 0 && (
            <Button variant="secondary" onClick={() => setShowDebug(!showDebug)}>
              {showDebug ? '隐藏示例日志消息' : '显示示例日志消息'}
            </Button>
          )}
        </div>
      </div>

      {showDebug && (
        <div className="gf-form-group">
          <DebugSection
            className={css`
              margin-bottom: 10px;
            `}
            derivedFields={value}
          />
        </div>
      )}
    </>
  );
};
