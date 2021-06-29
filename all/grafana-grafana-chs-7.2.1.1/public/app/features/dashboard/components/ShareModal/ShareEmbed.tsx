import React, { PureComponent } from 'react';
import { LegacyForms, Icon } from '@grafana/ui';
const { Select, Switch } = LegacyForms;
import { SelectableValue } from '@grafana/data';
import { DashboardModel, PanelModel } from 'app/features/dashboard/state';
import { buildIframeHtml } from './utils';

const themeOptions: Array<SelectableValue<string>> = [
  { label: 'current', value: 'current' },
  { label: 'dark', value: 'dark' },
  { label: 'light', value: 'light' },
];

interface Props {
  dashboard: DashboardModel;
  panel?: PanelModel;
}

interface State {
  useCurrentTimeRange: boolean;
  includeTemplateVars: boolean;
  selectedTheme: SelectableValue<string>;
  iframeHtml: string;
}

export class ShareEmbed extends PureComponent<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      useCurrentTimeRange: true,
      includeTemplateVars: true,
      selectedTheme: themeOptions[0],
      iframeHtml: '',
    };
  }

  componentDidMount() {
    this.buildIframeHtml();
  }

  buildIframeHtml = () => {
    const { panel } = this.props;
    const { useCurrentTimeRange, includeTemplateVars, selectedTheme } = this.state;

    const iframeHtml = buildIframeHtml(useCurrentTimeRange, includeTemplateVars, selectedTheme.value, panel);
    this.setState({ iframeHtml });
  };

  onUseCurrentTimeRangeChange = () => {
    this.setState(
      {
        useCurrentTimeRange: !this.state.useCurrentTimeRange,
      },
      this.buildIframeHtml
    );
  };

  onIncludeTemplateVarsChange = () => {
    this.setState(
      {
        includeTemplateVars: !this.state.includeTemplateVars,
      },
      this.buildIframeHtml
    );
  };

  onThemeChange = (value: SelectableValue<string>) => {
    this.setState(
      {
        selectedTheme: value,
      },
      this.buildIframeHtml
    );
  };

  render() {
    const { useCurrentTimeRange, includeTemplateVars, selectedTheme, iframeHtml } = this.state;

    return (
      <div className="share-modal-body">
        <div className="share-modal-header">
          <Icon name="link" className="share-modal-big-icon" size="xxl" />
          <div className="share-modal-content">
            <div className="gf-form-group">
              <Switch
                labelClass="width-12"
                label="当前时间范围"
                checked={useCurrentTimeRange}
                onChange={this.onUseCurrentTimeRangeChange}
              />
              <Switch
                labelClass="width-12"
                label="模版变量"
                checked={includeTemplateVars}
                onChange={this.onIncludeTemplateVarsChange}
              />
              <div className="gf-form">
                <label className="gf-form-label width-12">主题</label>
                <Select width={10} options={themeOptions} value={selectedTheme} onChange={this.onThemeChange} />
              </div>
            </div>

            <p className="share-modal-info-text">
              可以将下面的html代码粘贴并包含在另一个网页中。
              除非启用了匿名访问，否则查看该页面的用户需要登录到grafana中才能加载图形。
            </p>

            <div className="gf-form-group gf-form--grow">
              <div className="gf-form">
                <textarea rows={5} data-share-panel-url className="gf-form-input" defaultValue={iframeHtml}></textarea>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
