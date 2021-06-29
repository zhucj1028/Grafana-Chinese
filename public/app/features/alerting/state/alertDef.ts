import _ from 'lodash';
import { QueryPartDef, QueryPart } from 'app/core/components/query_part/query_part';

const alertQueryDef = new QueryPartDef({
  type: 'query',
  params: [
    { name: 'queryRefId', type: 'string', dynamicLookup: true },
    {
      name: '从',
      type: 'string',
      options: ['10s', '1m', '5m', '10m', '15m', '1h', '24h', '48h'],
    },
    { name: '到', type: 'string', options: ['now', 'now-1m', 'now-5m', 'now-10m', 'now-1h'] },
  ],
  defaultParams: ['#A', '15m', 'now', 'avg'],
});

const conditionTypes = [{ text: '查询', value: 'query' }];

const alertStateSortScore = {
  alerting: 1,
  no_data: 2,
  pending: 3,
  ok: 4,
  paused: 5,
};

const evalFunctions = [
  { text: '大于', value: 'gt' },
  { text: '小于', value: 'lt' },
  { text: '超出范围', value: 'outside_range' },
  { text: '范围内', value: 'within_range' },
  { text: '没有值', value: 'no_value' },
];

const evalOperators = [
  { text: '后者', value: 'or' },
  { text: '并且', value: 'and' },
];

const reducerTypes = [
  { text: '平均值', value: 'avg' },
  { text: '最小值', value: 'min' },
  { text: '最大值', value: 'max' },
  { text: '总和', value: 'sum' },
  { text: '总计数值', value: 'count' },
  { text: '最后的值', value: 'last' },
  { text: '中位数', value: 'median' },
  { text: '差异值', value: 'diff' },
  { text: '差异绝对值', value: 'diff_abs' },
  { text: '差异百分比值', value: 'percent_diff' },
  { text: '差异百分比绝对值', value: 'percent_diff_abs' },
  { text: '不统计null值', value: 'count_non_null' },
];

const noDataModes = [
  { text: '警报', value: 'alerting' },
  { text: '无数据', value: 'no_data' },
  { text: '保持最后状态', value: 'keep_state' },
  { text: '好的', value: 'ok' },
];

const executionErrorModes = [
  { text: '警报', value: 'alerting' },
  { text: '保持最后状态', value: 'keep_state' },
];

function createReducerPart(model: any) {
  const def = new QueryPartDef({ type: model.type, defaultParams: [] });
  return new QueryPart(model, def);
}

function getStateDisplayModel(state: string) {
  switch (state) {
    case 'ok': {
      return {
        text: '好的',
        iconClass: 'heart',
        stateClass: 'alert-state-ok',
      };
    }
    case 'alerting': {
      return {
        text: '警报',
        iconClass: 'heart-break',
        stateClass: 'alert-state-critical',
      };
    }
    case 'no_data': {
      return {
        text: '无数据',
        iconClass: 'question-circle',
        stateClass: 'alert-state-warning',
      };
    }
    case 'paused': {
      return {
        text: '暂停',
        iconClass: 'pause',
        stateClass: 'alert-state-paused',
      };
    }
    case 'pending': {
      return {
        text: '出发警报中',
        iconClass: 'exclamation-triangle',
        stateClass: 'alert-state-warning',
      };
    }
    case 'unknown': {
      return {
        text: '未知',
        iconClass: 'question-circle',
        stateClass: 'alert-state-paused',
      };
    }
  }

  throw { message: '未知警告状态' };
}

function joinEvalMatches(matches: any, separator: string) {
  return _.reduce(
    matches,
    (res, ev) => {
      if (ev.metric !== undefined && ev.value !== undefined) {
        res.push(ev.metric + '=' + ev.value);
      }

      // For backwards compatibility . Should be be able to remove this after ~2017-06-01
      if (ev.Metric !== undefined && ev.Value !== undefined) {
        res.push(ev.Metric + '=' + ev.Value);
      }

      return res;
    },
    [] as string[]
  ).join(separator);
}

function getAlertAnnotationInfo(ah: any) {
  // backward compatibility, can be removed in grafana 5.x
  // old way stored evalMatches in data property directly,
  // new way stores it in evalMatches property on new data object

  if (_.isArray(ah.data)) {
    return joinEvalMatches(ah.data, ', ');
  } else if (_.isArray(ah.data.evalMatches)) {
    return joinEvalMatches(ah.data.evalMatches, ', ');
  }

  if (ah.data.error) {
    return 'Error: ' + ah.data.error;
  }

  return '';
}

export default {
  alertQueryDef: alertQueryDef,
  getStateDisplayModel: getStateDisplayModel,
  conditionTypes: conditionTypes,
  evalFunctions: evalFunctions,
  evalOperators: evalOperators,
  noDataModes: noDataModes,
  executionErrorModes: executionErrorModes,
  reducerTypes: reducerTypes,
  createReducerPart: createReducerPart,
  getAlertAnnotationInfo: getAlertAnnotationInfo,
  alertStateSortScore: alertStateSortScore,
};
