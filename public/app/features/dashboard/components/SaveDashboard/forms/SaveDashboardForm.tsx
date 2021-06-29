import React, { useMemo } from 'react';

import { Button, Checkbox, Form, HorizontalGroup, TextArea } from '@grafana/ui';
import { selectors } from '@grafana/e2e-selectors';

import { SaveDashboardFormProps } from '../types';

interface SaveDashboardFormDTO {
  message: string;
  saveVariables: boolean;
  saveTimerange: boolean;
}

export const SaveDashboardForm: React.FC<SaveDashboardFormProps> = ({ dashboard, onCancel, onSuccess, onSubmit }) => {
  const hasTimeChanged = useMemo(() => dashboard.hasTimeChanged(), [dashboard]);
  const hasVariableChanged = useMemo(() => dashboard.hasVariableValuesChanged(), [dashboard]);

  return (
    <Form
      onSubmit={async (data: SaveDashboardFormDTO) => {
        if (!onSubmit) {
          return;
        }

        const result = await onSubmit(dashboard.getSaveModelClone(data), data, dashboard);
        if (result.status === 'success') {
          if (data.saveVariables) {
            dashboard.resetOriginalVariables();
          }
          if (data.saveTimerange) {
            dashboard.resetOriginalTime();
          }
          onSuccess();
        }
      }}
    >
      {({ register, errors }) => (
        <>
          <div className="gf-form-group">
            {hasTimeChanged && (
              <Checkbox
                label="将当前时间范围另存为仪表板默认值"
                name="saveTimerange"
                ref={register}
                aria-label={selectors.pages.SaveDashboardModal.saveTimerange}
              />
            )}
            {hasVariableChanged && (
              <Checkbox
                label="将当前变量值保存为仪表板默认值"
                name="saveVariables"
                ref={register}
                aria-label={selectors.pages.SaveDashboardModal.saveVariables}
              />
            )}
            {(hasVariableChanged || hasTimeChanged) && <div className="gf-form-group" />}

            <TextArea name="message" ref={register} placeholder="添加注释以描述您的更改..." autoFocus />
          </div>

          <HorizontalGroup>
            <Button type="submit" aria-label={selectors.pages.SaveDashboardModal.save}>
              保存
            </Button>
            <Button variant="secondary" onClick={onCancel}>
              取消
            </Button>
          </HorizontalGroup>
        </>
      )}
    </Form>
  );
};
