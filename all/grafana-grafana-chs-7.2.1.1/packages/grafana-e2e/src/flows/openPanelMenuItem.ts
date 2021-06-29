import { e2e } from '../index';

export enum PanelMenuItems {
  Edit = 'Edit',
  Inspect = 'Inspect',
}

export const openPanelMenuItem = (menu: PanelMenuItems, panelTitle = '面板标题') => {
  e2e.components.Panels.Panel.title(panelTitle)
    .should('be.visible')
    .click();

  e2e.components.Panels.Panel.headerItems(menu)
    .should('be.visible')
    .click();
};
