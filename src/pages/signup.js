import React, { useState } from 'react';
import { auth } from 'services/firebase';
import { useHistory } from 'react-router-dom';

import { dashboardPath } from 'routes';

import { createPersonalProject } from 'fire/actions';

import { useAuthRedirect } from 'hooks';

import Layout from 'layouts/default-layout';
import AuthForm from 'forms/auth-form';

import { Seo, Link } from 'components';
import { Button, Col, Row, Typography } from 'antd';
import { geekblue } from '@ant-design/colors';

const { Text, Title } = Typography;

const SignUpPage = () => {
  const history = useHistory();
  const [errors, setErrors] = useState({});

  const { signInWithGitHub, signInWithGoogle } = useAuthRedirect(async (result) => {
    if (result && result.user) {
      if (result.additionalUserInfo.isNewUser) {
        await createPersonalProject({ userID: result.user.uid });
      }

      history.push(dashboardPath());
    }

    // https://firebase.google.com/docs/reference/js/firebase.auth.Auth.html#getredirectresult
    // if (redirectError) {
    // var errorCode = error.code;
    // var errorMessage = error.message;
    // var email = error.email;
    // var credential = error.credential;
    // }
  });

  const signupWithEmail = async ({ email, password }) => {
    try {
      const user = await auth.createUserWithEmailAndPassword(email, password);

      await createPersonalProject({ userID: user.uid });

      // TODO: create firestore user

      // send email verification

      // send them to the home page
      history.push(dashboardPath());
    } catch (error) {
      setErrors();

      // auth/email-already-in-use
      // auth/argument-error
      // auth/invalid-email
      // auth/weak-password


      // setErrors({
      //   form: 'sfdsf',
      //   email: 'sfdsf'
      //   password: 'sfdsf'
      // })
    }
  };

  return (
    <Layout>
      <Seo title={'Signup'}/>

      <Row style={{ marginTop: 50 }} justify={'center'} type={'flex'}>
        <Col>
          <Title>Files</Title>

          <Button
            style={{ backgroundColor: 'black', fontSize: 20, color: 'white' }}
            onClick={signInWithGitHub}
            icon={'github'}
            size={'large'}>

            <Text style={{ color: 'white', fontSize: 14 }}>Continue With Github</Text>
          </Button>

          <Button
            onClick={signInWithGoogle}
            style={{ backgroundColor: geekblue[5], fontSize: 20, color: 'white' }}
            icon={'google'}
            size={'large'}>

            <Text style={{ color: 'white', fontSize: 14 }}>Continue With Google</Text>
          </Button>

          <AuthForm actionText={'Sign Up'} onSubmit={signupWithEmail} externalErrors={errors}/>

          <Link to={'/login'}>Login</Link>
        </Col>
      </Row>
    </Layout>
  );
};

export default SignUpPage;