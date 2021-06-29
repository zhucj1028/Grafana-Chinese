import React, { MouseEvent, PureComponent } from 'react';
import { IconButton } from '@grafana/ui';
import { selectors } from '@grafana/e2e-selectors';

import EmptyListCTA from '../../../core/components/EmptyListCTA/EmptyListCTA';
import { QueryVariableModel, VariableModel } from '../types';
import { toVariableIdentifier, VariableIdentifier } from '../state/types';

export interface Props {
  variables: VariableModel[];
  onAddClick: (event: MouseEvent<HTMLAnchorElement>) => void;
  onEditClick: (identifier: VariableIdentifier) => void;
  onChangeVariableOrder: (identifier: VariableIdentifier, fromIndex: number, toIndex: number) => void;
  onDuplicateVariable: (identifier: VariableIdentifier) => void;
  onRemoveVariable: (identifier: VariableIdentifier) => void;
}

enum MoveType {
  down = 1,
  up = -1,
}

export class VariableEditorList extends PureComponent<Props> {
  onEditClick = (event: MouseEvent, identifier: VariableIdentifier) => {
    event.preventDefault();
    this.props.onEditClick(identifier);
  };

  onChangeVariableOrder = (event: MouseEvent, variable: VariableModel, moveType: MoveType) => {
    event.preventDefault();
    this.props.onChangeVariableOrder(toVariableIdentifier(variable), variable.index, variable.index + moveType);
  };

  onDuplicateVariable = (event: MouseEvent, identifier: VariableIdentifier) => {
    event.preventDefault();
    this.props.onDuplicateVariable(identifier);
  };

  onRemoveVariable = (event: MouseEvent, identifier: VariableIdentifier) => {
    event.preventDefault();
    this.props.onRemoveVariable(identifier);
  };

  render() {
    return (
      <div>
        <div>
          {this.props.variables.length === 0 && (
            <div>
              <EmptyListCTA
                title="还没有变量"
                buttonIcon="calculator-alt"
                buttonTitle="添加变量"
                infoBox={{
                  __html: ` <p>
                  变量可启用更多交互式和动态仪表板。 您可以在变量中使用变量，而不必在指标查询中对服务器或传感器名称之类的东西进行硬编码。 变量在仪表板顶部显示为下拉选择框。 这些下拉菜单使更改仪表盘中显示的数据变得容易。 有关详细信息，请查看<a class="external-link" href="http://docs.grafana.org/reference/templating/" target="_blank">模板文档</a>。
                  </p>`,
                }}
                infoBoxTitle="变量做什么?"
                onClick={this.props.onAddClick}
              />
            </div>
          )}

          {this.props.variables.length > 0 && (
            <div>
              <table
                className="filter-table filter-table--hover"
                aria-label={selectors.pages.Dashboard.Settings.Variables.List.table}
              >
                <thead>
                  <tr>
                    <th>变量</th>
                    <th>定义</th>
                    <th colSpan={5} />
                  </tr>
                </thead>
                <tbody>
                  {this.props.variables.map((state, index) => {
                    const variable = state as QueryVariableModel;
                    return (
                      <tr key={`${variable.name}-${index}`}>
                        <td style={{ width: '1%' }}>
                          <span
                            onClick={event => this.onEditClick(event, toVariableIdentifier(variable))}
                            className="pointer template-variable"
                            aria-label={selectors.pages.Dashboard.Settings.Variables.List.tableRowNameFields(
                              variable.name
                            )}
                          >
                            {variable.name}
                          </span>
                        </td>
                        <td
                          style={{ maxWidth: '200px' }}
                          onClick={event => this.onEditClick(event, toVariableIdentifier(variable))}
                          className="pointer max-width"
                          aria-label={selectors.pages.Dashboard.Settings.Variables.List.tableRowDefinitionFields(
                            variable.name
                          )}
                        >
                          {variable.definition ? variable.definition : variable.query}
                        </td>

                        <td style={{ width: '1%' }}>
                          {index > 0 && (
                            <IconButton
                              onClick={event => this.onChangeVariableOrder(event, variable, MoveType.up)}
                              name="arrow-up"
                              title="上移变量"
                              aria-label={selectors.pages.Dashboard.Settings.Variables.List.tableRowArrowUpButtons(
                                variable.name
                              )}
                            />
                          )}
                        </td>
                        <td style={{ width: '1%' }}>
                          {index < this.props.variables.length - 1 && (
                            <IconButton
                              onClick={event => this.onChangeVariableOrder(event, variable, MoveType.down)}
                              name="arrow-down"
                              title="下移变量"
                              aria-label={selectors.pages.Dashboard.Settings.Variables.List.tableRowArrowDownButtons(
                                variable.name
                              )}
                            />
                          )}
                        </td>
                        <td style={{ width: '1%' }}>
                          <IconButton
                            onClick={event => this.onDuplicateVariable(event, toVariableIdentifier(variable))}
                            name="copy"
                            title="复制变量"
                            aria-label={selectors.pages.Dashboard.Settings.Variables.List.tableRowDuplicateButtons(
                              variable.name
                            )}
                          />
                        </td>
                        <td style={{ width: '1%' }}>
                          <IconButton
                            onClick={event => this.onRemoveVariable(event, toVariableIdentifier(variable))}
                            name="trash-alt"
                            title="移除变量"
                            aria-label={selectors.pages.Dashboard.Settings.Variables.List.tableRowRemoveButtons(
                              variable.name
                            )}
                          />
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    );
  }
}
