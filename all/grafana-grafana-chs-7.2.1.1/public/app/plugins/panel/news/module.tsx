import { isString } from 'lodash';
import { PanelPlugin } from '@grafana/data';
import { NewsPanel } from './NewsPanel';
import { NewsOptions } from './types';
import { DEFAULT_FEED_URL, PROXY_PREFIX } from './constants';

export const plugin = new PanelPlugin<NewsOptions>(NewsPanel).setPanelOptions(builder => {
  builder
    .addTextInput({
      path: 'feedUrl',
      name: '地址',
      description: '仅支持RSS feed格式（不支持Atom）。',
      settings: {
        placeholder: DEFAULT_FEED_URL,
      },
    })
    .addBooleanSwitch({
      path: 'useProxy',
      name: '使用代理',
      description: '如果Feed无法连接，请考虑使用CORS代理',
      showIf: (currentConfig: NewsOptions) => {
        return isString(currentConfig.feedUrl) && !currentConfig.feedUrl.startsWith(PROXY_PREFIX);
      },
    });
});
