import React, { memo, useCallback } from 'react';
import { MatcherUIProps, FieldMatcherUIRegistryItem } from './types';
import { FieldMatcherID, fieldMatchers } from '@grafana/data';
import { Input } from '../Input/Input';

export const FieldNameByRegexMatcherEditor = memo<MatcherUIProps<string>>(props => {
  const { options } = props;

  const onBlur = useCallback(
    (e: React.FocusEvent<HTMLInputElement>) => {
      return props.onChange(e.target.value);
    },
    [props.onChange]
  );

  return <Input placeholder="输入正则表达式" defaultValue={options} onBlur={onBlur} />;
});

export const fieldNameByRegexMatcherItem: FieldMatcherUIRegistryItem<string> = {
  id: FieldMatcherID.byRegexp,
  component: FieldNameByRegexMatcherEditor,
  matcher: fieldMatchers.get(FieldMatcherID.byRegexp),
  name: '使用正则表达式按字段过滤',
  description: '设置名称与提供的正则表达式匹配的字段的属性',
  optionsToLabel: options => options,
};
