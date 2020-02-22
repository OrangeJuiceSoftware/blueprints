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
  { path: '/dashboard', page: Dashboard },
  { path: '/login', page: Login },
  { path: '/signup', page: Signup },

  { path: '/b/new', page: BlueprintsNew },
  { path: '/b/:blueprintID/edit', page: BlueprintsEdit },
  { path: '/b/:blueprintID/view', page: BlueprintsView },

  { path: '/o/:organizationID', page: OrganizationsView },

  { path: '/settings/account', page: SettingsAccount },
  { path: '/settings/billing', page: SettingsBilling },
  { path: '/settings/organizations', page: SettingsOrganizations }
];

export const organizationPath = (organizationID) => `/o/${organizationID}`;
export const blueprintEditPath = (blueprintID) => `/b/${blueprintID}/edit`;
export const blueprintViewPath = (blueprintID) => `/b/${blueprintID}/view`;
export const blueprintNewPath = () => '/b/new';
