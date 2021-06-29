import React from 'react';
import { DataTransformerID, standardTransformers, TransformerRegistyItem, TransformerUIProps } from '@grafana/data';
import { SeriesToRowsTransformerOptions } from '@grafana/data/src/transformations/transformers/seriesToRows';

export const SeriesToRowsTransformerEditor: React.FC<TransformerUIProps<SeriesToRowsTransformerOptions>> = ({
  input,
  options,
  onChange,
}) => {
  return null;
};

export const seriesToRowsTransformerRegistryItem: TransformerRegistyItem<SeriesToRowsTransformerOptions> = {
  id: DataTransformerID.seriesToRows,
  editor: SeriesToRowsTransformerEditor,
  transformation: standardTransformers.seriesToRowsTransformer,
  name: '序列到行',
  description: `合并多个序列，并以时间，度量和值作为列返回单个序列。用于显示表格中可视化的多个时间序列。`,
};
