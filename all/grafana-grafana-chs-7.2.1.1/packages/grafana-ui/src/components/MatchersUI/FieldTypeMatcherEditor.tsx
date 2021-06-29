import React, { memo, useMemo, useCallback } from 'react';
import { MatcherUIProps, FieldMatcherUIRegistryItem } from './types';
import { FieldMatcherID, fieldMatchers, SelectableValue, FieldType, DataFrame } from '@grafana/data';
import { Select } from '../Select/Select';

export const FieldTypeMatcherEditor = memo<MatcherUIProps<string>>(props => {
  const { data, options } = props;
  const counts = useFieldCounts(data);
  const selectOptions = useSelectOptions(counts, options);

  const onChange = useCallback(
    (selection: SelectableValue<string>) => {
      return props.onChange(selection.value!);
    },
    [counts, props.onChange]
  );

  const selectedOption = selectOptions.find(v => v.value === options);
  return <Select value={selectedOption} options={selectOptions} onChange={onChange} />;
});

const allTypes: Array<SelectableValue<FieldType>> = [
  { value: FieldType.number, label: '数字' },
  { value: FieldType.string, label: '字符串' },
  { value: FieldType.time, label: '时间' },
  { value: FieldType.boolean, label: '布尔' },
  { value: FieldType.trace, label: '追踪' },
  { value: FieldType.other, label: '其他' },
];

const useFieldCounts = (data: DataFrame[]): Map<FieldType, number> => {
  return useMemo(() => {
    const counts: Map<FieldType, number> = new Map();
    for (const t of allTypes) {
      counts.set(t.value!, 0);
    }
    for (const frame of data) {
      for (const field of frame.fields) {
        const key = field.type || FieldType.other;
        let v = counts.get(key);
        if (!v) {
          v = 0;
        }
        counts.set(key, v + 1);
      }
    }
    return counts;
  }, [data]);
};

const useSelectOptions = (counts: Map<string, number>, opt?: string): Array<SelectableValue<string>> => {
  return useMemo(() => {
    let found = false;
    const options: Array<SelectableValue<string>> = [];
    for (const t of allTypes) {
      const count = counts.get(t.value!);
      const match = opt === t.value;
      if (count || match) {
        options.push({
          ...t,
          label: `${t.label} (${counts.get(t.value!)})`,
        });
      }
      if (match) {
        found = true;
      }
    }
    if (opt && !found) {
      options.push({
        value: opt,
        label: `${opt} (没有匹配)`,
      });
    }
    return options;
  }, [counts, opt]);
};

export const fieldTypeMatcherItem: FieldMatcherUIRegistryItem<string> = {
  id: FieldMatcherID.byType,
  component: FieldTypeMatcherEditor,
  matcher: fieldMatchers.get(FieldMatcherID.byType),
  name: '类型的字段',
  description: '设置特定类型（数字，字符串，布尔值）的字段的属性',
  optionsToLabel: options => options,
};
