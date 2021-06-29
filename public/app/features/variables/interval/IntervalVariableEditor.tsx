import React, { ChangeEvent, FocusEvent, PureComponent } from 'react';

import { IntervalVariableModel } from '../types';
import { VariableEditorProps } from '../editor/types';
import { InlineFormLabel, LegacyForms } from '@grafana/ui';

const { Switch } = LegacyForms;

export interface Props extends VariableEditorProps<IntervalVariableModel> {}

export class IntervalVariableEditor extends PureComponent<Props> {
  onAutoChange = (event: ChangeEvent<HTMLInputElement>) => {
    this.props.onPropChange({
      propName: 'auto',
      propValue: event.target.checked,
      updateOptions: true,
    });
  };

  onQueryChanged = (event: ChangeEvent<HTMLInputElement>) => {
    this.props.onPropChange({
      propName: 'query',
      propValue: event.target.value,
    });
  };

  onQueryBlur = (event: FocusEvent<HTMLInputElement>) => {
    this.props.onPropChange({
      propName: 'query',
      propValue: event.target.value,
      updateOptions: true,
    });
  };

  onAutoCountChanged = (event: ChangeEvent<HTMLSelectElement>) => {
    this.props.onPropChange({
      propName: 'auto_count',
      propValue: event.target.value,
      updateOptions: true,
    });
  };

  onAutoMinChanged = (event: ChangeEvent<HTMLInputElement>) => {
    this.props.onPropChange({
      propName: 'auto_min',
      propValue: event.target.value,
      updateOptions: true,
    });
  };

  render() {
    return (
      <>
        <div className="gf-form-group">
          <h5 className="section-heading">间隔选项</h5>

          <div className="gf-form">
            <span className="gf-form-label width-9">值</span>
            <input
              type="text"
              className="gf-form-input"
              value={this.props.variable.query}
              placeholder="1m,10m,1h,6h,1d,7d"
              onChange={this.onQueryChanged}
              onBlur={this.onQueryBlur}
              required
            />
          </div>

          <div className="gf-form-inline">
            <Switch
              label="自动选项"
              labelClass="width-9"
              checked={this.props.variable.auto}
              onChange={this.onAutoChange}
              tooltip={'允许同时选择多个值'}
            />

            {this.props.variable.auto && (
              <>
                <div className="gf-form">
                  <InlineFormLabel width={9} tooltip={'当前时间范围应划分多少次才能计算值'}>
                    步数
                  </InlineFormLabel>
                  <div className="gf-form-select-wrapper max-width-10">
                    <select
                      className="gf-form-input"
                      value={this.props.variable.auto_count}
                      onChange={this.onAutoCountChanged}
                    >
                      {[1, 2, 3, 4, 5, 10, 20, 30, 40, 50, 100, 200, 300, 400, 500].map(count => (
                        <option key={`auto_count_key-${count}`} label={`${count}`}>
                          {count}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
                <div className="gf-form">
                  <InlineFormLabel width={9} tooltip={'计算值不会低于此阈值'}>
                    最小间隔
                  </InlineFormLabel>
                  <input
                    type="text"
                    className="gf-form-input max-width-10"
                    value={this.props.variable.auto_min}
                    onChange={this.onAutoMinChanged}
                    placeholder="10s"
                  />
                </div>
              </>
            )}
          </div>
        </div>
      </>
    );
  }
}
