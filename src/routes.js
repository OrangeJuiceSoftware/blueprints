import Dashboard from 'pages/dashboard';
import Login from 'pages/login';
import Signup from 'pages/signup';

import FilesEdit from 'pages/files/edit';
import FilesNew from 'pages/files/new';
import FilesView from 'pages/files/view';

import ProjectsView from 'pages/projects/view';

import SettingsAccount from 'pages/settings/account';
import SettingsBilling from 'pages/settings/billing';
import SettingsProjects from 'pages/settings/projects';

export default [
  { path: '/', page: Dashboard, isPrivate: true },
  { path: '/login', page: Login },
  { path: '/signup', page: Signup },

  { path: '/f/new', page: FilesNew, isPrivate: true },
  { path: '/f/:fileID/edit', page: FilesEdit, isPrivate: true },
  { path: '//:fileID/view', page: FilesView, isPrivate: true },

  { path: '/p/new', page: ProjectsView, isPrivate: true },
  { path: '/p/:projectID', page: ProjectsView, isPrivate: true },

  { path: '/settings/account', page: SettingsAccount, isPrivate: true },
  { path: '/settings/billing', page: SettingsBilling, isPrivate: true },
  { path: '/settings/projects', page: SettingsProjects, isPrivate: true }
];


export const dashboardPath = () => '/';
export const projectPath = (projectID) => `/p/${projectID}`;
export const projectNewPath = () => 'p/new';
export const fileEditPath = (fileID) => `/f/${fileID}/edit`;
export const fileViewPath = (fileID) => `/f/${fileID}/view`;
export const fileNewPath = () => '/f/new';
