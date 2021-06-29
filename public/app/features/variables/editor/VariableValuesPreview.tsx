import React, { useCallback, useEffect, useState } from 'react';
import { VariableModel, VariableOption, VariableWithOptions } from '../types';
import { selectors } from '@grafana/e2e-selectors';

export interface VariableValuesPreviewProps {
  variable: VariableModel;
}

export const VariableValuesPreview: React.FunctionComponent<VariableValuesPreviewProps> = ({ variable }) => {
  const [previewLimit, setPreviewLimit] = useState(20);
  const [previewOptions, setPreviewOptions] = useState<VariableOption[]>([]);
  const showMoreOptions = useCallback(() => setPreviewLimit(previewLimit + 20), [previewLimit, setPreviewLimit]);
  useEffect(() => {
    if (!variable || !variable.hasOwnProperty('options')) {
      return;
    }
    const variableWithOptions = variable as VariableWithOptions;
    setPreviewOptions(variableWithOptions.options.slice(0, previewLimit));
  }, [previewLimit, variable]);

  if (!previewOptions.length) {
    return null;
  }

  return (
    <div className="gf-form-group">
      <h5>值预览</h5>
      <div className="gf-form-inline">
        {previewOptions.map((o, index) => (
          <div className="gf-form" key={`${o.value}-${index}`}>
            <span
              className="gf-form-label"
              aria-label={selectors.pages.Dashboard.Settings.Variables.Edit.General.previewOfValuesOption}
            >
              {o.text}
            </span>
          </div>
        ))}
        {previewOptions.length > previewLimit && (
          <div className="gf-form" ng-if="current.options.length > optionsLimit">
            <a
              className="gf-form-label btn-secondary"
              onClick={showMoreOptions}
              aria-label="变量编辑器值预览显示更多链接"
            >
              显示更多
            </a>
          </div>
        )}
      </div>
    </div>
  );
};
VariableValuesPreview.displayName = 'VariableValuesPreview';
