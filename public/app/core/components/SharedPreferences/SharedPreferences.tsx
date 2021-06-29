import React, { PureComponent } from 'react';
import { css } from 'emotion';

import {
  Select,
  Field,
  Form,
  Tooltip,
  Icon,
  stylesFactory,
  Label,
  Button,
  RadioButtonGroup,
  FieldSet,
  TimeZonePicker,
} from '@grafana/ui';
import { SelectableValue } from '@grafana/data';
import { selectors } from '@grafana/e2e-selectors';

import { DashboardSearchHit, DashboardSearchItemType } from 'app/features/search/types';
import { backendSrv } from 'app/core/services/backend_srv';

export interface Props {
  resourceUri: string;
}

export interface State {
  homeDashboardId: number;
  theme: string;
  timezone: string;
  dashboards: DashboardSearchHit[];
}

const themes: SelectableValue[] = [
  { value: '', label: '默认' },
  { value: 'dark', label: '黑暗' },
  { value: 'light', label: '明亮' },
];

export class SharedPreferences extends PureComponent<Props, State> {
  backendSrv = backendSrv;

  constructor(props: Props) {
    super(props);

    this.state = {
      homeDashboardId: 0,
      theme: '',
      timezone: '',
      dashboards: [],
    };
  }

  async componentDidMount() {
    const prefs = await backendSrv.get(`/api/${this.props.resourceUri}/preferences`);
    const dashboards = await backendSrv.search({ starred: true });
    const defaultDashboardHit: DashboardSearchHit = {
      id: 0,
      title: '默认',
      tags: [],
      type: '' as DashboardSearchItemType,
      uid: '',
      uri: '',
      url: '',
      folderId: 0,
      folderTitle: '',
      folderUid: '',
      folderUrl: '',
      isStarred: false,
      slug: '',
      items: [],
    };

    if (prefs.homeDashboardId > 0 && !dashboards.find(d => d.id === prefs.homeDashboardId)) {
      const missing = await backendSrv.search({ dashboardIds: [prefs.homeDashboardId] });
      if (missing && missing.length > 0) {
        dashboards.push(missing[0]);
      }
    }

    this.setState({
      homeDashboardId: prefs.homeDashboardId,
      theme: prefs.theme,
      timezone: prefs.timezone,
      dashboards: [defaultDashboardHit, ...dashboards],
    });
  }

  onSubmitForm = async () => {
    const { homeDashboardId, theme, timezone } = this.state;

    await backendSrv.put(`/api/${this.props.resourceUri}/preferences`, {
      homeDashboardId,
      theme,
      timezone,
    });
    window.location.reload();
  };

  onThemeChanged = (value: string) => {
    this.setState({ theme: value });
  };

  onTimeZoneChanged = (timezone: string) => {
    if (!timezone) {
      return;
    }
    this.setState({ timezone: timezone });
  };

  onHomeDashboardChanged = (dashboardId: number) => {
    this.setState({ homeDashboardId: dashboardId });
  };

  getFullDashName = (dashboard: DashboardSearchHit) => {
    if (typeof dashboard.folderTitle === 'undefined' || dashboard.folderTitle === '') {
      return dashboard.title;
    }
    return dashboard.folderTitle + ' / ' + dashboard.title;
  };

  render() {
    const { theme, timezone, homeDashboardId, dashboards } = this.state;
    const styles = getStyles();

    return (
      <Form onSubmit={this.onSubmitForm}>
        {() => {
          return (
            <FieldSet label="偏好设定">
              <Field label="主题">
                <RadioButtonGroup
                  options={themes}
                  value={themes.find(item => item.value === theme)?.value}
                  onChange={this.onThemeChanged}
                />
              </Field>

              <Field
                label={
                  <Label>
                    <span className={styles.labelText}>主仪表板</span>
                    <Tooltip content="找不到想要的仪表板？先对其加注星标，然后它应出现在此选择框中。">
                      <Icon name="info-circle" />
                    </Tooltip>
                  </Label>
                }
              >
                <Select
                  value={dashboards.find(dashboard => dashboard.id === homeDashboardId)}
                  getOptionValue={i => i.id}
                  getOptionLabel={this.getFullDashName}
                  onChange={(dashboard: DashboardSearchHit) => this.onHomeDashboardChanged(dashboard.id)}
                  options={dashboards}
                  placeholder="选择默认仪表板"
                />
              </Field>

              <Field label="时区" aria-label={selectors.components.TimeZonePicker.container}>
                <TimeZonePicker includeInternal={true} value={timezone} onChange={this.onTimeZoneChanged} />
              </Field>
              <div className="gf-form-button-row">
                <Button variant="primary">保存</Button>
              </div>
            </FieldSet>
          );
        }}
      </Form>
    );
  }
}

export default SharedPreferences;

const getStyles = stylesFactory(() => {
  return {
    labelText: css`
      margin-right: 6px;
    `,
  };
});
