import React from 'react';
import { auth } from 'services/firebase';
import { useHistory } from 'react-router-dom';
import { dashboardPath } from 'routes';
import { Layout, Row, Menu, Icon, Dropdown, Button } from 'antd';
import { Link } from 'components';
import { geekblue } from '@ant-design/colors';

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
    <Layout.Header style={{ padding: 0 }}>
      <Row type={'flex'} align={'middle'} justify={'space-between'}>

        <Link to={dashboardPath()}>
          <div style={{
            height: 20,
            width: 150,
            background: geekblue[0],
            margin: 10
          }}/>
        </Link>

        {user&& <Row style={{ margin: '0 10px' }}>
          <Dropdown trigger={['click']} overlay={menu}>
            <Button size={'small'}>
              <Icon style={{ fontSize: 16 }} type="user" />
            </Button>
          </Dropdown>
        </Row>}
      </Row>
    </Layout.Header>
  );
};

export default PageHeader;