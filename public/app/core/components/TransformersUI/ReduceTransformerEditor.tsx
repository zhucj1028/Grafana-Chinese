import React from 'react';
import { StatsPicker } from '@grafana/ui';
import {
  DataTransformerID,
  ReducerID,
  standardTransformers,
  TransformerRegistyItem,
  TransformerUIProps,
} from '@grafana/data';

import { ReduceTransformerOptions } from '@grafana/data/src/transformations/transformers/reduce';
import { selectors } from '@grafana/e2e-selectors';

// TODO:  Minimal implementation, needs some <3
export const ReduceTransformerEditor: React.FC<TransformerUIProps<ReduceTransformerOptions>> = ({
  options,
  onChange,
}) => {
  return (
    <div className="gf-form-inline">
      <div className="gf-form gf-form--grow">
        <div className="gf-form-label width-8" aria-label={selectors.components.Transforms.Reduce.calculationsLabel}>
          计算方式
        </div>
        <StatsPicker
          className="flex-grow-1"
          placeholder="选择统计"
          allowMultiple
          stats={options.reducers || []}
          onChange={stats => {
            onChange({
              ...options,
              reducers: stats as ReducerID[],
            });
          }}
          menuPlacement="bottom"
        />
      </div>
    </div>
  );
};

export const reduceTransformRegistryItem: TransformerRegistyItem<ReduceTransformerOptions> = {
  id: DataTransformerID.reduce,
  editor: ReduceTransformerEditor,
  transformation: standardTransformers.reduceTransformer,
  name: standardTransformers.reduceTransformer.name,
  description: standardTransformers.reduceTransformer.description,
};
