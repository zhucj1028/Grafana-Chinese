// Libraries
import React, { PureComponent, ChangeEvent, FocusEvent } from 'react';

// Utils
import { rangeUtil, PanelData, DataSourceApi } from '@grafana/data';

// Components
import {
  EventsWithValidation,
  LegacyInputStatus,
  LegacyForms,
  ValidationEvents,
  InlineFormLabel,
  stylesFactory,
} from '@grafana/ui';
const { Switch, Input } = LegacyForms;

// Types
import { PanelModel } from '../state';
import { QueryOperationRow } from 'app/core/components/QueryOperationRow/QueryOperationRow';
import { config } from 'app/core/config';
import { css } from 'emotion';

const timeRangeValidationEvents: ValidationEvents = {
  [EventsWithValidation.onBlur]: [
    {
      rule: value => {
        if (!value) {
          return true;
        }
        return rangeUtil.isValidTimeSpan(value);
      },
      errorMessage: '无效的时间跨度',
    },
  ],
};

const emptyToNull = (value: string) => {
  return value === '' ? null : value;
};

interface Props {
  panel: PanelModel;
  dataSource: DataSourceApi;
  data: PanelData;
}

interface State {
  relativeTime: string;
  timeShift: string;
  cacheTimeout: string;
  maxDataPoints: number | string;
  interval: string;
  hideTimeOverride: boolean;
  isOpen: boolean;
}

export class QueryOptions extends PureComponent<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
      relativeTime: props.panel.timeFrom || '',
      timeShift: props.panel.timeShift || '',
      cacheTimeout: props.panel.cacheTimeout || '',
      maxDataPoints: props.panel.maxDataPoints ?? '',
      interval: props.panel.interval || '',
      hideTimeOverride: props.panel.hideTimeOverride || false,
      isOpen: false,
    };
  }

  onRelativeTimeChange = (event: ChangeEvent<HTMLInputElement>) => {
    this.setState({
      relativeTime: event.target.value,
    });
  };

  onTimeShiftChange = (event: ChangeEvent<HTMLInputElement>) => {
    this.setState({
      timeShift: event.target.value,
    });
  };

  onOverrideTime = (event: FocusEvent<HTMLInputElement>, status: LegacyInputStatus) => {
    const { value } = event.target;
    const { panel } = this.props;
    const emptyToNullValue = emptyToNull(value);

    if (status === LegacyInputStatus.Valid && panel.timeFrom !== emptyToNullValue) {
      panel.timeFrom = emptyToNullValue;
      panel.refresh();
    }
  };

  onTimeShift = (event: FocusEvent<HTMLInputElement>, status: LegacyInputStatus) => {
    const { value } = event.target;
    const { panel } = this.props;
    const emptyToNullValue = emptyToNull(value);

    if (status === LegacyInputStatus.Valid && panel.timeShift !== emptyToNullValue) {
      panel.timeShift = emptyToNullValue;
      panel.refresh();
    }
  };

  onToggleTimeOverride = () => {
    const { panel } = this.props;
    this.setState({ hideTimeOverride: !this.state.hideTimeOverride }, () => {
      panel.hideTimeOverride = this.state.hideTimeOverride;
      panel.refresh();
    });
  };

  onDataSourceOptionBlur = (panelKey: string) => () => {
    const { panel } = this.props;

    // @ts-ignore
    panel[panelKey] = this.state[panelKey];
    panel.refresh();
  };

  onDataSourceOptionChange = (panelKey: string) => (event: ChangeEvent<HTMLInputElement>) => {
    this.setState({ ...this.state, [panelKey]: event.target.value });
  };

  onMaxDataPointsBlur = () => {
    const { panel } = this.props;

    const maxDataPoints = parseInt(this.state.maxDataPoints as string, 10);

    if (isNaN(maxDataPoints)) {
      delete panel.maxDataPoints;
    } else {
      panel.maxDataPoints = maxDataPoints;
    }

    panel.refresh();
  };

  renderCacheTimeoutOption() {
    const { dataSource } = this.props;
    const { cacheTimeout } = this.state;
    const tooltip = `如果您的时间序列存储区具有查询缓存，则此选项可以覆盖默认的缓存超时。 以秒为单位指定一个数值。`;

    if (!dataSource.meta.queryOptions?.cacheTimeout) {
      return null;
    }

    return (
      <div className="gf-form-inline">
        <div className="gf-form">
          <InlineFormLabel width={9} tooltip={tooltip}>
            Cache timeout
          </InlineFormLabel>
          <Input
            type="text"
            className="width-6"
            placeholder="60"
            name={name}
            spellCheck={false}
            onBlur={this.onDataSourceOptionBlur('cacheTimeout')}
            onChange={this.onDataSourceOptionChange('cacheTimeout')}
            value={cacheTimeout}
          />
        </div>
      </div>
    );
  }

  renderMaxDataPointsOption() {
    const { data } = this.props;
    const { maxDataPoints } = this.state;
    const realMd = data.request?.maxDataPoints;
    const isAuto = maxDataPoints === '';

    return (
      <div className="gf-form-inline">
        <div className="gf-form">
          <InlineFormLabel
            width={9}
            tooltip={
              <>
                每个序列的最大数据点。 由某些数据源直接使用，并用于自动间隔的计算。 对于流数据，此值将用于滚动缓冲区。
              </>
            }
          >
            最大数据点
          </InlineFormLabel>
          <Input
            type="number"
            className="width-6"
            placeholder={`${realMd}`}
            name={name}
            spellCheck={false}
            onBlur={this.onMaxDataPointsBlur}
            onChange={this.onDataSourceOptionChange('maxDataPoints')}
            value={maxDataPoints}
          />
          {isAuto && (
            <>
              <div className="gf-form-label query-segment-operator">=</div>
              <div className="gf-form-label">面板宽度</div>
            </>
          )}
        </div>
      </div>
    );
  }

  renderIntervalOption() {
    const { data, dataSource } = this.props;
    const { interval } = this.state;
    const realInterval = data.request?.interval;
    const minIntervalOnDs = dataSource.interval ?? 'No limit';

    return (
      <>
        <div className="gf-form-inline">
          <div className="gf-form">
            <InlineFormLabel
              width={9}
              tooltip={
                <>
                  间隔的下限。 建议设置为写入频率，例如，如果每分钟写入一次数据，则为<code> 1m </code> {''}。
                  可以在大多数数据源的数据源设置中设置默认值。
                </>
              }
            >
              最小间隔
            </InlineFormLabel>
            <Input
              type="text"
              className="width-6"
              placeholder={`${minIntervalOnDs}`}
              name={name}
              spellCheck={false}
              onBlur={this.onDataSourceOptionBlur('interval')}
              onChange={this.onDataSourceOptionChange('interval')}
              value={interval}
            />
          </div>
        </div>
        <div className="gf-form-inline">
          <div className="gf-form">
            <InlineFormLabel
              width={9}
              tooltip={
                <>
                  发送到数据源并在<code> $ __ interval </code>和{''} <code> $ __ interval_ms </code>中使用的评估间隔
                </>
              }
            >
              间隔
            </InlineFormLabel>
            <InlineFormLabel width={6}>{realInterval}</InlineFormLabel>
            <div className="gf-form-label query-segment-operator">=</div>
            <div className="gf-form-label">最大数据点/时间范围</div>
          </div>
        </div>
      </>
    );
  }

  onOpenOptions = () => {
    this.setState({ isOpen: true });
  };

  onCloseOptions = () => {
    this.setState({ isOpen: false });
  };

  renderCollapsedText(styles: StylesType): React.ReactNode | undefined {
    const { data } = this.props;
    const { isOpen, maxDataPoints, interval } = this.state;

    if (isOpen) {
      return undefined;
    }

    let mdDesc = maxDataPoints;
    if (maxDataPoints === '' && data.request) {
      mdDesc = `auto = ${data.request.maxDataPoints}`;
    }

    let intervalDesc = interval;
    if (data.request) {
      intervalDesc = `${data.request.interval}`;
    }

    return (
      <>
        {<div className={styles.collapsedText}>MD = {mdDesc}</div>}
        {<div className={styles.collapsedText}>Interval = {intervalDesc}</div>}
      </>
    );
  }

  render() {
    const { hideTimeOverride } = this.state;
    const { relativeTime, timeShift, isOpen } = this.state;
    const styles = getStyles();

    return (
      <QueryOperationRow
        id="Query options"
        index={0}
        title="查询选项"
        headerElement={this.renderCollapsedText(styles)}
        isOpen={isOpen}
        onOpen={this.onOpenOptions}
        onClose={this.onCloseOptions}
      >
        {this.renderMaxDataPointsOption()}
        {this.renderIntervalOption()}
        {this.renderCacheTimeoutOption()}

        <div className="gf-form">
          <InlineFormLabel width={9}>相对时间</InlineFormLabel>
          <Input
            type="text"
            className="width-6"
            placeholder="1h"
            onChange={this.onRelativeTimeChange}
            onBlur={this.onOverrideTime}
            validationEvents={timeRangeValidationEvents}
            hideErrorMessage={true}
            value={relativeTime}
          />
        </div>

        <div className="gf-form">
          <span className="gf-form-label width-9">时移</span>
          <Input
            type="text"
            className="width-6"
            placeholder="1h"
            onChange={this.onTimeShiftChange}
            onBlur={this.onTimeShift}
            validationEvents={timeRangeValidationEvents}
            hideErrorMessage={true}
            value={timeShift}
          />
        </div>
        {(timeShift || relativeTime) && (
          <div className="gf-form-inline">
            <Switch
              label="隐藏时间信息"
              labelClass="width-9"
              checked={hideTimeOverride}
              onChange={this.onToggleTimeOverride}
            />
          </div>
        )}
      </QueryOperationRow>
    );
  }
}

const getStyles = stylesFactory(() => {
  const { theme } = config;

  return {
    collapsedText: css`
      margin-left: ${theme.spacing.md};
      font-size: ${theme.typography.size.sm};
      color: ${theme.colors.textWeak};
    `,
  };
});

type StylesType = ReturnType<typeof getStyles>;
