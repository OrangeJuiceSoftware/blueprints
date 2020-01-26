import React from 'react';
import { useHistory } from 'react-router-dom';

import { Layout, Menu, Icon } from 'antd';
import { Sidebar } from 'components';

const { Content } = Layout;

const routes = [
  { id: 'account', route: '/settings/account', displayText: 'Account', icon: 'smile' },
  { id: 'organization', route: '/settings/organizations', displayText: 'Organizations', icon: 'team' },
  { id: 'billing', route: '/settings/billing', displayText: 'Billing', icon: 'team' }
];

const SettingsLayout = ({ children, selectedID }) => {
  const history = useHistory();

  return (
    <Layout>
      <Sidebar>
        <Menu style={{ borderRight: 'none' }} defaultSelectedKeys={[selectedID]} mode={'inline'}>

          {routes.map(({ route, icon, displayText, id }) => {
            return (
              <Menu.Item key={id} onClick={() => id !== selectedID && history.push(route)}>
                <Icon type={icon}/>
                <span>{displayText}</span>
              </Menu.Item>
            );
          })}

        </Menu>
      </Sidebar>

      <Layout style={{ overflow: 'auto', height: 'calc(100vh - 64px)' }}>
        <Content style={{ margin: '0' }}>
          {children}
        </Content>
      </Layout>
    </Layout>
  );
};

export default SettingsLayout;
