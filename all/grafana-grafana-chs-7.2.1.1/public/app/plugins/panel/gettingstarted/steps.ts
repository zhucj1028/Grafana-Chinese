import { getDatasourceSrv } from 'app/features/plugins/datasource_srv';
import { getBackendSrv } from 'app/core/services/backend_srv';
import store from 'app/core/store';
import { SetupStep } from './types';

const step1TutorialTitle = 'Grafana fundamentals';
const step2TutorialTitle = 'Create users and teams';
const keyPrefix = 'getting.started.';
const step1Key = `${keyPrefix}${step1TutorialTitle
  .replace(' ', '-')
  .trim()
  .toLowerCase()}`;
const step2Key = `${keyPrefix}${step2TutorialTitle
  .replace(' ', '-')
  .trim()
  .toLowerCase()}`;

export const getSteps = (): SetupStep[] => [
  {
    heading: '欢迎来到Grafana',
    subheading: '以下步骤将指导您快速完成Grafana安装的设置。',
    title: '基础',
    info: '以下步骤将指导您快速完成Grafana安装的设置。',
    done: false,
    cards: [
      {
        type: 'tutorial',
        heading: '数据源和仪表板',
        title: step1TutorialTitle,
        info: '如果您没有经验，请设置并了解Grafana。 本教程将指导您完成整个过程，并在右侧介绍“数据源”和“仪表板”步骤。',
        href: 'https://grafana.com/tutorials/grafana-fundamentals',
        icon: 'grafana',
        check: () => Promise.resolve(store.get(step1Key)),
        key: step1Key,
        done: false,
      },
      {
        type: 'docs',
        title: '添加您的第一个数据源',
        heading: 'data sources',
        icon: 'database',
        learnHref: 'https://grafana.com/docs/grafana/latest/features/datasources/add-a-data-source',
        href: 'datasources/new',
        check: () => {
          return new Promise(resolve => {
            resolve(
              getDatasourceSrv()
                .getMetricSources()
                .filter(item => {
                  return item.meta.builtIn !== true;
                }).length > 0
            );
          });
        },
        done: false,
      },
      {
        type: 'docs',
        heading: '仪表板',
        title: '创建您的第一个仪表板',
        icon: 'apps',
        href: 'dashboard/new',
        learnHref: 'https://grafana.com/docs/grafana/latest/guides/getting_started/#create-a-dashboard',
        check: async () => {
          const result = await getBackendSrv().search({ limit: 1 });
          return result.length > 0;
        },
        done: false,
      },
    ],
  },
  {
    heading: '安装完成！',
    subheading:
      '使用Grafana的所有必要步骤已完成。 现在解决高级步骤或充分利用此家庭仪表板（毕竟这是一个完全可自定义的仪表板），然后删除此面板。',
    title: '高级',
    info: ' 管理您的用户和团队，并添加插件。 这些步骤是选项l',
    done: false,
    cards: [
      {
        type: 'tutorial',
        heading: '用户',
        title: '创建用户和团队',
        info: '学习组织团队中的用户，以及管理资源访问和角色。',
        href: 'https://grafana.com/tutorials/create-users-and-teams',
        icon: 'users-alt',
        key: step2Key,
        check: () => Promise.resolve(store.get(step2Key)),
        done: false,
      },
      {
        type: 'docs',
        heading: '插件',
        title: '查找并安装插件',
        learnHref: 'https://grafana.com/docs/grafana/latest/plugins/installation',
        href: 'plugins',
        icon: 'plug',
        check: async () => {
          const plugins = await getBackendSrv().get('/api/plugins', { embedded: 0, core: 0 });
          return Promise.resolve(plugins.length > 0);
        },
        done: false,
      },
    ],
  },
];
