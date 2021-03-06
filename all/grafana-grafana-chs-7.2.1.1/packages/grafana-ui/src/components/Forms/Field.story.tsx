import React, { useState, useCallback } from 'react';
import { boolean, number, text } from '@storybook/addon-knobs';
import { Field, Input, Switch } from '@grafana/ui';
import mdx from './Field.mdx';

export default {
  title: 'Forms/Field',
  component: Field,
  parameters: {
    docs: {
      page: mdx,
    },
  },
};

const getKnobs = () => {
  const CONTAINER_GROUP = 'Container options';
  // ---
  const containerWidth = number(
    'Container width',
    300,
    {
      range: true,
      min: 100,
      max: 500,
      step: 10,
    },
    CONTAINER_GROUP
  );

  const BEHAVIOUR_GROUP = 'Behaviour props';
  const disabled = boolean('Disabled', false, BEHAVIOUR_GROUP);
  const invalid = boolean('Invalid', false, BEHAVIOUR_GROUP);
  const loading = boolean('Loading', false, BEHAVIOUR_GROUP);
  const error = text('Error message', '', BEHAVIOUR_GROUP);

  return { containerWidth, disabled, invalid, loading, error };
};

export const simple = () => {
  const { containerWidth, ...otherProps } = getKnobs();
  return (
    <div style={{ width: containerWidth }}>
      <Field label="石墨API密钥" description="您的Graphite实例API密钥" {...otherProps}>
        <Input id="thisField" />
      </Field>
    </div>
  );
};

export const horizontalLayout = () => {
  const [checked, setChecked] = useState(false);
  const onChange = useCallback(e => setChecked(e.currentTarget.checked), [setChecked]);
  const { containerWidth, ...otherProps } = getKnobs();
  return (
    <div style={{ width: containerWidth }}>
      <Field horizontal label="显示标签" description="显示阈值的标签" {...otherProps}>
        <Switch checked={checked} onChange={onChange} />
      </Field>
    </div>
  );
};
