import coreModule from 'app/core/core_module';
import { backendSrv } from 'app/core/services/backend_srv';

const hitTypes = {
  FOLDER: 'dash-folder',
  DASHBOARD: 'dash-db',
};

export class ValidationSrv {
  rootName = 'general';

  validateNewDashboardName(folderId: any, name: string) {
    return this.validate(folderId, name, '仪表板或具有相同名称的文件夹已存在');
  }

  validateNewFolderName(name: string) {
    return this.validate(0, name, '常规文件夹中具有相同名称的文件夹或仪表板已经存在');
  }

  private async validate(folderId: any, name: string, existingErrorMessage: string) {
    name = (name || '').trim();
    const nameLowerCased = name.toLowerCase();

    if (name.length === 0) {
      throw {
        type: 'REQUIRED',
        message: '名字是必填项',
      };
    }

    if (folderId === 0 && nameLowerCased === this.rootName) {
      throw {
        type: 'EXISTING',
        message: '这是保留名称，不能用于文件夹。',
      };
    }

    const promises = [];
    promises.push(backendSrv.search({ type: hitTypes.FOLDER, folderIds: [folderId], query: name }));
    promises.push(backendSrv.search({ type: hitTypes.DASHBOARD, folderIds: [folderId], query: name }));

    const res = await Promise.all(promises);
    let hits: any[] = [];

    if (res.length > 0 && res[0].length > 0) {
      hits = res[0];
    }

    if (res.length > 1 && res[1].length > 0) {
      hits = hits.concat(res[1]);
    }

    for (const hit of hits) {
      if (nameLowerCased === hit.title.toLowerCase()) {
        throw {
          type: 'EXISTING',
          message: existingErrorMessage,
        };
      }
    }

    return;
  }
}

const validationSrv = new ValidationSrv();

export default validationSrv;

coreModule.service('validationSrv', ValidationSrv);
