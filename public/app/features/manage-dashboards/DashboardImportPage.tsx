import React, { FormEvent, PureComponent } from 'react';
import { MapDispatchToProps, MapStateToProps } from 'react-redux';
import { css } from 'emotion';
import { AppEvents, NavModel } from '@grafana/data';
import { Button, stylesFactory, Input, TextArea, Field, Form, Legend, FileUpload } from '@grafana/ui';
import Page from 'app/core/components/Page/Page';
import { connectWithCleanUp } from 'app/core/components/connectWithCleanUp';
import { ImportDashboardOverview } from './components/ImportDashboardOverview';
import { validateDashboardJson, validateGcomDashboard } from './utils/validation';
import { fetchGcomDashboard, importDashboardJson } from './state/actions';
import appEvents from 'app/core/app_events';
import { getNavModel } from 'app/core/selectors/navModel';
import { StoreState } from 'app/types';

interface OwnProps {}

interface ConnectedProps {
  navModel: NavModel;
  isLoaded: boolean;
}

interface DispatchProps {
  fetchGcomDashboard: typeof fetchGcomDashboard;
  importDashboardJson: typeof importDashboardJson;
}

type Props = OwnProps & ConnectedProps & DispatchProps;

class DashboardImportUnConnected extends PureComponent<Props> {
  onFileUpload = (event: FormEvent<HTMLInputElement>) => {
    const { importDashboardJson } = this.props;
    const file = event.currentTarget.files && event.currentTarget.files.length > 0 && event.currentTarget.files[0];

    if (file) {
      const reader = new FileReader();
      const readerOnLoad = () => {
        return (e: any) => {
          let dashboard: any;
          try {
            dashboard = JSON.parse(e.target.result);
          } catch (error) {
            appEvents.emit(AppEvents.alertError, ['导入失败', 'JSON-> JS序列化失败: ' + error.message]);
            return;
          }
          importDashboardJson(dashboard);
        };
      };
      reader.onload = readerOnLoad();
      reader.readAsText(file);
    }
  };

  getDashboardFromJson = (formData: { dashboardJson: string }) => {
    this.props.importDashboardJson(JSON.parse(formData.dashboardJson));
  };

  getGcomDashboard = (formData: { gcomDashboard: string }) => {
    let dashboardId;
    const match = /(^\d+$)|dashboards\/(\d+)/.exec(formData.gcomDashboard);
    if (match && match[1]) {
      dashboardId = match[1];
    } else if (match && match[2]) {
      dashboardId = match[2];
    }

    if (dashboardId) {
      this.props.fetchGcomDashboard(dashboardId);
    }
  };

  renderImportForm() {
    const styles = importStyles();

    return (
      <>
        <div className={styles.option}>
          <FileUpload accept="application/json" onFileUpload={this.onFileUpload}>
            上传JSON文件
          </FileUpload>
        </div>
        <div className={styles.option}>
          <Legend>通过grafana.com导入</Legend>
          <Form onSubmit={this.getGcomDashboard} defaultValues={{ gcomDashboard: '' }}>
            {({ register, errors }) => (
              <Field invalid={!!errors.gcomDashboard} error={errors.gcomDashboard && errors.gcomDashboard.message}>
                <Input
                  name="gcomDashboard"
                  placeholder="Grafana.com信息中心网址或ID"
                  type="text"
                  ref={register({
                    required: '必须提供Grafana仪表板网址或ID',
                    validate: validateGcomDashboard,
                  })}
                  addonAfter={<Button type="submit">加载</Button>}
                />
              </Field>
            )}
          </Form>
        </div>
        <div className={styles.option}>
          <Legend>通过面板JSON导入</Legend>
          <Form onSubmit={this.getDashboardFromJson} defaultValues={{ dashboardJson: '' }}>
            {({ register, errors }) => (
              <>
                <Field invalid={!!errors.dashboardJson} error={errors.dashboardJson && errors.dashboardJson.message}>
                  <TextArea
                    name="dashboardJson"
                    ref={register({
                      required: '需要仪表板json模型',
                      validate: validateDashboardJson,
                    })}
                    rows={10}
                  />
                </Field>
                <Button type="submit">加载</Button>
              </>
            )}
          </Form>
        </div>
      </>
    );
  }

  render() {
    const { isLoaded, navModel } = this.props;
    return (
      <Page navModel={navModel}>
        <Page.Contents>{isLoaded ? <ImportDashboardOverview /> : this.renderImportForm()}</Page.Contents>
      </Page>
    );
  }
}

const mapStateToProps: MapStateToProps<ConnectedProps, OwnProps, StoreState> = (state: StoreState) => ({
  navModel: getNavModel(state.navIndex, 'import', undefined, true),
  isLoaded: state.importDashboard.isLoaded,
});

const mapDispatchToProps: MapDispatchToProps<DispatchProps, Props> = {
  fetchGcomDashboard,
  importDashboardJson,
};

export const DashboardImportPage = connectWithCleanUp(
  mapStateToProps,
  mapDispatchToProps,
  state => state.importDashboard
)(DashboardImportUnConnected);
export default DashboardImportPage;
DashboardImportPage.displayName = 'DashboardImport';

const importStyles = stylesFactory(() => {
  return {
    option: css`
      margin-bottom: 32px;
    `,
  };
});
