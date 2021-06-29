import React, { FC } from 'react';
import { HorizontalGroup, LinkButton } from '@grafana/ui';

export interface Props {
  folderId?: number;
  isEditor: boolean;
  canEdit?: boolean;
}

export const DashboardActions: FC<Props> = ({ folderId, isEditor, canEdit }) => {
  const actionUrl = (type: string) => {
    let url = `dashboard/${type}`;

    if (folderId) {
      url += `?folderId=${folderId}`;
    }

    return url;
  };

  return (
    <HorizontalGroup spacing="md" align="center">
      {canEdit && <LinkButton href={actionUrl('new')}>新建仪表板</LinkButton>}
      {!folderId && isEditor && <LinkButton href="dashboards/folder/new">新建文件夹</LinkButton>}
      {canEdit && <LinkButton href={actionUrl('import')}>导入</LinkButton>}
    </HorizontalGroup>
  );
};
