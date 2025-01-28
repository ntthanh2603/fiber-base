import React, { useEffect, useState } from 'react';
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Form, Input, message } from 'antd';
import axios from 'axios';
import Link from 'next/link';
import '../styles/Login.css';


const Login = () => {
  const [form] = Form.useForm();
  const [clientReady, setClientReady] = useState(false);

  useEffect(() => {
    setClientReady(true);
  }, []);

  const onFinish = async (values: { email: string; password: string }) => {
    try {
      const response = await axios.post('http://localhost:3000/auth/login', {
        email: values.email,
        password: values.password,
      });
      message.success('Login successful!');
      console.log('Login response:', response.data);
      
      // Redirect to home page or another page
    } catch (error) {
      message.error('Login failed. Please check your credentials and try again.');
      console.error('Login error:', error);
    }
  };

  return (
    <div className="login-container">
      <Form form={form} name="login_form" layout="vertical" onFinish={onFinish}>
        <Form.Item
          name="email"
          rules={[
            {
              required: true,
              message: 'Please input your email!',
            },
          ]}
        >
          <Input prefix={<UserOutlined />} placeholder="Email" />
        </Form.Item>
        <Form.Item
          name="password"
          rules={[
            {
              required: true,
              message: 'Please input your password!',
            },
          ]}
        >
          <Input prefix={<LockOutlined />} type="password" placeholder="Password" />
        </Form.Item>
        <Form.Item shouldUpdate>
          {() => (
            <Button
              type="primary"
              htmlType="submit"
              disabled={
                !clientReady ||
                !form.isFieldsTouched(true) ||
                !!form.getFieldsError().filter(({ errors }) => errors.length).length
              }
            >
              Log in
            </Button>
          )}
        </Form.Item>
        <Form.Item>
          <Link href="/register">Register now!</Link>
        </Form.Item>
      </Form>
    </div>
  );
};

export default Login;