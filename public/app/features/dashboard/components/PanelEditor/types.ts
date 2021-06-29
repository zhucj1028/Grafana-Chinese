export interface PanelEditorTab {
  id: string;
  text: string;
  active: boolean;
  icon: string;
}

export enum PanelEditorTabId {
  Query = 'query',
  Transform = 'transform',
  Visualize = 'visualize',
  Alert = 'alert',
}

export enum DisplayMode {
  Fill = 0,
  Fit = 1,
  Exact = 2,
}

export const displayModes = [
  { value: DisplayMode.Fill, label: '填充', description: '使用所有可用空间' },
  { value: DisplayMode.Fit, label: '适应', description: '适合空间比例' },
  { value: DisplayMode.Exact, label: '精确', description: '与仪表板大小相同' },
];
