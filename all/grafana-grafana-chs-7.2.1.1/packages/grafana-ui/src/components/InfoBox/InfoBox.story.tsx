import React from 'react';
import { number } from '@storybook/addon-knobs';
import { InfoBox, FeatureInfoBox } from '@grafana/ui';
import { FeatureState } from '@grafana/data';

export default {
  title: 'Layout/InfoBox',
  component: InfoBox,
  decorators: [],
  parameters: {
    docs: {},
  },
};

const getKnobs = () => {
  const CONTAINER_GROUP = 'Container options';
  // ---
  const containerWidth = number(
    'Container width',
    800,
    {
      range: true,
      min: 100,
      max: 1500,
      step: 100,
    },
    CONTAINER_GROUP
  );

  return { containerWidth };
};

export const basic = () => {
  const { containerWidth } = getKnobs();

  return (
    <div style={{ width: containerWidth }}>
      <InfoBox
        title="用户权限"
        url={'http://docs.grafana.org/features/datasources/mysql/'}
        onDismiss={() => {
          alert('onDismiss clicked');
        }}
      >
        <p>
          数据库用户应该只被授予对指定数据库的选择权限;要查询的表。Grafana不验证查询是安全的，所以查询可以包含任何SQL语句。例如，将执行{' '}
          <code>USE其他</code>和 <code>DROP TABLE用户;</code>等语句。自对此，我们<strong>，</strong>
          创建具有受限的特定MySQL用户权限。
        </p>
      </InfoBox>
    </div>
  );
};

export const featureInfoBox = () => {
  const { containerWidth } = getKnobs();

  return (
    <div style={{ width: containerWidth }}>
      <FeatureInfoBox
        title="转换"
        url={'http://www.grafana.com'}
        featureState={FeatureState.beta}
        onDismiss={() => {
          alert('onDismiss clicked');
        }}
      >
        转换允许您在可视化之前联接、计算、重新排序、隐藏和重命名查询结果。 <br />
        如果您正在使用图形可视化，许多转换是不适合的，因为它目前只支持时间序列。
        <br />
        它可以帮助切换到表格可视化来理解转换正在做什么。
      </FeatureInfoBox>
    </div>
  );
};
