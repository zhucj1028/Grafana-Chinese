import _ from 'lodash';
import flatten from 'app/core/utils/flatten';
import TimeSeries from 'app/core/time_series2';
import TableModel, { mergeTablesIntoModel } from 'app/core/table_model';
import { TableTransform } from './types';
import { Column, TableData } from '@grafana/data';

const transformers: { [key: string]: TableTransform } = {};
export const timeSeriesFormatFilterer = (data: any): any[] => {
  if (!Array.isArray(data)) {
    return data.datapoints ? [data] : [];
  }

  return data.reduce((acc, series) => {
    if (!series.datapoints) {
      return acc;
    }

    return acc.concat(series);
  }, []);
};

export const tableDataFormatFilterer = (data: any): any[] => {
  if (!Array.isArray(data)) {
    return data.columns ? [data] : [];
  }

  return data.reduce((acc, series) => {
    if (!series.columns) {
      return acc;
    }

    return acc.concat(series);
  }, []);
};

transformers['timeseries_to_rows'] = {
  description: '时间序列到行',
  getColumns: () => {
    return [];
  },
  transform: (data, panel, model) => {
    model.columns = [{ text: '时间', type: 'date' }, { text: '指标' }, { text: '值' }];
    const filteredData = timeSeriesFormatFilterer(data);

    for (let i = 0; i < filteredData.length; i++) {
      const series = filteredData[i];
      for (let y = 0; y < series.datapoints.length; y++) {
        const dp = series.datapoints[y];
        model.rows.push([dp[1], series.target, dp[0]]);
      }
    }
  },
};

transformers['timeseries_to_columns'] = {
  description: '时间序列到列',
  getColumns: () => {
    return [];
  },
  transform: (data, panel, model) => {
    model.columns.push({ text: '时间', type: 'date' });

    // group by time
    const points: any = {};
    const filteredData = timeSeriesFormatFilterer(data);

    for (let i = 0; i < filteredData.length; i++) {
      const series = filteredData[i];
      model.columns.push({ text: series.target });

      for (let y = 0; y < series.datapoints.length; y++) {
        const dp = series.datapoints[y];
        const timeKey = dp[1].toString();

        if (!points[timeKey]) {
          points[timeKey] = { time: dp[1] };
          points[timeKey][i] = dp[0];
        } else {
          points[timeKey][i] = dp[0];
        }
      }
    }

    for (const time in points) {
      const point = points[time];
      const values = [point.time];

      for (let i = 0; i < filteredData.length; i++) {
        const value = point[i];
        values.push(value);
      }

      model.rows.push(values);
    }
  },
};

transformers['timeseries_aggregations'] = {
  description: '时间序列汇聚',
  getColumns: () => {
    return [
      { text: '平均', value: 'avg' },
      { text: '最小', value: 'min' },
      { text: '最大', value: 'max' },
      { text: '总计', value: 'total' },
      { text: '当前', value: 'current' },
      { text: '计数', value: 'count' },
    ];
  },
  transform: (data, panel, model) => {
    let i, y;
    model.columns.push({ text: 'Metric' });

    for (i = 0; i < panel.columns.length; i++) {
      model.columns.push({ text: panel.columns[i].text });
    }

    const filteredData = timeSeriesFormatFilterer(data);

    for (i = 0; i < filteredData.length; i++) {
      const series = new TimeSeries({
        datapoints: filteredData[i].datapoints,
        alias: filteredData[i].target,
      });

      series.getFlotPairs('connected');
      const cells = [series.alias];

      for (y = 0; y < panel.columns.length; y++) {
        cells.push(series.stats[panel.columns[y].value]);
      }

      model.rows.push(cells);
    }
  },
};

transformers['annotations'] = {
  description: '注解',
  getColumns: () => {
    return [];
  },
  transform: (data, panel, model) => {
    model.columns.push({ text: '时间', type: 'date' });
    model.columns.push({ text: '标题' });
    model.columns.push({ text: '文本' });
    model.columns.push({ text: '标签' });

    if (!data || !data.annotations || data.annotations.length === 0) {
      return;
    }

    for (let i = 0; i < data.annotations.length; i++) {
      const evt = data.annotations[i];
      model.rows.push([evt.time, evt.title, evt.text, evt.tags]);
    }
  },
};

transformers['table'] = {
  description: '表格',
  getColumns: data => {
    if (!data || data.length === 0) {
      return [];
    }

    // Single query returns data columns as is
    if (data.length === 1) {
      return [...data[0].columns];
    }

    const filteredData = tableDataFormatFilterer(data);

    // Track column indexes: name -> index
    const columnNames: any = {};

    // Union of all columns
    const columns = filteredData.reduce((acc: Column[], series: TableData) => {
      series.columns.forEach(col => {
        const { text } = col;
        if (columnNames[text] === undefined) {
          columnNames[text] = acc.length;
          acc.push(col);
        }
      });
      return acc;
    }, []);

    return columns;
  },
  transform: (data: any[], panel, model) => {
    if (!data || data.length === 0) {
      return;
    }
    const filteredData = tableDataFormatFilterer(data);
    const noTableIndex = _.findIndex(filteredData, d => 'columns' in d && 'rows' in d);
    if (noTableIndex < 0) {
      throw {
        message: `查询结果 #${String.fromCharCode(65 + noTableIndex)} 不是表格格式, 尝试使用其他转换。`,
      };
    }

    mergeTablesIntoModel(model, ...filteredData);
  },
};

transformers['json'] = {
  description: 'JSON数据',
  getColumns: data => {
    if (!data || data.length === 0) {
      return [];
    }

    const names: any = {};
    for (let i = 0; i < data.length; i++) {
      const series = data[i];
      if (series.type !== 'docs') {
        continue;
      }

      // only look at 100 docs
      const maxDocs = Math.min(series.datapoints.length, 100);
      for (let y = 0; y < maxDocs; y++) {
        const doc = series.datapoints[y];
        const flattened = flatten(doc, {});
        for (const propName in flattened) {
          names[propName] = true;
        }
      }
    }

    return _.map(names, (value, key) => {
      return { text: key, value: key };
    });
  },
  transform: (data, panel, model) => {
    let i, y, z;

    for (const column of panel.columns) {
      const tableCol: any = { text: column.text };

      // if filterable data then set columns to filterable
      if (data.length > 0 && data[0].filterable) {
        tableCol.filterable = true;
      }

      model.columns.push(tableCol);
    }

    if (model.columns.length === 0) {
      model.columns.push({ text: 'JSON' });
    }

    for (i = 0; i < data.length; i++) {
      const series = data[i];

      for (y = 0; y < series.datapoints.length; y++) {
        const dp = series.datapoints[y];
        const values = [];

        if (_.isObject(dp) && panel.columns.length > 0) {
          const flattened = flatten(dp);
          for (z = 0; z < panel.columns.length; z++) {
            values.push(flattened[panel.columns[z].value]);
          }
        } else {
          values.push(JSON.stringify(dp));
        }

        model.rows.push(values);
      }
    }
  },
};

function transformDataToTable(data: any, panel: any) {
  const model = new TableModel();

  if (!data || data.length === 0) {
    return model;
  }

  const transformer = transformers[panel.transform];
  if (!transformer) {
    throw { message: '转换器 ' + panel.transform + ' 未找到' };
  }

  transformer.transform(data, panel, model);
  return model;
}

export { transformers, transformDataToTable };
