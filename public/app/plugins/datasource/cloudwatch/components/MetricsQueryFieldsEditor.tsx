import React, { useState, useEffect } from 'react';
import { SelectableValue } from '@grafana/data';
import { Segment, SegmentAsync } from '@grafana/ui';
import { SelectableStrings, CloudWatchMetricsQuery } from '../types';
import { CloudWatchDatasource } from '../datasource';
import { Stats, Dimensions, QueryInlineField } from '.';

export type Props = {
  query: CloudWatchMetricsQuery;
  datasource: CloudWatchDatasource;
  onRunQuery?: () => void;
  onChange: (value: CloudWatchMetricsQuery) => void;
};

interface State {
  regions: SelectableStrings;
  namespaces: SelectableStrings;
  metricNames: SelectableStrings;
  variableOptionGroup: SelectableValue<string>;
  showMeta: boolean;
}

export function MetricsQueryFieldsEditor({
  query,
  datasource,
  onChange,
  onRunQuery = () => {},
}: React.PropsWithChildren<Props>) {
  const metricsQuery = query as CloudWatchMetricsQuery;

  const [state, setState] = useState<State>({
    regions: [],
    namespaces: [],
    metricNames: [],
    variableOptionGroup: {},
    showMeta: false,
  });

  useEffect(() => {
    const variableOptionGroup = {
      label: '模板变量',
      options: datasource.variables.map(toOption),
    };

    Promise.all([datasource.metricFindQuery('regions()'), datasource.metricFindQuery('namespaces()')]).then(
      ([regions, namespaces]) => {
        setState({
          ...state,
          regions: [...regions, variableOptionGroup],
          namespaces: [...namespaces, variableOptionGroup],
          variableOptionGroup,
        });
      }
    );
  }, []);

  const loadMetricNames = async () => {
    const { namespace, region } = query;
    return datasource.metricFindQuery(`metrics(${namespace},${region})`).then(appendTemplateVariables);
  };

  const appendTemplateVariables = (values: SelectableValue[]) => [
    ...values,
    { label: '模板变量', options: datasource.variables.map(toOption) },
  ];

  const toOption = (value: any) => ({ label: value, value });

  const onQueryChange = (query: CloudWatchMetricsQuery) => {
    onChange(query);
    onRunQuery();
  };

  // Load dimension values based on current selected dimensions.
  // Remove the new dimension key and all dimensions that has a wildcard as selected value
  const loadDimensionValues = (newKey: string) => {
    const { [newKey]: value, ...dim } = metricsQuery.dimensions;
    const newDimensions = Object.entries(dim).reduce(
      (result, [key, value]) => (value === '*' ? result : { ...result, [key]: value }),
      {}
    );
    return datasource
      .getDimensionValues(query.region, query.namespace, metricsQuery.metricName, newKey, newDimensions)
      .then(values => (values.length ? [{ value: '*', text: '*', label: '*' }, ...values] : values))
      .then(appendTemplateVariables);
  };

  const { regions, namespaces, variableOptionGroup } = state;
  return (
    <>
      <QueryInlineField label="区域">
        <Segment
          value={query.region}
          placeholder="选择区域"
          options={regions}
          allowCustomValue
          onChange={({ value: region }) => onQueryChange({ ...query, region: region! })}
        />
      </QueryInlineField>

      {query.expression?.length === 0 && (
        <>
          <QueryInlineField label="命名空间">
            <Segment
              value={query.namespace}
              placeholder="选择命名空间"
              allowCustomValue
              options={namespaces}
              onChange={({ value: namespace }) => onQueryChange({ ...query, namespace: namespace! })}
            />
          </QueryInlineField>

          <QueryInlineField label="指标名称">
            <SegmentAsync
              value={metricsQuery.metricName}
              placeholder="选择指标名称"
              allowCustomValue
              loadOptions={loadMetricNames}
              onChange={({ value: metricName }) => onQueryChange({ ...metricsQuery, metricName })}
            />
          </QueryInlineField>

          <QueryInlineField label="统计">
            <Stats
              stats={datasource.standardStatistics.map(toOption)}
              values={metricsQuery.statistics}
              onChange={statistics => onQueryChange({ ...metricsQuery, statistics })}
              variableOptionGroup={variableOptionGroup}
            />
          </QueryInlineField>

          <QueryInlineField label="尺寸">
            <Dimensions
              dimensions={metricsQuery.dimensions}
              onChange={dimensions => onQueryChange({ ...metricsQuery, dimensions })}
              loadKeys={() => datasource.getDimensionKeys(query.namespace, query.region).then(appendTemplateVariables)}
              loadValues={loadDimensionValues}
            />
          </QueryInlineField>
        </>
      )}
    </>
  );
}
