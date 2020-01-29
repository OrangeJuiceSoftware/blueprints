import {
  Dashboard,
  Login,
  Signup,
  Documents,
  DocumentsEdit,
  DocumentsView,
  SettingsAccount,
  SettingsBilling,
  SettingsOrganizations
} from 'pages';

export default [
  { path: '/dashboard', component: Dashboard },
  { path: '/login', component: Login },
  { path: '/signup', component: Signup },
  { path: '/documents', component: Documents },
  { path: '/documents/:documentID/edit', component: DocumentsEdit },
  { path: '/documents/:documentID/view', component: DocumentsView },
  { path: '/settings/account', component: SettingsAccount },
  { path: '/settings/billing', component: SettingsBilling },
  { path: '/settings/organizations', component: SettingsOrganizations }
];
