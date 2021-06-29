import React from 'react';
import { Badge, BadgeProps } from '@grafana/ui';
import { PluginSignatureStatus } from '@grafana/data';

interface Props {
  status?: PluginSignatureStatus;
}

export const PluginSignatureBadge: React.FC<Props> = ({ status }) => {
  const display = getSignatureDisplayModel(status);
  return <Badge text={display.text} color={display.color} icon={display.icon} tooltip={display.tooltip} />;
};

function getSignatureDisplayModel(signature?: PluginSignatureStatus): BadgeProps {
  if (!signature) {
    signature = PluginSignatureStatus.invalid;
  }

  switch (signature) {
    case PluginSignatureStatus.internal:
      return { text: '核心', icon: 'cube', color: 'blue', tooltip: '与Grafana捆绑在一起的核心插件' };
    case PluginSignatureStatus.valid:
      return { text: '签名', icon: 'lock', color: 'green', tooltip: '签名并验证的插件' };
    case PluginSignatureStatus.invalid:
      return {
        text: '无效',
        icon: 'exclamation-triangle',
        color: 'red',
        tooltip: '无效的插件签名',
      };
    case PluginSignatureStatus.modified:
      return {
        text: '已修改',
        icon: 'exclamation-triangle',
        color: 'red',
        tooltip: '有效签名，但内容已被修改',
      };
  }

  return { text: '未签名', icon: 'exclamation-triangle', color: 'red', tooltip: '未签名的外部插件' };
}

PluginSignatureBadge.displayName = 'PluginSignatureBadge';
