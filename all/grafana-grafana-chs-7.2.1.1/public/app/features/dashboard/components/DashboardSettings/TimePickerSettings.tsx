import React, { PureComponent } from 'react';
import { Input, LegacyForms, TimeZonePicker, Tooltip } from '@grafana/ui';
import { rangeUtil, TimeZone } from '@grafana/data';
import isEmpty from 'lodash/isEmpty';
import { selectors } from '@grafana/e2e-selectors';
import { AutoRefreshIntervals } from './AutoRefreshIntervals';

interface Props {
  onTimeZoneChange: (timeZone: TimeZone) => void;
  onRefreshIntervalChange: (interval: string[]) => void;
  onNowDelayChange: (nowDelay: string) => void;
  onHideTimePickerChange: (hide: boolean) => void;
  renderCount: number; // hack to make sure Angular changes are propagated properly, please remove when DashboardSettings are migrated to React
  refreshIntervals: string[];
  timePickerHidden: boolean;
  nowDelay: string;
  timezone: TimeZone;
}

interface State {
  isNowDelayValid: boolean;
}

export class TimePickerSettings extends PureComponent<Props, State> {
  state: State = { isNowDelayValid: true };

  onNowDelayChange = (event: React.FormEvent<HTMLInputElement>) => {
    const value = event.currentTarget.value;

    if (isEmpty(value)) {
      this.setState({ isNowDelayValid: true });
      return this.props.onNowDelayChange(value);
    }

    if (rangeUtil.isValidTimeSpan(value)) {
      this.setState({ isNowDelayValid: true });
      return this.props.onNowDelayChange(value);
    }

    this.setState({ isNowDelayValid: false });
  };

  onHideTimePickerChange = () => {
    this.props.onHideTimePickerChange(!this.props.timePickerHidden);
  };

  onTimeZoneChange = (timeZone: string) => {
    if (typeof timeZone !== 'string') {
      return;
    }
    this.props.onTimeZoneChange(timeZone);
  };

  render() {
    return (
      <div className="editor-row">
        <h5 className="section-heading">时间选项</h5>
        <div className="gf-form-group">
          <div className="gf-form" aria-label={selectors.components.TimeZonePicker.container}>
            <label className="gf-form-label width-7">时区</label>
            <TimeZonePicker
              includeInternal={true}
              value={this.props.timezone}
              onChange={this.onTimeZoneChange}
              width={40}
            />
          </div>
          <AutoRefreshIntervals
            renderCount={this.props.renderCount}
            refreshIntervals={this.props.refreshIntervals}
            onRefreshIntervalChange={this.props.onRefreshIntervalChange}
          />
          <div className="gf-form">
            <span className="gf-form-label width-7">现在延迟-</span>
            <Tooltip placement="right" content={'输入1m以忽略最后一分钟（因为它可能包含不完整的指标）'}>
              <Input
                width={60}
                invalid={!this.state.isNowDelayValid}
                placeholder="0m"
                onChange={this.onNowDelayChange}
                defaultValue={this.props.nowDelay}
              />
            </Tooltip>
          </div>

          <div className="gf-form">
            <LegacyForms.Switch
              labelClass="width-7"
              label="隐藏时间选择器"
              checked={this.props.timePickerHidden ?? false}
              onChange={this.onHideTimePickerChange}
            />
          </div>
        </div>
      </div>
    );
  }
}
