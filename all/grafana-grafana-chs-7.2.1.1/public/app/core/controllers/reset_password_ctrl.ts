import coreModule from '../core_module';
import config from 'app/core/config';
import { AppEvents } from '@grafana/data';
import { getBackendSrv } from '@grafana/runtime';
import { promiseToDigest } from '../utils/promiseToDigest';

export class ResetPasswordCtrl {
  /** @ngInject */
  constructor($scope: any, $location: any) {
    $scope.formModel = {};
    $scope.mode = 'send';
    $scope.ldapEnabled = config.ldapEnabled;
    $scope.authProxyEnabled = config.authProxyEnabled;
    $scope.disableLoginForm = config.disableLoginForm;

    const params = $location.search();
    if (params.code) {
      $scope.mode = 'reset';
      $scope.formModel.code = params.code;
    }

    $scope.navModel = {
      main: {
        icon: 'grafana',
        text: '重设密码',
        subTitle: '重设您的Grafana密码',
        breadcrumbs: [{ title: '登陆', url: 'login' }],
      },
    };

    $scope.sendResetEmail = () => {
      if (!$scope.sendResetForm.$valid) {
        return;
      }

      promiseToDigest($scope)(
        getBackendSrv()
          .post('/api/user/password/send-reset-email', $scope.formModel)
          .then(() => {
            $scope.mode = 'email-sent';
          })
      );
    };

    $scope.submitReset = () => {
      if (!$scope.resetForm.$valid) {
        return;
      }

      if ($scope.formModel.newPassword !== $scope.formModel.confirmPassword) {
        $scope.appEvent(AppEvents.alertWarning, ['新密码不匹配']);
        return;
      }

      getBackendSrv()
        .post('/api/user/password/reset', $scope.formModel)
        .then(() => {
          $location.path('login');
        });
    };
  }
}

coreModule.controller('ResetPasswordCtrl', ResetPasswordCtrl);