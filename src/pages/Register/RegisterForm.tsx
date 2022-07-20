/** Absolute imports */
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { reduxForm } from 'redux-form';
import { createStructuredSelector } from 'reselect';

/** Ant design */
import { Form, Input, Button, Alert } from 'antd';

/** Store */
import { ApplicationState } from '../../store';
import { makeGetError, makeGetRegisterSuccess } from '../../store/auth/selectors';

/** Types */
import { RegisterFormValuesType } from './RegisterPage';


interface RegisterSelectors {
    registerSuccess: boolean;
    error: string | undefined;
}

interface RegisterFormProps {
  onFinish: (formData: RegisterFormValuesType) => void;
  onFinishFailed: (errorInfo: any) => void;
}

export const RegisterForm: React.FC<RegisterFormProps> = ({onFinish, onFinishFailed}) => {

    const selectors = createStructuredSelector<
        ApplicationState,
        RegisterSelectors
    >({
        registerSuccess: makeGetRegisterSuccess(),
        error: makeGetError()
    });

    const { registerSuccess, error } = useSelector(selectors);
    
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
        initialValues={{ remember: true }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
      >
        {registerSuccess && 
            <Alert
            message="Success"
            description="Thanks for registration. User was added! Now you can login using your email and password."
            type="success"
            showIcon
          />
        }
        {error && 
            <Alert
                message={error}
                type="error"
                showIcon
            />
        }
        {!registerSuccess && 
        <div style={{marginTop: '20px'}}>
        <Form.Item
          label="Name"
          name="userName"
          rules={[{ required: true, message: 'Please input your name!' }]}
        >
          <Input data-testid="userName" />
        </Form.Item>

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
  
        <Form.Item {...tailLayout}>
          <Button type="primary" htmlType="submit" data-testid="submit">
            Submit
          </Button>
        </Form.Item>
        </div>}
      </Form>
    );
}


