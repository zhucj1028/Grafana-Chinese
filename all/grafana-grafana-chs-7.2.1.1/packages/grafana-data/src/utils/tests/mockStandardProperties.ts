import { identityOverrideProcessor } from '../../field';
import { ThresholdsMode } from '../../types';

export const mockStandardProperties = () => {
  const title = {
    id: 'displayName',
    path: 'displayName',
    name: '显示名字',
    description: '字段显示的名字',
    editor: () => null,
    override: () => null,
    process: identityOverrideProcessor,
    settings: {
      placeholder: '无',
      expandTemplateVars: true,
    },
    shouldApply: () => true,
  };

  const unit = {
    id: 'unit',
    path: 'unit',
    name: '单位',
    description: '值单位',

    editor: () => null,
    override: () => null,
    process: identityOverrideProcessor,

    settings: {
      placeholder: '无',
    },

    shouldApply: () => true,
  };

  const min = {
    id: 'min',
    path: 'min',
    name: '最小',
    description: '最小值',

    editor: () => null,
    override: () => null,
    process: identityOverrideProcessor,

    settings: {
      placeholder: '自动',
    },
    shouldApply: () => true,
  };

  const max = {
    id: 'max',
    path: 'max',
    name: '最大',
    description: '最大值',

    editor: () => null,
    override: () => null,
    process: identityOverrideProcessor,

    settings: {
      placeholder: '自动',
    },

    shouldApply: () => true,
  };

  const decimals = {
    id: 'decimals',
    path: 'decimals',
    name: '小数点',
    description: '显示值的小数位数',

    editor: () => null,
    override: () => null,
    process: identityOverrideProcessor,

    settings: {
      placeholder: '自动',
      min: 0,
      max: 15,
      integer: true,
    },

    shouldApply: () => true,
  };

  const thresholds = {
    id: 'thresholds',
    path: 'thresholds',
    name: '阈值',
    description: '管理阈值',

    editor: () => null,
    override: () => null,
    process: identityOverrideProcessor,
    settings: {},
    defaultValue: {
      mode: ThresholdsMode.Absolute,
      steps: [
        { value: -Infinity, color: 'green' },
        { value: 80, color: 'red' },
      ],
    },
    shouldApply: () => true,
  };

  const mappings = {
    id: 'mappings',
    path: 'mappings',
    name: '值映射',
    description: '管理值映射',

    editor: () => null,
    override: () => null,
    process: identityOverrideProcessor,
    settings: {},
    defaultValue: [],
    shouldApply: () => true,
  };

  const noValue = {
    id: 'noValue',
    path: 'noValue',
    name: '无值',
    description: '没有值时显示什么',

    editor: () => null,
    override: () => null,
    process: identityOverrideProcessor,

    settings: {
      placeholder: '-',
    },
    // ??? any optionsUi with no value
    shouldApply: () => true,
  };

  const links = {
    id: 'links',
    path: 'links',
    name: '数据连接',
    description: '管理数据连接',
    editor: () => null,
    override: () => null,
    process: identityOverrideProcessor,
    settings: {
      placeholder: '-',
    },
    shouldApply: () => true,
  };

  const color = {
    id: 'color',
    path: 'color',
    name: '颜色',
    description: '自定义颜色',
    editor: () => null,
    override: () => null,
    process: identityOverrideProcessor,
    settings: {
      placeholder: '-',
    },
    shouldApply: () => true,
  };

  return [unit, min, max, decimals, title, noValue, thresholds, mappings, links, color];
};
