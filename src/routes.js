import Dashboard from 'pages/dashboard';
import Login from 'pages/login';
import Signup from 'pages/signup';
import Documents from 'pages/documents';
import DocumentsEdit from 'pages/documents/edit';
import DocumentsNew from 'pages/documents/new';
import DocumentsView from 'pages/documents/view';
import SettingsAccount from 'pages/settings/account';
import SettingsBilling from 'pages/settings/billing';
import SettingsOrganizations from 'pages/settings/organizations';

export default [
  { path: '/dashboard', component: Dashboard },
  { path: '/login', component: Login },
  { path: '/signup', component: Signup },
  { path: '/documents', component: Documents },
  { path: '/documents/new', component: DocumentsNew },
  { path: '/documents/:documentID/edit', component: DocumentsEdit },
  { path: '/documents/:documentID/view', component: DocumentsView },
  { path: '/settings/account', component: SettingsAccount },
  { path: '/settings/billing', component: SettingsBilling },
  { path: '/settings/organizations', component: SettingsOrganizations }
];
