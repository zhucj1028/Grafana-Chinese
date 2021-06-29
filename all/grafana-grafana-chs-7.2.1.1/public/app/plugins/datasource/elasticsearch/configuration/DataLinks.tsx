import React from 'react';
import { css } from 'emotion';
import { Button, stylesFactory, useTheme } from '@grafana/ui';
import { GrafanaTheme, VariableOrigin, DataLinkBuiltInVars } from '@grafana/data';
import { DataLinkConfig } from '../types';
import { DataLink } from './DataLink';

const getStyles = stylesFactory((theme: GrafanaTheme) => ({
  infoText: css`
    padding-bottom: ${theme.spacing.md};
    color: ${theme.colors.textWeak};
  `,
  dataLink: css`
    margin-bottom: ${theme.spacing.sm};
  `,
}));

type Props = {
  value?: DataLinkConfig[];
  onChange: (value: DataLinkConfig[]) => void;
};
export const DataLinks = (props: Props) => {
  const { value, onChange } = props;
  const theme = useTheme();
  const styles = getStyles(theme);

  return (
    <>
      <h3 className="page-heading">数据连接</h3>

      <div className={styles.infoText}>将链接添加到现有字段。 链接将显示在字段值旁边的日志行详细信息中。</div>

      <div className="gf-form-group">
        {value &&
          value.map((field, index) => {
            return (
              <DataLink
                className={styles.dataLink}
                key={index}
                value={field}
                onChange={newField => {
                  const newDataLinks = [...value];
                  newDataLinks.splice(index, 1, newField);
                  onChange(newDataLinks);
                }}
                onDelete={() => {
                  const newDataLinks = [...value];
                  newDataLinks.splice(index, 1);
                  onChange(newDataLinks);
                }}
                suggestions={[
                  {
                    value: DataLinkBuiltInVars.valueRaw,
                    label: '原始值',
                    documentation: '字段的原始值',
                    origin: VariableOrigin.Value,
                  },
                ]}
              />
            );
          })}
        <div>
          <Button
            variant={'secondary'}
            className={css`
              margin-right: 10px;
            `}
            icon="plus"
            onClick={event => {
              event.preventDefault();
              const newDataLinks = [...(value || []), { field: '', url: '' }];
              onChange(newDataLinks);
            }}
          >
            添加
          </Button>
        </div>
      </div>
    </>
  );
};
