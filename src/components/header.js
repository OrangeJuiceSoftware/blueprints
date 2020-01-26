import React, { useState } from 'react';
import { auth, firestore } from 'services/firebase';

import {
  useHistory,
  useLocation,
  useParams
} from 'react-router-dom';

import { Layout, Row, Col, Menu, Icon, Dropdown, Button } from 'antd';
import { orange } from '@ant-design/colors';

const { Header } = Layout;

const PageHeader = ({ user }) => {
  const history = useHistory();
  const location = useLocation();
  const params = useParams();

  console.log(history);
  console.log(location);
  console.log(params);


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