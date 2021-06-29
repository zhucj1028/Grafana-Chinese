import angular from 'angular';
import _ from 'lodash';
import $ from 'jquery';
import coreModule from 'app/core/core_module';
import { DashboardModel } from 'app/features/dashboard/state';
import DatasourceSrv from '../plugins/datasource_srv';
import appEvents from 'app/core/app_events';
import { AppEvents } from '@grafana/data';

// Registeres the angular directive
import './components/StandardAnnotationQueryEditor';

export class AnnotationsEditorCtrl {
  mode: any;
  datasources: any;
  annotations: any[];
  currentAnnotation: any;
  currentDatasource: any;
  currentIsNew: any;
  dashboard: DashboardModel;

  annotationDefaults: any = {
    name: '',
    datasource: null,
    iconColor: 'rgba(255, 96, 96, 1)',
    enable: true,
    showIn: 0,
    hide: false,
  };

  emptyListCta = {
    title: '尚未添加自定义注释查询',
    buttonIcon: 'comment-alt',
    buttonTitle: '添加注释查询',
    infoBox: {
      __html: `<p>注释提供了一种将事件数据集成到图形中的方法。 它们在所有图形面板上均显示为垂直线和图标。 将鼠标悬停在注释图标上时，可以获得事件的事件文本标签。 您可以通过按住CTRL或CMD +单击图形（或拖动区域）直接从grafana添加注释事件。 这些将存储在Grafana的注释数据库中。
  </p>
  请查看
  <a class='external-link' target='_blank' href='http://docs.grafana.org/reference/annotations/'
    >注释文档</a
  >
  以获取更多信息。`,
    },
    infoBoxTitle: '什么是注释？',
  };

  showOptions: any = [
    { text: 'All Panels', value: 0 },
    { text: 'Specific Panels', value: 1 },
  ];

  /** @ngInject */
  constructor(private $scope: any, private datasourceSrv: DatasourceSrv) {
    $scope.ctrl = this;

    this.dashboard = $scope.dashboard;
    this.mode = 'list';
    this.datasources = datasourceSrv.getAnnotationSources();
    this.annotations = this.dashboard.annotations.list;
    this.reset();

    this.onColorChange = this.onColorChange.bind(this);
  }

  async datasourceChanged() {
    const newDatasource = await this.datasourceSrv.get(this.currentAnnotation.datasource);
    this.$scope.$apply(() => {
      this.currentDatasource = newDatasource;
    });
  }

  /**
   * Called from the react editor
   */
  onAnnotationChange = (annotation: any) => {
    const currentIndex = this.dashboard.annotations.list.indexOf(this.currentAnnotation);
    if (currentIndex >= 0) {
      this.dashboard.annotations.list[currentIndex] = annotation;
    } else {
      console.warn('updating annotatoin, but not in the dashboard', annotation);
    }
    this.currentAnnotation = annotation;
  };

  edit(annotation: any) {
    this.currentAnnotation = annotation;
    this.currentAnnotation.showIn = this.currentAnnotation.showIn || 0;
    this.currentIsNew = false;
    this.datasourceChanged();
    this.mode = 'edit';
    $('.tooltip.in').remove();
  }

  reset() {
    this.currentAnnotation = angular.copy(this.annotationDefaults);
    this.currentAnnotation.datasource = this.datasources[0].name;
    this.currentIsNew = true;
    this.datasourceChanged();
  }

  update() {
    this.reset();
    this.mode = 'list';
  }

  setupNew = () => {
    this.mode = 'new';
    this.reset();
  };

  backToList() {
    this.mode = 'list';
  }

  move(index: number, dir: number) {
    // @ts-ignore
    _.move(this.annotations, index, index + dir);
  }

  add() {
    const sameName: any = _.find(this.annotations, { name: this.currentAnnotation.name });
    if (sameName) {
      appEvents.emit(AppEvents.alertWarning, ['Validation', '具有相同名称的注释已存在']);
      return;
    }
    this.annotations.push(this.currentAnnotation);
    this.reset();
    this.mode = 'list';
    this.dashboard.updateSubmenuVisibility();
  }

  removeAnnotation(annotation: any) {
    const index = _.indexOf(this.annotations, annotation);
    this.annotations.splice(index, 1);
    this.dashboard.updateSubmenuVisibility();
  }

  onColorChange(newColor: string) {
    this.currentAnnotation.iconColor = newColor;
  }
}

coreModule.controller('AnnotationsEditorCtrl', AnnotationsEditorCtrl);
