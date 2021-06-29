import { PanelPlugin } from '@grafana/data';

import { TextPanel } from './TextPanel';
import { TextOptions } from './types';
import { textPanelMigrationHandler } from './textPanelMigrationHandler';
import { TextPanelEditor } from './TextPanelEditor';

export const plugin = new PanelPlugin<TextOptions>(TextPanel)
  .setPanelOptions(builder => {
    builder
      .addRadio({
        path: 'mode',
        name: '模式',
        description: '面板的文字模式',
        settings: {
          options: [
            { value: 'markdown', label: 'Markdown' },
            { value: 'html', label: 'HTML' },
          ],
        },
        defaultValue: 'markdown',
      })
      .addCustomEditor({
        id: 'content',
        path: 'content',
        name: '内容',
        description: '面板内容',
        defaultValue: `# 标题

有关 markdown 语法帮助: [commonmark.org/help](https://commonmark.org/help/)
         `,
        editor: TextPanelEditor,
      });
  })
  .setMigrationHandler(textPanelMigrationHandler);
