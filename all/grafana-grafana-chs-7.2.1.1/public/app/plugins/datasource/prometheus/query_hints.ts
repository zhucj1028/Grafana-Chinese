import _ from 'lodash';
import { QueryHint, QueryFix } from '@grafana/data';
import { PrometheusDatasource } from './datasource';

/**
 * Number of time series results needed before starting to suggest sum aggregation hints
 */
export const SUM_HINT_THRESHOLD_COUNT = 20;

export function getQueryHints(query: string, series?: any[], datasource?: PrometheusDatasource): QueryHint[] {
  const hints = [];

  // ..._bucket metric needs a histogram_quantile()
  const histogramMetric = query.trim().match(/^\w+_bucket$/);
  if (histogramMetric) {
    const label = '时间序列有桶，您可能想要直方图。';
    hints.push({
      type: 'HISTOGRAM_QUANTILE',
      label,
      fix: {
        label: '通过添加进行更改 histogram_quantile().',
        action: {
          type: 'ADD_HISTOGRAM_QUANTILE',
          query,
        },
      } as QueryFix,
    });
  }

  // Check for need of rate()
  if (query.indexOf('rate(') === -1 && query.indexOf('increase(') === -1) {
    // Use metric metadata for exact types
    const nameMatch = query.match(/\b(\w+_(total|sum|count))\b/);
    let counterNameMetric = nameMatch ? nameMatch[1] : '';
    const metricsMetadata = datasource?.languageProvider?.metricsMetadata ?? {};
    const metricMetadataKeys = Object.keys(metricsMetadata);
    let certain = false;

    if (metricMetadataKeys.length > 0) {
      counterNameMetric =
        metricMetadataKeys.find(metricName => {
          // Only considering first type information, could be non-deterministic
          const metadata = metricsMetadata[metricName][0];
          if (metadata.type.toLowerCase() === 'counter') {
            const metricRegex = new RegExp(`\\b${metricName}\\b`);
            if (query.match(metricRegex)) {
              certain = true;
              return true;
            }
          }
          return false;
        }) ?? '';
    }

    if (counterNameMetric) {
      const simpleMetric = query.trim().match(/^\w+$/);
      const verb = certain ? '是' : '像';
      let label = `指标 ${counterNameMetric} ${verb} 计数器。`;
      let fix: QueryFix | undefined;

      if (simpleMetric) {
        fix = {
          label: '通过添加进行更改 rate().',
          action: {
            type: 'ADD_RATE',
            query,
          },
        };
      } else {
        label = `${label} 尝试应用 rate() 函数。`;
      }

      hints.push({
        type: 'APPLY_RATE',
        label,
        fix,
      });
    }
  }

  // Check for recording rules expansion
  if (datasource && datasource.ruleMappings) {
    const mapping = datasource.ruleMappings;
    const mappingForQuery = Object.keys(mapping).reduce((acc, ruleName) => {
      if (query.search(ruleName) > -1) {
        return {
          ...acc,
          [ruleName]: mapping[ruleName],
        };
      }
      return acc;
    }, {});
    if (_.size(mappingForQuery) > 0) {
      const label = '查询包含记录规则。';
      hints.push({
        type: 'EXPAND_RULES',
        label,
        fix: ({
          label: '扩展规则',
          action: {
            type: 'EXPAND_RULES',
            query,
            mapping: mappingForQuery,
          },
        } as any) as QueryFix,
      });
    }
  }

  if (series && series.length >= SUM_HINT_THRESHOLD_COUNT) {
    const simpleMetric = query.trim().match(/^\w+$/);
    if (simpleMetric) {
      hints.push({
        type: 'ADD_SUM',
        label: '返回了许多时间序列结果。',
        fix: {
          label: '考虑使用 sum() 进行聚合。',
          action: {
            type: 'ADD_SUM',
            query: query,
            preventSubmit: true,
          },
        } as QueryFix,
      });
    }
  }

  return hints;
}
