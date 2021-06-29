export enum OrgRole {
  Viewer = 'Viewer',
  Editor = 'Editor',
  Admin = 'Admin',
}

export interface DashboardAclDTO {
  id?: number;
  dashboardId?: number;
  userId?: number;
  userLogin?: string;
  userEmail?: string;
  teamId?: number;
  team?: string;
  permission?: PermissionLevel;
  role?: OrgRole;
  icon?: string;
  inherited?: boolean;
}

export interface DashboardAclUpdateDTO {
  userId?: number;
  teamId?: number;
  role?: OrgRole;
  permission?: PermissionLevel;
}

export interface DashboardAcl {
  id?: number;
  dashboardId?: number;
  userId?: number;
  userLogin?: string;
  userEmail?: string;
  teamId?: number;
  team?: string;
  permission?: PermissionLevel;
  role?: OrgRole;
  icon?: string;
  name?: string;
  inherited?: boolean;
  sortRank?: number;
  userAvatarUrl?: string;
  teamAvatarUrl?: string;
}

export interface DashboardPermissionInfo {
  value: PermissionLevel;
  label: string;
  description: string;
}

export interface NewDashboardAclItem {
  teamId: number;
  userId: number;
  role?: OrgRole;
  permission: PermissionLevel;
  type: AclTarget;
}

export enum PermissionLevel {
  View = 1,
  Edit = 2,
  Admin = 4,
}

export enum DataSourcePermissionLevel {
  Query = 1,
  Admin = 2,
}

export enum AclTarget {
  Team = 'Team',
  User = 'User',
  Viewer = 'Viewer',
  Editor = 'Editor',
}

export interface AclTargetInfo {
  value: AclTarget;
  text: string;
}

export const dataSourceAclLevels = [
  { value: DataSourcePermissionLevel.Query, label: '查询', description: '可以查询数据源。' },
];

export const dashboardAclTargets: AclTargetInfo[] = [
  { value: AclTarget.Team, text: '团队' },
  { value: AclTarget.User, text: '用户' },
  { value: AclTarget.Viewer, text: '具有查看者角色的所有人' },
  { value: AclTarget.Editor, text: '具有编辑角色的所有人' },
];

export const dashboardPermissionLevels: DashboardPermissionInfo[] = [
  { value: PermissionLevel.View, label: '查看', description: '可以查看仪表板。' },
  { value: PermissionLevel.Edit, label: '编辑', description: '可以添加，编辑和删除仪表板。' },
  {
    value: PermissionLevel.Admin,
    label: '管理员',
    description: '可以添加/删除权限，并且可以添加，编辑和删除仪表板。',
  },
];

export enum TeamPermissionLevel {
  Member = 0,
  Admin = 4,
}

export interface TeamPermissionInfo {
  value: TeamPermissionLevel;
  label: string;
  description: string;
}

export const teamsPermissionLevels: TeamPermissionInfo[] = [
  { value: TeamPermissionLevel.Member, label: '成员', description: '是团队成员' },
  {
    value: TeamPermissionLevel.Admin,
    label: '管理员',
    description: '可以添加/删除权限，成员和删除团队。',
  },
];
