import config from 'app/core/config';
import coreModule from '../core_module';
import { getBackendSrv } from '@grafana/runtime/src/services';
import { promiseToDigest } from '../utils/promiseToDigest';

export class SignUpCtrl {
  /** @ngInject */
  constructor(private $scope: any, $location: any, contextSrv: any) {
    contextSrv.sidemenu = false;
    $scope.ctrl = this;

    $scope.formModel = {};

    const params = $location.search();

    // validate email is semi ok
    if (params.email && !params.email.match(/^\S+@\S+$/)) {
      console.error('无效的电子邮件');
      return;
    }

    $scope.formModel.orgName = params.email;
    $scope.formModel.email = params.email;
    $scope.formModel.username = params.email;
    $scope.formModel.code = params.code;

    $scope.verifyEmailEnabled = false;
    $scope.autoAssignOrg = false;

    $scope.navModel = {
      main: {
        icon: 'grafana',
        text: '注册',
        subTitle: '注册您的Grafana帐户',
        breadcrumbs: [{ title: '登陆', url: 'login' }],
      },
    };

    promiseToDigest($scope)(
      getBackendSrv()
        .get('/api/user/signup/options')
        .then((options: any) => {
          $scope.verifyEmailEnabled = options.verifyEmailEnabled;
          $scope.autoAssignOrg = options.autoAssignOrg;
        })
    );
  }

  submit() {
    if (!this.$scope.signUpForm.$valid) {
      return;
    }

    getBackendSrv()
      .post('/api/user/signup/step2', this.$scope.formModel)
      .then((rsp: any) => {
        if (rsp.code === 'redirect-to-select-org') {
          window.location.href = config.appSubUrl + '/profile/select-org?signup=1';
        } else {
          window.location.href = config.appSubUrl + '/';
        }
      });
  }
}

coreModule.controller('SignUpCtrl', SignUpCtrl);
