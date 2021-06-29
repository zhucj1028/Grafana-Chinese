import React, { FC } from 'react';

import { SelectableValue } from '@grafana/data';
import { Segment } from '@grafana/ui';

export interface Props {
  onChange: (perSeriesAligner: string) => void;
  templateVariableOptions: Array<SelectableValue<string>>;
  alignOptions: Array<SelectableValue<string>>;
  perSeriesAligner: string;
}

export const Alignments: FC<Props> = ({ perSeriesAligner, templateVariableOptions, onChange, alignOptions }) => {
  return (
    <>
      <div className="gf-form-inline">
        <div className="gf-form offset-width-9">
          <label className="gf-form-label query-keyword width-15">对齐</label>
          <Segment
            onChange={({ value }) => onChange(value!)}
            value={[...alignOptions, ...templateVariableOptions].find(s => s.value === perSeriesAligner)}
            options={[
              {
                label: '模板变量',
                options: templateVariableOptions,
              },
              {
                label: '对齐选项',
                expanded: true,
                options: alignOptions,
              },
            ]}
            placeholder="选择对齐"
          ></Segment>
        </div>
      </div>
    </>
  );
};
