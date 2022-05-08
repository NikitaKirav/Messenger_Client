/** Absolute imports */
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { reduxForm } from 'redux-form';
import { createStructuredSelector } from 'reselect';

/** Ant design */
import { Form, Input, Button, Alert } from 'antd';

/** Store */
import { registerRequest } from '../../store/auth/actions';
import { ApplicationState } from '../../store';
import { makeGetError, makeGetRegisterSuccess } from '../../store/auth/selectors';


interface RegisterFormValuesType {
    email: string
    password: string,
    userName: string
}

interface RegisterSelectors {
    registerSuccess: boolean;
    error: string | undefined;
}

const Register: React.FC = () => {

    const dispatch = useDispatch();

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

    const onFinish = (formData: RegisterFormValuesType) => {
        dispatch(registerRequest(formData.email, formData.password, formData.userName));
    };

    const onFinishFailed = (errorInfo: any) => {
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
          <Input />
        </Form.Item>

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
  
        <Form.Item {...tailLayout}>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
        </div>}
      </Form>
    );
}

export const RegisterForm = reduxForm<RegisterFormValuesType>({
    form: 'registerMessanger'
})(Register);

