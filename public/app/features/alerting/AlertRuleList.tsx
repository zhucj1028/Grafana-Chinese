import React, { PureComponent } from 'react';
import { hot } from 'react-hot-loader';
import { connect } from 'react-redux';
import Page from 'app/core/components/Page/Page';
import AlertRuleItem from './AlertRuleItem';
import appEvents from 'app/core/app_events';
import { updateLocation } from 'app/core/actions';
import { getNavModel } from 'app/core/selectors/navModel';
import { AlertRule, CoreEvents, StoreState } from 'app/types';
import { getAlertRulesAsync, togglePauseAlertRule } from './state/actions';
import { getAlertRuleItems, getSearchQuery } from './state/selectors';
import { FilterInput } from 'app/core/components/FilterInput/FilterInput';
import { NavModel, SelectableValue } from '@grafana/data';
import { setSearchQuery } from './state/reducers';
import { Button, Select } from '@grafana/ui';

export interface Props {
  navModel: NavModel;
  alertRules: AlertRule[];
  updateLocation: typeof updateLocation;
  getAlertRulesAsync: typeof getAlertRulesAsync;
  setSearchQuery: typeof setSearchQuery;
  togglePauseAlertRule: typeof togglePauseAlertRule;
  stateFilter: string;
  search: string;
  isLoading: boolean;
}

export class AlertRuleList extends PureComponent<Props, any> {
  stateFilters = [
    { label: '所有', value: 'all' },
    { label: '正常', value: 'ok' },
    { label: '非正常', value: 'not_ok' },
    { label: '警报中', value: 'alerting' },
    { label: '无数据', value: 'no_data' },
    { label: '暂停', value: 'paused' },
    { label: '触发警报', value: 'pending' },
  ];

  componentDidMount() {
    this.fetchRules();
  }

  componentDidUpdate(prevProps: Props) {
    if (prevProps.stateFilter !== this.props.stateFilter) {
      this.fetchRules();
    }
  }

  async fetchRules() {
    await this.props.getAlertRulesAsync({ state: this.getStateFilter() });
  }

  getStateFilter(): string {
    const { stateFilter } = this.props;
    if (stateFilter) {
      return stateFilter.toString();
    }
    return 'all';
  }

  onStateFilterChanged = (option: SelectableValue) => {
    this.props.updateLocation({
      query: { state: option.value },
    });
  };

  onOpenHowTo = () => {
    appEvents.emit(CoreEvents.showModal, {
      src: 'public/app/features/alerting/partials/alert_howto.html',
      modalClass: 'confirm-modal',
      model: {},
    });
  };

  onSearchQueryChange = (value: string) => {
    this.props.setSearchQuery(value);
  };

  onTogglePause = (rule: AlertRule) => {
    this.props.togglePauseAlertRule(rule.id, { paused: rule.state !== 'paused' });
  };

  alertStateFilterOption = ({ text, value }: { text: string; value: string }) => {
    return (
      <option key={value} value={value}>
        {text}
      </option>
    );
  };

  render() {
    const { navModel, alertRules, search, isLoading } = this.props;

    return (
      <Page navModel={navModel}>
        <Page.Contents isLoading={isLoading}>
          <div className="page-action-bar">
            <div className="gf-form gf-form--grow">
              <FilterInput
                labelClassName="gf-form--has-input-icon gf-form--grow"
                inputClassName="gf-form-input"
                placeholder="搜索提醒"
                value={search}
                onChange={this.onSearchQueryChange}
              />
            </div>
            <div className="gf-form">
              <label className="gf-form-label">状态</label>

              <div className="width-13">
                <Select
                  options={this.stateFilters}
                  onChange={this.onStateFilterChanged}
                  value={this.getStateFilter()}
                />
              </div>
            </div>
            <div className="page-action-bar__spacer" />
            <Button variant="secondary" onClick={this.onOpenHowTo}>
              如何添加警报
            </Button>
          </div>
          <section>
            <ol className="alert-rule-list">
              {alertRules.map(rule => (
                <AlertRuleItem
                  rule={rule}
                  key={rule.id}
                  search={search}
                  onTogglePause={() => this.onTogglePause(rule)}
                />
              ))}
            </ol>
          </section>
        </Page.Contents>
      </Page>
    );
  }
}

const mapStateToProps = (state: StoreState) => ({
  navModel: getNavModel(state.navIndex, 'alert-list'),
  alertRules: getAlertRuleItems(state.alertRules),
  stateFilter: state.location.query.state,
  search: getSearchQuery(state.alertRules),
  isLoading: state.alertRules.isLoading,
});

const mapDispatchToProps = {
  updateLocation,
  getAlertRulesAsync,
  setSearchQuery,
  togglePauseAlertRule,
};

export default hot(module)(connect(mapStateToProps, mapDispatchToProps)(AlertRuleList));
