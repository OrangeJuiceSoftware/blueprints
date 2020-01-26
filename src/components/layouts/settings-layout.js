import React from 'react';
import { useRouter } from 'next/router';

import { Layout, Menu, Icon } from 'antd';
const { Content } = Layout;
import { Sidebar } from 'components';

const routes = [
  { route: '/settings/account', displayText: 'Account', icon: 'smile' },
  { route: '/settings/organizations', displayText: 'Organizations', icon: 'team' },
  { route: '/settings/billing', displayText: 'Billing', icon: '' }
];

const SettingsLayout = ({ children }) => {
  const router = useRouter();

  return (
    <Layout>
      <Sidebar>
        <Menu style={{ borderRight: 'none' }} defaultSelectedKeys={[router.asPath]} mode={'inline'}>

          {routes.map(({ route, icon, displayText }) => {
            return (
              <Menu.Item key={route} onClick={() => route !== router.asPath && router.push(route)}>
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
