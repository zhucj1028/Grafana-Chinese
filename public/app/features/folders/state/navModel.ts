import { FolderDTO } from 'app/types';
import { NavModelItem, NavModel } from '@grafana/data';

export function buildNavModel(folder: FolderDTO): NavModelItem {
  return {
    icon: 'folder',
    id: 'manage-folder',
    subTitle: '管理文件夹仪表板和权限',
    url: '',
    text: folder.title,
    breadcrumbs: [{ title: '仪表板', url: 'dashboards' }],
    children: [
      {
        active: false,
        icon: 'apps',
        id: `folder-dashboards-${folder.uid}`,
        text: '仪表板',
        url: folder.url,
      },
      {
        active: false,
        icon: 'lock',
        id: `folder-permissions-${folder.uid}`,
        text: '权限',
        url: `${folder.url}/permissions`,
      },
      {
        active: false,
        icon: 'cog',
        id: `folder-settings-${folder.uid}`,
        text: '设置',
        url: `${folder.url}/settings`,
      },
    ],
  };
}

export function getLoadingNav(tabIndex: number): NavModel {
  const main = buildNavModel({
    id: 1,
    uid: 'loading',
    title: '加载中',
    url: 'url',
    canSave: false,
    canEdit: false,
    canAdmin: false,
    version: 0,
  });

  main.children![tabIndex].active = true;

  return {
    main: main,
    node: main.children![tabIndex],
  };
}
