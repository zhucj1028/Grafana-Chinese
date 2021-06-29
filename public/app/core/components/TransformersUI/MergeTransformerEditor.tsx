import React from 'react';
import { DataTransformerID, standardTransformers, TransformerRegistyItem, TransformerUIProps } from '@grafana/data';
import { MergeTransformerOptions } from '@grafana/data/src/transformations/transformers/merge';

export const MergeTransformerEditor: React.FC<TransformerUIProps<MergeTransformerOptions>> = ({
  input,
  options,
  onChange,
}) => {
  return null;
};

export const mergeTransformerRegistryItem: TransformerRegistyItem<MergeTransformerOptions> = {
  id: DataTransformerID.merge,
  editor: MergeTransformerEditor,
  transformation: standardTransformers.mergeTransformer,
  name: '合并',
  description: `合并许多序列/表，并返回一个表，其中可合并的值将合并到同一行中。
  用于显示表格中可视化的多个序列，表格或两者的组合。`,
};
