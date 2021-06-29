// Libraries
import React, { PureComponent } from 'react';

// Types
import { PluginConfigPageProps, DataSourcePluginMeta, DataSourceJsonData } from '@grafana/data';

interface Props extends PluginConfigPageProps<DataSourcePluginMeta<DataSourceJsonData>> {}

export class TestInfoTab extends PureComponent<Props> {
  constructor(props: Props) {
    super(props);
  }

  render() {
    return (
      <div>
        有关设置可重复测试环境的更多信息，请参阅github。
        <br />
        <br />
        <a
          className="btn btn-inverse"
          href="https://github.com/grafana/grafana/tree/master/devenv"
          target="_blank"
          rel="noopener"
        >
          GitHub
        </a>
        <br />
      </div>
    );
  }
}
