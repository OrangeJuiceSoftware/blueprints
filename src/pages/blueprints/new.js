import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';

import { blueprintEditPath } from 'routes';

import { useBlueprints, useOrganizations } from 'fire/hooks';
import { createBlueprintFromTemplate, createBlueprintFromFile } from 'fire/actions';

import { useQuery } from 'hooks';

import { Seo } from 'components';
import Layout from 'layouts/default-layout';
import { Card, Col, Icon, PageHeader, Row } from 'antd';
import groupBy from 'lodash/groupBy';

const templateIDs = [1, 2, 3, 4, 5, 6, 7];

const BlueprintsNew = ({ user }) => {
  const history = useHistory();
  const query = useQuery();

  const [organizations, loadingOrganizations, errorOrganizations] = useOrganizations(user.uid);
  const [blueprints, loading, error] = useBlueprints(organizations && organizations.map(({ id }) => id));
  const [selectedOrganization, setSelectedOrganization] = useState();

  const organizationsMap = groupBy(organizations, 'id');

  useEffect(() => {
    // hack to get around using exhaustive deps array. organizations is an object.... always not equal to last
    if (!loadingOrganizations) {
      if (query.o) {
        setSelectedOrganization(organizationsMap[query.o]);
      } else {
        setSelectedOrganization(organizations[0]);
      }
    }
  }, [loadingOrganizations, query.o]);

  console.log(selectedOrganization);

  const handleTemplateClick = async (templateID) => {
    try {
      const docRef = await createBlueprintFromTemplate({ userID: user.uid, organizationID: selectedOrganization.id, templateID });
      history.push(blueprintEditPath(docRef.id));
    } catch (error) {
      console.log(error);
    }
  };

  const handleFileClick = async (cloneID) => {
    try {
      const docRef = await createBlueprintFromFile({ userID: user.uid, organizationID: selectedOrganization.id, cloneID });
      history.push(blueprintEditPath(docRef.id));
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Layout style={{ padding: '0 64px' }}>
      <Seo title={'Create'}/>

      <Row gutter={[24, 48]} style={{ margin: 24 }}>

        <PageHeader
          style={{
            margin: '24px 0',
            borderBottom: '1px solid rgb(235, 237, 240)'
          }}
          title="Templates"
          subTitle="Create from a template"
        />

        {/* This is the blank placeholder */}
        <Col span={4}>
          <p>Blank</p>
          <Card hoverable onClick={() => handleTemplateClick({ templateID: 0 })}>
            <Icon type={'plus'}/>
          </Card>
        </Col>

        {templateIDs.map((templateID) => (
          <Col key={templateID} span={4}>

            <p>Template Title</p>

            <Card hoverable onClick={() => handleTemplateClick({ templateID })}>
              <p>this is a template {templateID}</p>
            </Card>

          </Col>
        ))}

      </Row>

      <Row gutter={[24, 48]} style={{ margin: 24 }}>

        <PageHeader
          style={{
            margin: '24px 0',
            borderBottom: '1px solid rgb(235, 237, 240)'
          }}
          title="Your Blueprints"
          subTitle="Clone from an existing file"
        />

        {blueprints && blueprints.map((blueprint) => (
          <Col key={blueprint.id} span={4}>

            <p>{blueprint.title}</p>

            <Card hoverable onClick={() => handleFileClick({ cloneID: blueprint.id })}>
              <p>Card content</p>
              <p>Card content</p>
              <p>Card content</p>
            </Card>

          </Col>
        ))}

      </Row>

    </Layout>
  );
};

export default BlueprintsNew;
