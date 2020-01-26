import React from 'react';
import { auth } from 'services/firebase';
import { useHistory } from 'react-router-dom';

import { Layout, Row, Menu, Icon, Dropdown, Button } from 'antd';
import { orange } from '@ant-design/colors';

const { Header } = Layout;

const PageHeader = ({ user }) => {
  const history = useHistory();

  const menu = (
    <Menu style={{ padding: 16 }}>
      <Menu.Item onClick={() => history.push('/settings/account')} key="account">
        <Icon type="setting" />
      Account
      </Menu.Item>

      <Menu.Item onClick={() => auth.signOut()} key="logout">
        <Icon type="poweroff"/>
      Logout
      </Menu.Item>
    </Menu>
  );

  return (
    <Header style={{ padding: 0 }}>
      <Row type={'flex'} align={'middle'} justify={'space-between'}>
        <div style={{
          height: 32,
          width: 218,
          background: orange[5],
          margin: 16
        }}/>

        {user&& <Row style={{ margin: '0 16px' }}>
          <Dropdown trigger={['click']} overlay={menu}>
            <Button size={'large'}>
              <Icon style={{ fontSize: 20 }} type="user" />
            </Button>
          </Dropdown>
        </Row>}
      </Row>
    </Header>
  );
};

export default PageHeader;