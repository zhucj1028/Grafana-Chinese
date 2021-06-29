import React, { PureComponent, ChangeEvent } from 'react';
import isEmpty from 'lodash/isEmpty';

import { ExploreQueryFieldProps } from '@grafana/data';
import { LegacyForms, ValidationEvents, EventsWithValidation, Icon } from '@grafana/ui';
const { Input, Switch } = LegacyForms;
import { CloudWatchQuery, CloudWatchMetricsQuery } from '../types';
import { CloudWatchDatasource } from '../datasource';
import { QueryField, Alias, MetricsQueryFieldsEditor } from './';

export type Props = ExploreQueryFieldProps<CloudWatchDatasource, CloudWatchQuery>;

interface State {
  showMeta: boolean;
}

const idValidationEvents: ValidationEvents = {
  [EventsWithValidation.onBlur]: [
    {
      rule: value => new RegExp(/^$|^[a-z][a-zA-Z0-9_]*$/).test(value),
      errorMessage: '无效的格式。只允许字母数字字符和下划线',
    },
  ],
};

export const normalizeQuery = ({
  namespace,
  metricName,
  expression,
  dimensions,
  region,
  id,
  alias,
  statistics,
  period,
  ...rest
}: CloudWatchMetricsQuery): CloudWatchMetricsQuery => {
  const normalizedQuery = {
    namespace: namespace || '',
    metricName: metricName || '',
    expression: expression || '',
    dimensions: dimensions || {},
    region: region || 'default',
    id: id || '',
    alias: alias || '',
    statistics: isEmpty(statistics) ? ['Average'] : statistics,
    period: period || '',
    ...rest,
  };
  return !rest.hasOwnProperty('matchExact') ? { ...normalizedQuery, matchExact: true } : normalizedQuery;
};

export class MetricsQueryEditor extends PureComponent<Props, State> {
  state: State = { showMeta: false };

  componentDidMount(): void {
    const metricsQuery = this.props.query as CloudWatchMetricsQuery;
    const query = normalizeQuery(metricsQuery);
    this.props.onChange(query);
  }

  onChange(query: CloudWatchMetricsQuery) {
    const { onChange, onRunQuery } = this.props;
    onChange(query);
    onRunQuery();
  }

  render() {
    const { data, onRunQuery } = this.props;
    const metricsQuery = this.props.query as CloudWatchMetricsQuery;
    const { showMeta } = this.state;
    const query = normalizeQuery(metricsQuery);
    const metaDataExist = data && Object.values(data).length && data.state === 'Done';

    return (
      <>
        <MetricsQueryFieldsEditor {...{ ...this.props, query }}></MetricsQueryFieldsEditor>
        {query.statistics.length <= 1 && (
          <div className="gf-form-inline">
            <div className="gf-form">
              <QueryField label="Id" tooltip="Id 可以包括数字、字母和下划线，必须以小写字母开头。">
                <Input
                  className="gf-form-input width-8"
                  onBlur={onRunQuery}
                  onChange={(event: ChangeEvent<HTMLInputElement>) =>
                    this.onChange({ ...metricsQuery, id: event.target.value })
                  }
                  validationEvents={idValidationEvents}
                  value={query.id}
                />
              </QueryField>
            </div>
            <div className="gf-form gf-form--grow">
              <QueryField
                className="gf-form--grow"
                label="表达式"
                tooltip="您可以选择在这里添加一个表达式。请注意，如果正在使用引用其他查询的数学表达式，将不可能基于此查询创建警报规则"
              >
                <Input
                  className="gf-form-input"
                  onBlur={onRunQuery}
                  value={query.expression || ''}
                  onChange={(event: ChangeEvent<HTMLInputElement>) =>
                    this.onChange({ ...metricsQuery, expression: event.target.value })
                  }
                />
              </QueryField>
            </div>
          </div>
        )}
        <div className="gf-form-inline">
          <div className="gf-form">
            <QueryField label="Period" tooltip="以秒为单位的最小间隔时间">
              <Input
                className="gf-form-input width-8"
                value={query.period || ''}
                placeholder="自动"
                onBlur={onRunQuery}
                onChange={(event: ChangeEvent<HTMLInputElement>) =>
                  this.onChange({ ...metricsQuery, period: event.target.value })
                }
              />
            </QueryField>
          </div>
          <div className="gf-form">
            <QueryField
              label="别名"
              tooltip="别名替换变量: {{metric}}, {{stat}}, {{namespace}}, {{region}}, {{period}}, {{label}}, {{YOUR_DIMENSION_NAME}}"
            >
              <Alias
                value={metricsQuery.alias}
                onChange={(value: string) => this.onChange({ ...metricsQuery, alias: value })}
              />
            </QueryField>
            <Switch
              label="匹配精确"
              labelClass="query-keyword"
              tooltip="仅显示精确匹配所有定义维度名称的指标。"
              checked={metricsQuery.matchExact}
              onChange={() =>
                this.onChange({
                  ...metricsQuery,
                  matchExact: !metricsQuery.matchExact,
                })
              }
            />
            <label className="gf-form-label">
              <a
                onClick={() =>
                  metaDataExist &&
                  this.setState({
                    showMeta: !showMeta,
                  })
                }
              >
                <Icon name={showMeta ? 'angle-down' : 'angle-right'} /> {showMeta ? 'Hide' : 'Show'} Query Preview
              </a>
            </label>
          </div>
          <div className="gf-form gf-form--grow">
            <div className="gf-form-label gf-form-label--grow" />
          </div>
          {showMeta && metaDataExist && (
            <table className="filter-table form-inline">
              <thead>
                <tr>
                  <th>度量数据查询ID</th>
                  <th>度量数据查询表达式</th>
                  <th>周期</th>
                  <th />
                </tr>
              </thead>
              <tbody>
                {data?.series?.[0]?.meta?.gmdMeta?.map(({ ID, Expression, Period }: any) => (
                  <tr key={ID}>
                    <td>{ID}</td>
                    <td>{Expression}</td>
                    <td>{Period}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </>
    );
  }
}
