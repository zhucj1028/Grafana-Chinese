import React from 'react';
import { ExploreStartPageProps, DataQuery } from '@grafana/data';

const CHEAT_SHEET_ITEMS = [
  {
    title: '请求速率',
    expression: 'rate(http_request_total[5m])',
    label: '给定一个HTTP请求计数器，此查询将计算最近5分钟的每秒平均请求速率。',
  },
  {
    title: '请求延迟的95％',
    expression: 'histogram_quantile(0.95, sum(rate(prometheus_http_request_duration_seconds_bucket[5m])) by (le))',
    label: '计算5分钟内HTTP请求率的95％。',
  },
  {
    title: '警报触发',
    expression: 'sort_desc(sum(sum_over_time(ALERTS{alertstate="firing"}[24h])) by (alertname))',
    label: '总结过去24小时内一直触发的警报。',
  },
  {
    title: 'Step',
    label:
      '使用持续时间格式（15s，1m，3h等）定义图形分辨率。 小步长会创建高分辨率图形，但在较大的时间范围内可能会变慢。 使用更长的步骤会降低分辨率，并通过产生更少的数据点来平滑图形。 如果没有步骤给出的分辨率自动计算。',
  },
];

export default (props: ExploreStartPageProps) => (
  <div>
    <h2>PromQL备忘单</h2>
    {CHEAT_SHEET_ITEMS.map((item, index) => (
      <div className="cheat-sheet-item" key={index}>
        <div className="cheat-sheet-item__title">{item.title}</div>
        {item.expression ? (
          <div
            className="cheat-sheet-item__example"
            onClick={e => props.onClickExample({ refId: 'A', expr: item.expression } as DataQuery)}
          >
            <code>{item.expression}</code>
          </div>
        ) : null}
        <div className="cheat-sheet-item__label">{item.label}</div>
      </div>
    ))}
  </div>
);
