export class AxesEditorCtrl {
  panel: any;
  panelCtrl: any;
  logScales: any;
  dataFormats: any;
  yBucketBoundModes: any;

  /** @ngInject */
  constructor($scope: any, uiSegmentSrv: any) {
    $scope.editor = this;
    this.panelCtrl = $scope.ctrl;
    this.panel = this.panelCtrl.panel;

    this.logScales = {
      linear: 1,
      'log (base 2)': 2,
      'log (base 10)': 10,
      'log (base 32)': 32,
      'log (base 1024)': 1024,
    };

    this.dataFormats = {
      时间序列: 'timeseries',
      时间序列桶: 'tsbuckets',
    };

    this.yBucketBoundModes = {
      自动: 'auto',
      上限: 'upper',
      下限: 'lower',
      中: 'middle',
    };
  }

  setUnitFormat = (unit: string) => {
    this.panel.yAxis.format = unit;
    this.panelCtrl.render();
  };
}

/** @ngInject */
export function axesEditor() {
  'use strict';
  return {
    restrict: 'E',
    scope: true,
    templateUrl: 'public/app/plugins/panel/heatmap/partials/axes_editor.html',
    controller: AxesEditorCtrl,
  };
}
