import React from 'react';
import classNames from 'classnames';
import { Icon } from '@grafana/ui';
import { PanelModel } from '../../state/PanelModel';
import { DashboardModel } from '../../state/DashboardModel';
import templateSrv from 'app/features/templating/template_srv';
import appEvents from 'app/core/app_events';
import { CoreEvents } from 'app/types';
import { RowOptionsButton } from '../RowOptions/RowOptionsButton';

export interface DashboardRowProps {
  panel: PanelModel;
  dashboard: DashboardModel;
}

export class DashboardRow extends React.Component<DashboardRowProps, any> {
  constructor(props: DashboardRowProps) {
    super(props);

    this.state = {
      collapsed: this.props.panel.collapsed,
    };

    this.props.dashboard.on(CoreEvents.templateVariableValueUpdated, this.onVariableUpdated);
  }

  componentWillUnmount() {
    this.props.dashboard.off(CoreEvents.templateVariableValueUpdated, this.onVariableUpdated);
  }

  onVariableUpdated = () => {
    this.forceUpdate();
  };

  onToggle = () => {
    this.props.dashboard.toggleRow(this.props.panel);

    this.setState((prevState: any) => {
      return { collapsed: !prevState.collapsed };
    });
  };

  onUpdate = (title: string, repeat: string | undefined) => {
    this.props.panel['title'] = title;
    this.props.panel['repeat'] = repeat;
    this.props.panel.render();
    this.props.dashboard.processRepeats();
    this.forceUpdate();
  };

  onDelete = () => {
    appEvents.emit(CoreEvents.showConfirmModal, {
      title: '删除行',
      text: '您确定要删除此行及其所有面板吗？',
      altActionText: '仅删除行',
      icon: 'fa-trash',
      onConfirm: () => {
        this.props.dashboard.removeRow(this.props.panel, true);
      },
      onAltAction: () => {
        this.props.dashboard.removeRow(this.props.panel, false);
      },
    });
  };

  render() {
    const classes = classNames({
      'dashboard-row': true,
      'dashboard-row--collapsed': this.state.collapsed,
    });

    const title = templateSrv.replace(this.props.panel.title, this.props.panel.scopedVars, 'text');
    const count = this.props.panel.panels ? this.props.panel.panels.length : 0;
    const panels = count === 1 ? '面板' : '面板';
    const canEdit = this.props.dashboard.meta.canEdit === true;

    return (
      <div className={classes}>
        <a className="dashboard-row__title pointer" onClick={this.onToggle}>
          <Icon name={this.state.collapsed ? 'angle-right' : 'angle-down'} />
          {title}
          <span className="dashboard-row__panel_count">
            ({count} {panels})
          </span>
        </a>
        {canEdit && (
          <div className="dashboard-row__actions">
            <RowOptionsButton
              title={this.props.panel.title}
              repeat={this.props.panel.repeat}
              onUpdate={this.onUpdate}
            />
            <a className="pointer" onClick={this.onDelete}>
              <Icon name="trash-alt" />
            </a>
          </div>
        )}
        {this.state.collapsed === true && (
          <div className="dashboard-row__toggle-target" onClick={this.onToggle}>
            &nbsp;
          </div>
        )}
        {canEdit && <div className="dashboard-row__drag grid-drag-handle" />}
      </div>
    );
  }
}
