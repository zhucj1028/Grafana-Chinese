import React, { PureComponent } from 'react';
import { renderMarkdown } from '@grafana/data';
import { getBackendSrv } from '@grafana/runtime';

interface Props {
  plugin: {
    name: string;
    id: string;
  };
  type: string;
}

interface State {
  isError: boolean;
  isLoading: boolean;
  help: string;
}

export class PluginHelp extends PureComponent<Props, State> {
  state = {
    isError: false,
    isLoading: false,
    help: '',
  };

  componentDidMount(): void {
    this.loadHelp();
  }

  constructPlaceholderInfo() {
    return '找不到插件帮助或自述文件减价文件';
  }

  loadHelp = () => {
    const { plugin, type } = this.props;
    this.setState({ isLoading: true });

    getBackendSrv()
      .get(`/api/plugins/${plugin.id}/markdown/${type}`)
      .then((response: string) => {
        const helpHtml = renderMarkdown(response);

        if (response === '' && type === 'help') {
          this.setState({
            isError: false,
            isLoading: false,
            help: this.constructPlaceholderInfo(),
          });
        } else {
          this.setState({
            isError: false,
            isLoading: false,
            help: helpHtml,
          });
        }
      })
      .catch(() => {
        this.setState({
          isError: true,
          isLoading: false,
        });
      });
  };

  render() {
    const { type } = this.props;
    const { isError, isLoading, help } = this.state;

    if (isLoading) {
      return <h2>正在加载帮助...</h2>;
    }

    if (isError) {
      return <h3>'加载帮助时发生错误'</h3>;
    }

    if (type === 'panel_help' && help === '') {
    }

    return <div className="markdown-html" dangerouslySetInnerHTML={{ __html: help }} />;
  }
}
