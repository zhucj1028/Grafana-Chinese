import React from 'react';
import { text, boolean, select } from '@storybook/addon-knobs';
import { action } from '@storybook/addon-actions';
import { withCenteredStory } from '../../utils/storybook/withCenteredStory';
import { ConfirmModal } from '@grafana/ui';
import mdx from './ConfirmModal.mdx';

const getKnobs = () => {
  return {
    title: text('Title', '删除用户'),
    body: text('Body', '您确定要删除该用户吗？'),
    confirm: text('Confirm', '删除'),
    visible: boolean('Visible', true),
    icon: select('Icon', ['exclamation-triangle', 'power', 'cog', 'lock'], 'exclamation-triangle'),
  };
};

const defaultActions = {
  onConfirm: () => {
    action('Confirmed')('delete');
  },
  onDismiss: () => {
    action('Dismiss')('close');
  },
};

export default {
  title: 'Overlays/ConfirmModal',
  component: ConfirmModal,
  decorators: [withCenteredStory],
  parameters: {
    docs: {
      page: mdx,
    },
  },
};

export const basic = () => {
  const { title, body, confirm, icon, visible } = getKnobs();
  const { onConfirm, onDismiss } = defaultActions;
  return (
    <ConfirmModal
      isOpen={visible}
      title={title}
      body={body}
      confirmText={confirm}
      icon={icon}
      onConfirm={onConfirm}
      onDismiss={onDismiss}
    />
  );
};
