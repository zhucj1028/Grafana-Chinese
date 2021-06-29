import validationSrv from '../services/ValidationSrv';
import { getBackendSrv } from '@grafana/runtime';

export const validateDashboardJson = (json: string) => {
  try {
    JSON.parse(json);
    return true;
  } catch (error) {
    return '无效的JSON';
  }
};

export const validateGcomDashboard = (gcomDashboard: string) => {
  // From DashboardImportCtrl
  const match = /(^\d+$)|dashboards\/(\d+)/.exec(gcomDashboard);

  return match && (match[1] || match[2]) ? true : '找不到有效的Grafana.com ID';
};

export const validateTitle = (newTitle: string, folderId: number) => {
  return validationSrv
    .validateNewDashboardName(folderId, newTitle)
    .then(() => {
      return true;
    })
    .catch(error => {
      if (error.type === 'EXISTING') {
        return error.message;
      }
    });
};

export const validateUid = (value: string) => {
  return getBackendSrv()
    .get(`/api/dashboards/uid/${value}`)
    .then(existingDashboard => {
      return `仪表板 '${existingDashboard?.dashboard.title}' 在文件夹 '${existingDashboard?.meta.folderTitle}' 内有相同uid`;
    })
    .catch(error => {
      error.isHandled = true;
      return true;
    });
};
