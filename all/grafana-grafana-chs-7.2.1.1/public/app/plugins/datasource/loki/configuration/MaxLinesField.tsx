import React from 'react';
import { LegacyForms } from '@grafana/ui';
const { FormField } = LegacyForms;

type Props = {
  value: string;
  onChange: (value: string) => void;
};

export const MaxLinesField = (props: Props) => {
  const { value, onChange } = props;
  return (
    <FormField
      label="最大行数"
      labelWidth={11}
      inputWidth={20}
      inputEl={
        <input
          type="number"
          className="gf-form-input width-8 gf-form-input--has-help-icon"
          value={value}
          onChange={event => onChange(event.currentTarget.value)}
          spellCheck={false}
          placeholder="1000"
        />
      }
      tooltip={
        <>
          Loki查询必须包含返回的最大行数限制（默认值：1000）。 增加此限制可为临时分析提供更大的结果集。
          如果显示日志结果时浏览器变慢，请减小此限制。
        </>
      }
    />
  );
};
