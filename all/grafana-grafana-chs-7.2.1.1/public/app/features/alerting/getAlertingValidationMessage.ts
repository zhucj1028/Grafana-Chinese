import { DataQuery } from '@grafana/data';
import { DataSourceSrv } from '@grafana/runtime';
import { DataTransformerConfig } from '@grafana/data';

export const getDefaultCondition = () => ({
  type: 'query',
  query: { params: ['A', '5m', 'now'] },
  reducer: { type: 'avg', params: [] as any[] },
  evaluator: { type: 'gt', params: [null] as any[] },
  operator: { type: 'and' },
});

export const getAlertingValidationMessage = async (
  transformations: DataTransformerConfig[] | undefined,
  targets: DataQuery[],
  datasourceSrv: DataSourceSrv,
  datasourceName: string | null
): Promise<string> => {
  if (targets.length === 0) {
    return '找不到任何指标查询';
  }

  if (transformations && transformations.length) {
    return '警报查询不支持转换';
  }

  let alertingNotSupported = 0;
  let templateVariablesNotSupported = 0;

  for (const target of targets) {
    const dsName = target.datasource || datasourceName;
    const ds = await datasourceSrv.get(dsName);
    if (!ds.meta.alerting) {
      alertingNotSupported++;
    } else if (ds.targetContainsTemplate && ds.targetContainsTemplate(target)) {
      templateVariablesNotSupported++;
    }
  }

  if (alertingNotSupported === targets.length) {
    return '数据源不支持警报查询';
  }

  if (templateVariablesNotSupported === targets.length) {
    return '警报查询中不支持模板变量';
  }

  return '';
};
