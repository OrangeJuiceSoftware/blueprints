import React, { useState } from 'react';
import { auth } from 'services/firebase';
import { useHistory } from 'react-router-dom';

import { useAuthRedirect } from 'hooks';

import Layout from 'layouts/default-layout';
import AuthForm from 'forms/auth-form';
import { Seo, Link } from 'components';

import { Button, Col, Row, Typography } from 'antd';
import { geekblue } from '@ant-design/colors';

const { Text, Title } = Typography;

const LoginPage = () => {
  const history = useHistory();
  const [result, redirectError, { signInWithGitHub, signInWithGoogle }] = useAuthRedirect();
  const [errors, setErrors] = useState({});

  // this action will get be duplicated by the middleware but lets leave it here for now
  // result also contains the token
  if (result && result.user) {
    history.push({ pathname: '/dashboard' });
  }

  // https://firebase.google.com/docs/reference/js/firebase.auth.Auth.html#getredirectresult
  if (redirectError) {
    // auth/email-already-in-use
    // auth/credential-already-in-use
    // auth/account-exists-with-different-credential


    // var errorCode = error.code;
    // var errorMessage = error.message;
    // var email = error.email;
    // var credential = error.credential;
  }

  const loginWithEmail = async ({ email, password }) => {
    try {
      await auth.signInWithEmailAndPassword(email, password);

      // send them to the home page
      history.push('/dashboard');
    } catch (error) {
      setErrors();
      // auth/user-disabled;
      // auth/user-not-found
      // auth/wrong-password

      // set errors... this will pass the errors into the form
      // setErrors({
      //   form: 'sfdsf',
      //   email: 'sfdsf',
      //   password: 'sfdsf'
      // });
    }

  };

  return (
    <Layout>
      <Seo title={'Login'}/>

      <Row style={{ marginTop: 50 }} justify={'center'} type={'flex'}>
        <Col>
          <Title>Blueprints</Title>

          <Button
            style={{ backgroundColor: 'black', fontSize: 20, color: 'white' }}
            onClick={signInWithGitHub}
            icon={'github'}
            size={'large'}>

            <Text style={{ color: 'white', fontSize: 14 }}>Continue With Github</Text>
          </Button>

          <Button
            style={{ backgroundColor: geekblue[5], fontSize: 20, color: 'white' }}
            onClick={signInWithGoogle}
            icon={'google'}
            size={'large'}>

            <Text style={{ color: 'white', fontSize: 14 }}>Continue With Google</Text>
          </Button>

          <AuthForm actionText={'Login'} onSubmit={loginWithEmail} externalErrors={errors}/>

          <Link to={'/signup'}>Signup</Link>
        </Col>
      </Row>
    </Layout>
  );
};

export default LoginPage;