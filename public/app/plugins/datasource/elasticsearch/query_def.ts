import _ from 'lodash';

export const metricAggTypes = [
  { text: 'Count', value: 'count', requiresField: false },
  {
    text: '平均',
    value: 'avg',
    requiresField: true,
    supportsInlineScript: true,
    supportsMissing: true,
  },
  {
    text: '总和',
    value: 'sum',
    requiresField: true,
    supportsInlineScript: true,
    supportsMissing: true,
  },
  {
    text: '最大',
    value: 'max',
    requiresField: true,
    supportsInlineScript: true,
    supportsMissing: true,
  },
  {
    text: '最小',
    value: 'min',
    requiresField: true,
    supportsInlineScript: true,
    supportsMissing: true,
  },
  {
    text: '扩展统计',
    value: 'extended_stats',
    requiresField: true,
    supportsMissing: true,
    supportsInlineScript: true,
  },
  {
    text: '百分位数',
    value: 'percentiles',
    requiresField: true,
    supportsMissing: true,
    supportsInlineScript: true,
  },
  {
    text: '唯一计数',
    value: 'cardinality',
    requiresField: true,
    supportsMissing: true,
  },
  {
    text: '移动平均线',
    value: 'moving_avg',
    requiresField: false,
    isPipelineAgg: true,
    minVersion: 2,
  },
  {
    text: '派生物',
    value: 'derivative',
    requiresField: false,
    isPipelineAgg: true,
    minVersion: 2,
  },
  {
    text: '累计总和',
    value: 'cumulative_sum',
    requiresField: false,
    isPipelineAgg: true,
    minVersion: 2,
  },
  {
    text: '桶脚本',
    value: 'bucket_script',
    requiresField: false,
    isPipelineAgg: true,
    supportsMultipleBucketPaths: true,
    minVersion: 2,
  },
  { text: '原始文件（旧版）', value: 'raw_document', requiresField: false },
  { text: '原始数据', value: 'raw_data', requiresField: false },
  { text: '日志', value: 'logs', requiresField: false },
];

export const bucketAggTypes = [
  { text: '项', value: 'terms', requiresField: true },
  { text: '过滤器', value: 'filters' },
  { text: '地理哈希网格', value: 'geohash_grid', requiresField: true },
  { text: '日期直方图', value: 'date_histogram', requiresField: true },
  { text: '直方图', value: 'histogram', requiresField: true },
];

export const orderByOptions = [
  { text: '文件计数', value: '_count' },
  { text: '期限值', value: '_term' },
];

export const orderOptions = [
  { text: '最高', value: 'desc' },
  { text: '最低', value: 'asc' },
];

export const sizeOptions = [
  { text: '无限制', value: '0' },
  { text: '1', value: '1' },
  { text: '2', value: '2' },
  { text: '3', value: '3' },
  { text: '5', value: '5' },
  { text: '10', value: '10' },
  { text: '15', value: '15' },
  { text: '20', value: '20' },
];

export const extendedStats = [
  { text: '平均', value: 'avg' },
  { text: '最小', value: 'min' },
  { text: '最大', value: 'max' },
  { text: '总和', value: 'sum' },
  { text: '计数', value: 'count' },
  { text: '标准偏差', value: 'std_deviation' },
  { text: '标准偏差上限', value: 'std_deviation_bounds_upper' },
  { text: '标准偏差下限', value: 'std_deviation_bounds_lower' },
];

export const intervalOptions = [
  { text: '自动', value: 'auto' },
  { text: '10s', value: '10s' },
  { text: '1m', value: '1m' },
  { text: '5m', value: '5m' },
  { text: '10m', value: '10m' },
  { text: '20m', value: '20m' },
  { text: '1h', value: '1h' },
  { text: '1d', value: '1d' },
];

export const movingAvgModelOptions = [
  { text: '简单', value: 'simple' },
  { text: '线性', value: 'linear' },
  { text: '指数加权', value: 'ewma' },
  { text: '霍尔特线性', value: 'holt' },
  { text: '霍尔特温特斯', value: 'holt_winters' },
];

export const pipelineOptions: any = {
  moving_avg: [
    { text: '窗口', default: 5 },
    { text: '模式', default: 'simple' },
    { text: '预测', default: undefined },
    { text: '最小化', default: false },
  ],
  derivative: [{ text: '单位', default: undefined }],
  cumulative_sum: [{ text: '格式化', default: undefined }],
  bucket_script: [],
};

export const movingAvgModelSettings: any = {
  simple: [],
  linear: [],
  ewma: [{ text: 'Alpha', value: 'alpha', default: undefined }],
  holt: [
    { text: 'Alpha', value: 'alpha', default: undefined },
    { text: 'Beta', value: 'beta', default: undefined },
  ],
  holt_winters: [
    { text: 'Alpha', value: 'alpha', default: undefined },
    { text: 'Beta', value: 'beta', default: undefined },
    { text: 'Gamma', value: 'gamma', default: undefined },
    { text: 'Period', value: 'period', default: undefined },
    { text: 'Pad', value: 'pad', default: undefined, isCheckbox: true },
  ],
};

export function getMetricAggTypes(esVersion: any) {
  return _.filter(metricAggTypes, f => {
    if (f.minVersion) {
      return f.minVersion <= esVersion;
    } else {
      return true;
    }
  });
}

export function getPipelineOptions(metric: any) {
  if (!isPipelineAgg(metric.type)) {
    return [];
  }

  return pipelineOptions[metric.type];
}

export function isPipelineAgg(metricType: any) {
  if (metricType) {
    const po = pipelineOptions[metricType];
    return po !== null && po !== undefined;
  }

  return false;
}

export function isPipelineAggWithMultipleBucketPaths(metricType: any) {
  if (metricType) {
    return metricAggTypes.find(t => t.value === metricType && t.supportsMultipleBucketPaths) !== undefined;
  }

  return false;
}

export function getPipelineAggOptions(targets: any) {
  const result: any[] = [];
  _.each(targets.metrics, metric => {
    if (!isPipelineAgg(metric.type)) {
      result.push({ text: describeMetric(metric), value: metric.id });
    }
  });

  return result;
}

export function getMovingAvgSettings(model: any, filtered: boolean) {
  const filteredResult: any[] = [];
  if (filtered) {
    _.each(movingAvgModelSettings[model], setting => {
      if (!setting.isCheckbox) {
        filteredResult.push(setting);
      }
    });
    return filteredResult;
  }
  return movingAvgModelSettings[model];
}

export function getOrderByOptions(target: any) {
  const metricRefs: any[] = [];
  _.each(target.metrics, metric => {
    if (metric.type !== 'count') {
      metricRefs.push({ text: describeMetric(metric), value: metric.id });
    }
  });

  return orderByOptions.concat(metricRefs);
}

export function describeOrder(order: string) {
  const def: any = _.find(orderOptions, { value: order });
  return def.text;
}

export function describeMetric(metric: { type: string; field: string }) {
  const def: any = _.find(metricAggTypes, { value: metric.type });
  if (!def.requiresField && !isPipelineAgg(metric.type)) {
    return def.text;
  }
  return def.text + ' ' + metric.field;
}

export function describeOrderBy(orderBy: any, target: any) {
  const def: any = _.find(orderByOptions, { value: orderBy });
  if (def) {
    return def.text;
  }
  const metric: any = _.find(target.metrics, { id: orderBy });
  if (metric) {
    return describeMetric(metric);
  } else {
    return '未发现指标';
  }
}

export function defaultMetricAgg() {
  return { type: 'count', id: '1' };
}

export function defaultBucketAgg() {
  return { type: 'date_histogram', id: '2', settings: { interval: 'auto' } };
}

export const findMetricById = (metrics: any[], id: any) => {
  return _.find(metrics, { id: id });
};

export function hasMetricOfType(target: any, type: string): boolean {
  return target && target.metrics && target.metrics.some((m: any) => m.type === type);
}
