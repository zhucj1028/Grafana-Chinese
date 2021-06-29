import React from 'react';
import { appEvents } from 'app/core/core';
import { Icon } from '@grafana/ui';

export class HelpModal extends React.PureComponent {
  static tabIndex = 0;
  static shortcuts = {
    全局: [
      { keys: ['g', 'h'], description: '转到主页仪表板' },
      { keys: ['g', 'p'], description: '转到个人资料' },
      { keys: ['s', 'o'], description: '打开搜索' },
      { keys: ['esc'], description: '退出编辑/设置视图' },
    ],
    仪表板: [
      { keys: ['mod+s'], description: '保存仪表板' },
      { keys: ['d', 'r'], description: '刷新所有仪表板' },
      { keys: ['d', 's'], description: '仪表板设置' },
      { keys: ['d', 'v'], description: '切换非活动/查看模式' },
      { keys: ['d', 'k'], description: '切换信息亭模式（隐藏顶部导航）' },
      { keys: ['d', 'E'], description: '展开所有行' },
      { keys: ['d', 'C'], description: '折叠所有行' },
      { keys: ['d', 'a'], description: '切换自动调整仪表板（实验功能）' },
      { keys: ['mod+o'], description: '切换共享图十字准线' },
      { keys: ['d', 'l'], description: '切换所有仪表板图例' },
    ],
    重点小组: [
      { keys: ['e'], description: '切换仪表板编辑视图' },
      { keys: ['v'], description: '切换仪表板全屏视图' },
      { keys: ['p', 's'], description: '打开仪表板共享模式' },
      { keys: ['p', 'd'], description: '复制仪表板' },
      { keys: ['p', 'r'], description: '移除仪表板' },
      { keys: ['p', 'l'], description: '切换面板图例' },
    ],
    时间范围: [
      { keys: ['t', 'z'], description: '缩小时间范围' },
      {
        keys: ['t', '←'],
        description: '将时间范围后退',
      },
      {
        keys: ['t', '→'],
        description: '向前移动时间范围',
      },
    ],
  };

  dismiss() {
    appEvents.emit('hide-modal');
  }

  render() {
    return (
      <div className="modal-body">
        <div className="modal-header">
          <h2 className="modal-header-title">
            <Icon name="keyboard" size="lg" />
            <span className="p-l-1">快捷键</span>
          </h2>
          <a className="modal-header-close" onClick={this.dismiss}>
            <Icon name="times" style={{ margin: '3px 0 0 0' }} />
          </a>
        </div>

        <div className="modal-content help-modal">
          <p className="small" style={{ position: 'absolute', top: '13px', right: '44px' }}>
            <span className="shortcut-table-key">mod</span> =
            <span className="muted"> 在Windows或Linux上为CTRL，在Mac上为CMD键</span>
          </p>

          {Object.entries(HelpModal.shortcuts).map(([category, shortcuts], i) => (
            <div className="shortcut-category" key={i}>
              <table className="shortcut-table">
                <tbody>
                  <tr>
                    <th className="shortcut-table-category-header" colSpan={2}>
                      {category}
                    </th>
                  </tr>
                  {shortcuts.map((shortcut, j) => (
                    <tr key={`${i}-${j}`}>
                      <td className="shortcut-table-keys">
                        {shortcut.keys.map((key, k) => (
                          <span className="shortcut-table-key" key={`${i}-${j}-${k}`}>
                            {key}
                          </span>
                        ))}
                      </td>
                      <td className="shortcut-table-description">{shortcut.description}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ))}

          <div className="clearfix" />
        </div>
      </div>
    );
  }
}
