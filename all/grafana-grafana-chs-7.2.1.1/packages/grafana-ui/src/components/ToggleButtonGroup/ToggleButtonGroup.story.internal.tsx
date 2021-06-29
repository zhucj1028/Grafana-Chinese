import React from 'react';
import { action } from '@storybook/addon-actions';

import { ToggleButton, ToggleButtonGroup } from './ToggleButtonGroup';
import { UseState } from '../../utils/storybook/UseState';
import { withCenteredStory } from '../../utils/storybook/withCenteredStory';

export default {
  title: 'Forms/Legacy/ToggleButtonGroup',
  component: ToggleButtonGroup,
  decorators: [withCenteredStory],
};

const options = [
  { value: 'first', label: '第一' },
  { value: 'second', label: '第二' },
  { value: 'third', label: '第三' },
];

export const basic = () => {
  return (
    <UseState
      initialState={{
        value: 'first',
      }}
    >
      {(value, updateValue) => {
        return (
          <ToggleButtonGroup label="选项">
            {options.map((option, index) => {
              return (
                <ToggleButton
                  key={`${option.value}-${index}`}
                  value={option.value}
                  onChange={newValue => {
                    action('on change')(newValue);
                    updateValue({ value: newValue });
                  }}
                  selected={value.value === option.value}
                >
                  {option.label}
                </ToggleButton>
              );
            })}
          </ToggleButtonGroup>
        );
      }}
    </UseState>
  );
};
