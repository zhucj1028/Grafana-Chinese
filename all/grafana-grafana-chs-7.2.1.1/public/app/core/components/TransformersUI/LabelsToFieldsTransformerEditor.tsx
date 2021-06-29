import React from 'react';
import {
  DataTransformerID,
  standardTransformers,
  TransformerRegistyItem,
  TransformerUIProps,
  SelectableValue,
} from '@grafana/data';
import { Select } from '@grafana/ui';

import { LabelsToFieldsOptions } from '@grafana/data/src/transformations/transformers/labelsToFields';

export const LabelsAsFieldsTransformerEditor: React.FC<TransformerUIProps<LabelsToFieldsOptions>> = ({
  input,
  options,
  onChange,
}) => {
  let labelNames: Array<SelectableValue<string>> = [];
  let uniqueLabels: Record<string, boolean> = {};

  for (const frame of input) {
    for (const field of frame.fields) {
      if (!field.labels) {
        continue;
      }

      for (const labelName of Object.keys(field.labels)) {
        if (!uniqueLabels[labelName]) {
          labelNames.push({ value: labelName, label: labelName });
          uniqueLabels[labelName] = true;
        }
      }
    }
  }

  const onValueLabelChange = (value: SelectableValue<string> | null) => {
    onChange({ valueLabel: value?.value });
  };

  return (
    <div className="gf-form-inline">
      <div className="gf-form">
        <div className="gf-form-label width-8">值字段名</div>
        <Select
          isClearable={true}
          allowCustomValue={false}
          placeholder="（可选）选择标签"
          options={labelNames}
          className="min-width-18 gf-form-spacing"
          value={options?.valueLabel}
          onChange={onValueLabelChange}
          menuPlacement="bottom"
        />
      </div>
    </div>
  );
};

export const labelsToFieldsTransformerRegistryItem: TransformerRegistyItem<LabelsToFieldsOptions> = {
  id: DataTransformerID.labelsToFields,
  editor: LabelsAsFieldsTransformerEditor,
  transformation: standardTransformers.labelsToFieldsTransformer,
  name: '字段标签',
  description: `按时间分组序列，并将标签或标签作为字段返回。
  对于在表格中显示带有标签的时间序列很有用，其中每个标签键都变成一个单独的列`,
};
