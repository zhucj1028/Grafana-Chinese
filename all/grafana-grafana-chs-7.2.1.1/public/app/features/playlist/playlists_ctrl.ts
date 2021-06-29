import { IScope } from 'angular';
import _ from 'lodash';
import { AppEvents } from '@grafana/data';
import { getBackendSrv } from '@grafana/runtime';

import coreModule from '../../core/core_module';
import { NavModelSrv } from 'app/core/nav_model_srv';
import { AppEventEmitter, CoreEvents } from 'app/types';
import { promiseToDigest } from '../../core/utils/promiseToDigest';

export class PlaylistsCtrl {
  playlists: any;
  navModel: any;

  /** @ngInject */
  constructor(private $scope: IScope & AppEventEmitter, navModelSrv: NavModelSrv) {
    this.navModel = navModelSrv.getNav('dashboards', 'playlists', 0);
    promiseToDigest($scope)(
      getBackendSrv()
        .get('/api/playlists')
        .then((result: any) => {
          this.playlists = result.map((item: any) => {
            item.startUrl = `playlists/play/${item.id}`;
            return item;
          });
        })
    );
  }

  removePlaylistConfirmed(playlist: any) {
    _.remove(this.playlists, { id: playlist.id });

    promiseToDigest(this.$scope)(
      getBackendSrv()
        .delete('/api/playlists/' + playlist.id)
        .then(
          () => {
            this.$scope.appEvent(AppEvents.alertSuccess, ['播放列表已删除']);
          },
          () => {
            this.$scope.appEvent(AppEvents.alertError, ['无法删除播放列表']);
            this.playlists.push(playlist);
          }
        )
    );
  }

  removePlaylist(playlist: any) {
    this.$scope.appEvent(CoreEvents.showConfirmModal, {
      title: '删除',
      text: '您确定要删除播放列表 ' + playlist.name + '?',
      yesText: '删除',
      icon: 'trash-alt',
      onConfirm: () => {
        this.removePlaylistConfirmed(playlist);
      },
    });
  }
}

coreModule.controller('PlaylistsCtrl', PlaylistsCtrl);
