import React from 'react';
import { LegacyForms } from '@grafana/ui';
const { FormField } = LegacyForms;
import { ElasticsearchOptions } from '../types';

type Props = {
  value: ElasticsearchOptions;
  onChange: (value: ElasticsearchOptions) => void;
};
export const LogsConfig = (props: Props) => {
  const { value, onChange } = props;
  const changeHandler = (key: keyof ElasticsearchOptions) => (
    event: React.SyntheticEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    onChange({
      ...value,
      [key]: event.currentTarget.value,
    });
  };

  return (
    <>
      <h3 className="page-heading">日志</h3>

      <div className="gf-form-group">
        <div className="gf-form max-width-30">
          <FormField
            labelWidth={11}
            label="消息字段名称"
            value={value.logMessageField}
            onChange={changeHandler('logMessageField')}
            placeholder="_source"
          />
        </div>
        <div className="gf-form max-width-30">
          <FormField
            labelWidth={11}
            label="级别字段名称"
            value={value.logLevelField}
            onChange={changeHandler('logLevelField')}
          />
        </div>
      </div>
    </>
  );
};
