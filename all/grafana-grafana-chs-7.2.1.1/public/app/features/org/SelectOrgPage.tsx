import React, { FC, useState } from 'react';
import Page from 'app/core/components/Page/Page';
import { getBackendSrv, config } from '@grafana/runtime';
import { UserOrg } from 'app/types';
import { useAsync } from 'react-use';
import { Button, HorizontalGroup } from '@grafana/ui';

const navModel = {
  main: {
    icon: 'grafana',
    subTitle: 'Preferences',
    text: '选择活跃的组织',
  },
  node: {
    text: '选择活跃的组织',
  },
};

const getUserOrgs = async () => {
  return await getBackendSrv().get('/api/user/orgs');
};
const setUserOrg = async (org: UserOrg) => {
  return await getBackendSrv()
    .post('/api/user/using/' + org.orgId)
    .then(() => {
      window.location.href = config.appSubUrl + '/';
    });
};

export const SelectOrgPage: FC = () => {
  const [orgs, setOrgs] = useState<UserOrg[]>();

  useAsync(async () => {
    setOrgs(await getUserOrgs());
  }, []);
  return (
    <Page navModel={navModel}>
      <Page.Contents>
        <div>
          <p>由于有公开邀请，您已被添加到另一个组织！ 请立即选择您要使用的组织（您以后可以随时更改此组织）。</p>
          <HorizontalGroup wrap>
            {orgs &&
              orgs.map(org => (
                <Button key={org.orgId} icon="signin" onClick={() => setUserOrg(org)}>
                  {org.name}
                </Button>
              ))}
          </HorizontalGroup>
        </div>
      </Page.Contents>
    </Page>
  );
};

export default SelectOrgPage;
