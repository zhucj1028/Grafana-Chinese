import React, { FC } from 'react';
import { Checkbox, CollapsableSection, Field, InfoBox, Input } from '@grafana/ui';
import { NotificationSettingsProps } from './NotificationChannelForm';

interface Props extends NotificationSettingsProps {
  imageRendererAvailable: boolean;
}

export const NotificationSettings: FC<Props> = ({ currentFormValues, imageRendererAvailable, register }) => {
  return (
    <CollapsableSection label="通知设置" isOpen={false}>
      <Field>
        <Checkbox name="isDefault" ref={register} label="默认" description="将此通知用于所有警报" />
      </Field>
      <Field>
        <Checkbox
          name="settings.uploadImage"
          ref={register}
          label="包含图片"
          description="捕获图像并将其包含在通知中"
        />
      </Field>
      {currentFormValues.uploadImage && !imageRendererAvailable && (
        <InfoBox title="没有可用的图像渲染器/未安装">
          Grafana找不到用于渲染通知图像的图像渲染器。 请确保已安装Grafana Image Renderer插件。
          请与您的Grafana管理员联系以安装插件。
        </InfoBox>
      )}
      <Field>
        <Checkbox
          name="disableResolveMessage"
          ref={register}
          label="禁用解决消息"
          description="禁用警报状态返回为false时发送的解决消息[OK]"
        />
      </Field>
      <Field>
        <Checkbox name="sendReminder" ref={register} label="发送提醒" description="发送其他通知以触发警报" />
      </Field>
      {currentFormValues.sendReminder && (
        <>
          <Field
            label="每天发送提醒"
            description="指定应该多久发送一次提醒，例如
            每30s，1m，10m，30m或1h等。评估规则后将发送警报提醒。
            因此，永远不会比配置的警报规则评估间隔更频繁地发送提醒。"
          >
            <Input name="frequency" ref={register} width={8} />
          </Field>
        </>
      )}
    </CollapsableSection>
  );
};
