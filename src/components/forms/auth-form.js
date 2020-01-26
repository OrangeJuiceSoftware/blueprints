import React from 'react';
import { Form, Icon, Input, Button } from 'antd';

const emailRegex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

const NormalLoginForm = ({ form, onSubmit, actionText, externalErrors = {} }) => {
  const { getFieldDecorator } = form;

  const handleSubmit = e => {
    e.preventDefault();

    form.validateFields((err, values) => {
      if (!err) {
        return onSubmit(values);
      }
    });
  };

  return(
    <Form onSubmit={handleSubmit} className="login-form">
      <Form.Item {...externalErrors.form && {
        help: externalErrors.form,
        validateStatus: 'error'
      }}/>

      <Form.Item {...externalErrors.email && {
        help: externalErrors.email,
        validateStatus: 'error'
      }}>

        {getFieldDecorator('email', {
          rules: [
            { required: true, message: 'Please input your email!' },
            { pattern: emailRegex, message: 'Please enter a valid email' }
          ],
          validateTrigger: 'onSubmit'
        })(
          <Input
            prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
            placeholder="Email"
          />
        )}
      </Form.Item>

      <Form.Item>
        {getFieldDecorator('password', {
          rules: [{ required: true, message: 'Please input your Password!' }]
        })(
          <Input
            prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
            type="password"
            placeholder="Password"
          />
        )}
      </Form.Item>

      <Form.Item>
        <p className="login-form-forgot">
          Forgot password
        </p>

        <Button style={{ width: '100%' }} type="primary" htmlType="submit" className="login-form-button">
          {actionText}
        </Button>

      </Form.Item>
    </Form>
  );
};

const WrappedNormalLoginForm = Form.create({ name: 'normal_login' })(NormalLoginForm);

export default WrappedNormalLoginForm;