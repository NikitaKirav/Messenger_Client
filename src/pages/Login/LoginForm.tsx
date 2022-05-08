/** Absolute imports */
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { reduxForm } from 'redux-form';

/** Ant design */
import { Form, Input, Button, Alert, Checkbox } from 'antd';

/** Components */
import { LoginFormValuesType } from './LoginPage';

/** Store */
import { loginRequest } from '../../store/auth/actions';
import { ApplicationState } from '../../store';
import { makeGetError } from '../../store/auth/selectors';


interface LoginSelectors {
    error: string | undefined;
}

const Login = () => {
    
    const dispatch = useDispatch();

    const selectors = createStructuredSelector<
        ApplicationState,
        LoginSelectors
    >({
        error: makeGetError()
    });

    const { error } = useSelector(selectors);
    
    const layout = {
        labelCol: { span: 8 },
        wrapperCol: { span: 16 },
      };
    const tailLayout = {
        wrapperCol: { offset: 8, span: 16 },
      };

    const onFinish = (formData: LoginFormValuesType) => {
        console.log('Success:', formData);
        dispatch(loginRequest(formData.email, formData.password));
    };

    const onFinishFailed = (errorInfo: any) => {
        console.log('Failed:', errorInfo);
    };

    return (
        <Form
        {...layout}
        name="basic"
        initialValues={{ remember: true }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
      >
        {error && 
            <Alert
                message={error}
                type="error"
                showIcon
            />
        }
        <div style={{marginTop: '20px'}}>
        <Form.Item
          label="Email"
          name="email"
          rules={[{ required: true, message: 'Please input your email!' }]}
        >
          <Input />
        </Form.Item>
  
        <Form.Item
          label="Password"
          name="password"
          rules={[{ required: true, message: 'Please input your password!' }]}
        >
          <Input.Password />
        </Form.Item>
  
        <Form.Item {...tailLayout} name="remember" valuePropName="checked">
          <Checkbox>Remember me</Checkbox>
        </Form.Item>
  
        <Form.Item {...tailLayout}>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
        </div>
      </Form>
    );
}

export const LoginForm = reduxForm<LoginFormValuesType>({
    form: 'login'
})(Login);