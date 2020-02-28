import React from 'react';
import { useHistory } from 'react-router-dom';

import { blueprintNewPath, blueprintViewPath } from 'routes';

import { useBlueprints, useOrganization } from 'fire/hooks';

import { Link, Seo } from 'components';
import Layout from 'layouts/sidebar-layout';
import { Button, Card, Tag, Col, Icon, Menu, Table, Row, List, Typography } from 'antd';

const { Text } = Typography;

const OrganizationView = ({ user, match }) => {
  const history = useHistory();
  const [organization, loadingOrganization, errorOrganization] = useOrganization(match.params.organizationID);
  const [blueprints, loadingBlueprints, errorBlueprints] = useBlueprints([match.params.organizationID]);

  const generateSidebarItems = () => {
    return (
      <>
        <Link to={blueprintNewPath()}>
          <Button type="primary" shape="round" icon="plus" size={'large'} style={{ margin: 16 }}>
            New
          </Button>
        </Link>

        <List
          // bordered
          size={'large'}
          dataSource={organization && organization.labels}
          renderItem={label => (
            <Row style={{ padding: '8px 16px' }}>
              <Tag key={label} style={{ padding: '4px 8px' }}>{label}</Tag>
            </Row>
          )}
        />

      </>
    );
  };

  if (loadingOrganization) {
    return <p>loading</p>;
  }

  const columns = [
    {
      title: 'Title',
      dataIndex: 'title',
      key: 'title',
      // filters: [{ text: 'Joe', value: 'Joe' }, { text: 'Jim', value: 'Jim' }],
      // filteredValue: filteredInfo.name || null,
      // onFilter: (value, record) => record.name.includes(value),
      // sorter: (a, b) => a.name.length - b.name.length,
      // sortOrder: sortedInfo.columnKey === 'name' && sortedInfo.order,
      ellipsis: true
    },
    {
      title: 'Approved',
      dataIndex: 'approvals',
      key: 'approvals',
      //   filters: [{ text: 'London', value: 'London' }, { text: 'New York', value: 'New York' }],
      //   filteredValue: filteredInfo.address || null,
      //   onFilter: (value, record) => record.address.includes(value),
      //   sorter: (a, b) => a.address.length - b.address.length,
      //   sortOrder: sortedInfo.columnKey === 'address' && sortedInfo.order,
      //   ellipsis: true
      render: approvals => approvals.length
    },
    {
      title: 'Created At',
      dataIndex: 'createdAt',
      key: 'createdAt',
      render: text => <Text>{text.toDate().toLocaleDateString()}</Text>,
      // sorter: (a, b) => a.age - b.age,
      // sortOrder: sortedInfo.columnKey === 'age' && sortedInfo.order,
      ellipsis: true
    },
    {
      title: '',
      dataIndex: 'id',
      key: 'id',
      // render: id =>
      render: () => (
        <Button onClick={(e) => { e.stopPropagation(); console.log('button click') }} type="secondary" shape="circle">
          <Icon style={{ fontSize: 24 }} type={'more'}/>
        </Button>
      )
    }
  ];


  return (
    <Layout sidebarItems={generateSidebarItems()}>
      <Seo title={organization.name}/>

      <Table rowKey={'id'} columns={columns} dataSource={blueprints} onRow={(blueprint) => {
        return {
          onClick: () => history.push(blueprintViewPath(blueprint.id))
        };
      }} />

    </Layout>
  );
};

export default OrganizationView;
