import { GrafanaDatasource } from './datasource';
import { QueryCtrl } from 'app/plugins/sdk';

class GrafanaQueryCtrl extends QueryCtrl {
  static templateUrl = 'partials/query.editor.html';
}

class GrafanaAnnotationsQueryCtrl {
  annotation: any;

  types = [
    { text: '仪表板', value: 'dashboard' },
    { text: '标签', value: 'tags' },
  ];

  constructor() {
    this.annotation.type = this.annotation.type || 'tags';
    this.annotation.limit = this.annotation.limit || 100;
  }

  static templateUrl = 'partials/annotations.editor.html';
}

export {
  GrafanaDatasource,
  GrafanaDatasource as Datasource,
  GrafanaQueryCtrl as QueryCtrl,
  GrafanaAnnotationsQueryCtrl as AnnotationsQueryCtrl,
};
