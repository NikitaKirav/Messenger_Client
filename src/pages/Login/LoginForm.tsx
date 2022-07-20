/** Absolute imports */
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { createStructuredSelector } from 'reselect';

/** Ant design */
import { Form, Input, Button, Alert, Checkbox } from 'antd';

/** Components */
import { LoginFormValuesType } from './LoginPage';

/** Store */
import { ApplicationState } from '../../store';
import { makeGetError } from '../../store/auth/selectors';


interface LoginSelectors {
    error: string | undefined;
}

interface LoginProps {
  onFinish: (formData: LoginFormValuesType) => void;
  onFinishFailed: (errorInfo: any) => void;
}

export const LoginForm: React.FC<LoginProps> = ({onFinish, onFinishFailed}) => {

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

    return (
        <Form
        {...layout}
        name="basic"
        data-testid="form"
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
          <Input data-testid="email" />
        </Form.Item>
  
        <Form.Item
          label="Password"
          name="password"
          rules={[{ required: true, message: 'Please input your password!' }]}
        >
          <Input.Password data-testid="password" />
        </Form.Item>
  
        <Form.Item {...tailLayout} name="remember" valuePropName="checked">
          <Checkbox data-testid="rememberme">Remember me</Checkbox>
        </Form.Item>
  
        <Form.Item {...tailLayout}>
          <Button type="primary" data-testid="submit" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
        </div>
      </Form>
    );
}
