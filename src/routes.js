import Dashboard from 'pages/dashboard';
import Login from 'pages/login';
import Signup from 'pages/signup';

import BlueprintsEdit from 'pages/blueprints/edit';
import BlueprintsNew from 'pages/blueprints/new';
import BlueprintsView from 'pages/blueprints/view';

import OrganizationsView from 'pages/organizations/view';

import SettingsAccount from 'pages/settings/account';
import SettingsBilling from 'pages/settings/billing';
import SettingsOrganizations from 'pages/settings/organizations';

export default [
  { path: '/', page: Dashboard, isPrivate: true },
  { path: '/login', page: Login },
  { path: '/signup', page: Signup },

  { path: '/b/new', page: BlueprintsNew, isPrivate: true },
  { path: '/b/:blueprintID/edit', page: BlueprintsEdit, isPrivate: true },
  { path: '/b/:blueprintID/view', page: BlueprintsView, isPrivate: true },

  { path: '/o/new', page: OrganizationsView, isPrivate: true },
  { path: '/o/:organizationID', page: OrganizationsView, isPrivate: true },

  { path: '/settings/account', page: SettingsAccount, isPrivate: true },
  { path: '/settings/billing', page: SettingsBilling, isPrivate: true },
  { path: '/settings/organizations', page: SettingsOrganizations, isPrivate: true }
];


export const dashboardPath = () => '/';
export const organizationPath = (organizationID) => `/o/${organizationID}`;
export const organizationNewPath = () => 'o/new';
export const blueprintEditPath = (blueprintID) => `/b/${blueprintID}/edit`;
export const blueprintViewPath = (blueprintID) => `/b/${blueprintID}/view`;
export const blueprintNewPath = () => '/b/new';
