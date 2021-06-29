import React, { PureComponent } from 'react';
import { Button, ClipboardButton, Icon, LegacyForms, LinkButton } from '@grafana/ui';
import { AppEvents, SelectableValue } from '@grafana/data';
import { getBackendSrv } from '@grafana/runtime';
import { DashboardModel, PanelModel } from 'app/features/dashboard/state';
import { getTimeSrv } from 'app/features/dashboard/services/TimeSrv';
import { appEvents } from 'app/core/core';
import { VariableRefresh } from '../../../variables/types';

const { Select, Input } = LegacyForms;

const snapshotApiUrl = '/api/snapshots';

const expireOptions: Array<SelectableValue<number>> = [
  { label: 'Never', value: 0 },
  { label: '1 Hour', value: 60 * 60 },
  { label: '1 Day', value: 60 * 60 * 24 },
  { label: '7 Days', value: 60 * 60 * 24 * 7 },
];

interface Props {
  dashboard: DashboardModel;
  panel?: PanelModel;
  onDismiss(): void;
}

interface State {
  isLoading: boolean;
  step: number;
  snapshotName: string;
  selectedExpireOption: SelectableValue<number>;
  snapshotExpires?: number;
  snapshotUrl: string;
  deleteUrl: string;
  timeoutSeconds: number;
  externalEnabled: boolean;
  sharingButtonText: string;
}

export class ShareSnapshot extends PureComponent<Props, State> {
  private dashboard: DashboardModel;

  constructor(props: Props) {
    super(props);
    this.dashboard = props.dashboard;
    this.state = {
      isLoading: false,
      step: 1,
      selectedExpireOption: expireOptions[0],
      snapshotExpires: expireOptions[0].value,
      snapshotName: props.dashboard.title,
      timeoutSeconds: 4,
      snapshotUrl: '',
      deleteUrl: '',
      externalEnabled: false,
      sharingButtonText: '',
    };
  }

  componentDidMount() {
    this.getSnaphotShareOptions();
  }

  async getSnaphotShareOptions() {
    const shareOptions = await getBackendSrv().get('/api/snapshot/shared-options');
    this.setState({
      sharingButtonText: shareOptions['externalSnapshotName'],
      externalEnabled: shareOptions['externalEnabled'],
    });
  }

  createSnapshot = (external?: boolean) => () => {
    const { timeoutSeconds } = this.state;
    this.dashboard.snapshot = {
      timestamp: new Date(),
    };

    if (!external) {
      this.dashboard.snapshot.originalUrl = window.location.href;
    }

    this.setState({ isLoading: true });
    this.dashboard.startRefresh();

    setTimeout(() => {
      this.saveSnapshot(this.dashboard, external);
    }, timeoutSeconds * 1000);
  };

  saveSnapshot = async (dashboard: DashboardModel, external?: boolean) => {
    const { snapshotExpires } = this.state;
    const dash = this.dashboard.getSaveModelClone();
    this.scrubDashboard(dash);

    const cmdData = {
      dashboard: dash,
      name: dash.title,
      expires: snapshotExpires,
      external: external,
    };

    try {
      const results: { deleteUrl: any; url: any } = await getBackendSrv().post(snapshotApiUrl, cmdData);
      this.setState({
        deleteUrl: results.deleteUrl,
        snapshotUrl: results.url,
        step: 2,
      });
    } finally {
      this.setState({ isLoading: false });
    }
  };

  scrubDashboard = (dash: DashboardModel) => {
    const { panel } = this.props;
    const { snapshotName } = this.state;
    // change title
    dash.title = snapshotName;

    // make relative times absolute
    dash.time = getTimeSrv().timeRange();

    // remove panel queries & links
    dash.panels.forEach(panel => {
      panel.targets = [];
      panel.links = [];
      panel.datasource = null;
    });

    // remove annotation queries
    const annotations = dash.annotations.list.filter(annotation => annotation.enable);
    dash.annotations.list = annotations.map((annotation: any) => {
      return {
        name: annotation.name,
        enable: annotation.enable,
        iconColor: annotation.iconColor,
        snapshotData: annotation.snapshotData,
        type: annotation.type,
        builtIn: annotation.builtIn,
        hide: annotation.hide,
      };
    });

    // remove template queries
    dash.getVariables().forEach((variable: any) => {
      variable.query = '';
      variable.options = variable.current ? [variable.current] : [];
      variable.refresh = VariableRefresh.never;
    });

    // snapshot single panel
    if (panel) {
      const singlePanel = panel.getSaveModel();
      singlePanel.gridPos.w = 24;
      singlePanel.gridPos.x = 0;
      singlePanel.gridPos.y = 0;
      singlePanel.gridPos.h = 20;
      dash.panels = [singlePanel];
    }

    // cleanup snapshotData
    delete this.dashboard.snapshot;
    this.dashboard.forEachPanel((panel: PanelModel) => {
      delete panel.snapshotData;
    });
    this.dashboard.annotations.list.forEach(annotation => {
      delete annotation.snapshotData;
    });
  };

  deleteSnapshot = async () => {
    const { deleteUrl } = this.state;
    await getBackendSrv().get(deleteUrl);
    this.setState({ step: 3 });
  };

  getSnapshotUrl = () => {
    return this.state.snapshotUrl;
  };

  onSnapshotNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ snapshotName: event.target.value });
  };

  onTimeoutChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ timeoutSeconds: Number(event.target.value) });
  };

  onExpireChange = (option: SelectableValue<number>) => {
    this.setState({
      selectedExpireOption: option,
      snapshotExpires: option.value,
    });
  };

  onSnapshotUrlCopy = () => {
    appEvents.emit(AppEvents.alertSuccess, ['Content copied to clipboard']);
  };

  renderStep1() {
    const { onDismiss } = this.props;
    const {
      snapshotName,
      selectedExpireOption,
      timeoutSeconds,
      isLoading,
      sharingButtonText,
      externalEnabled,
    } = this.state;

    return (
      <>
        <div>
          <p className="share-modal-info-text">
            快照是一种公开共享交互式仪表板的即时方法。 创建后，我们{''}
            <strong>剥离敏感数据</strong>
            ，例如查询（指标，模板和注释）和面板链接，仅将可见的指标数据和序列名称嵌入到您的仪表板中。
          </p>
          <p className="share-modal-info-text">
            请注意，拥有链接并可以访问URL的任何人都可以查看您的 <strong>快照</strong>。 明智地分享。
          </p>
        </div>
        <div className="gf-form-group share-modal-options">
          <div className="gf-form" ng-if="step === 1">
            <label className="gf-form-label width-12">快照名</label>
            <Input width={15} value={snapshotName} onChange={this.onSnapshotNameChange} />
          </div>
          <div className="gf-form" ng-if="step === 1">
            <label className="gf-form-label width-12">期限</label>
            <Select width={15} options={expireOptions} value={selectedExpireOption} onChange={this.onExpireChange} />
          </div>
        </div>

        <p className="share-modal-info-text">如果收集仪表板的指标需要很长时间，则可能需要配置超时值。</p>

        <div className="gf-form-group share-modal-options">
          <div className="gf-form">
            <span className="gf-form-label width-12">超时（秒）</span>
            <Input type="number" width={15} value={timeoutSeconds} onChange={this.onTimeoutChange} />
          </div>
        </div>

        <div className="gf-form-button-row">
          <Button className="width-10" variant="primary" disabled={isLoading} onClick={this.createSnapshot()}>
            本地快照
          </Button>
          {externalEnabled && (
            <Button className="width-16" variant="secondary" disabled={isLoading} onClick={this.createSnapshot(true)}>
              {sharingButtonText}
            </Button>
          )}
          <Button variant="secondary" onClick={onDismiss}>
            取消
          </Button>
        </div>
      </>
    );
  }

  renderStep2() {
    const { snapshotUrl } = this.state;

    return (
      <>
        <div className="gf-form" style={{ marginTop: '40px' }}>
          <div className="gf-form-row">
            <a href={snapshotUrl} className="large share-modal-link" target="_blank">
              <Icon name="external-link-alt" /> {snapshotUrl}
            </a>
            <br />
            <ClipboardButton variant="secondary" getText={this.getSnapshotUrl} onClipboardCopy={this.onSnapshotUrlCopy}>
              复制链接
            </ClipboardButton>
          </div>
        </div>

        <div className="pull-right" ng-if="step === 2" style={{ padding: '5px' }}>
          你搞错了吗{' '}
          <LinkButton variant="link" target="_blank" onClick={this.deleteSnapshot}>
            删除快照。
          </LinkButton>
        </div>
      </>
    );
  }

  renderStep3() {
    return (
      <div className="share-modal-header">
        <p className="share-modal-info-text">
          快照现已删除。 如果您已经访问过一次，则可能需要一个小时才能将其从浏览器缓存或CDN缓存中删除。
        </p>
      </div>
    );
  }

  render() {
    const { isLoading, step } = this.state;

    return (
      <div className="share-modal-body">
        <div className="share-modal-header">
          {isLoading ? (
            <div className="share-modal-big-icon">
              <Icon name="fa fa-spinner" className="fa-spin" />
            </div>
          ) : (
            <Icon name="camera" className="share-modal-big-icon" size="xxl" />
          )}
          <div className="share-modal-content">
            {step === 1 && this.renderStep1()}
            {step === 2 && this.renderStep2()}
            {step === 3 && this.renderStep3()}
          </div>
        </div>
      </div>
    );
  }
}
