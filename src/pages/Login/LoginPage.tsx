/** Absolute imports */
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { createStructuredSelector } from 'reselect';

/** Ant design */
import { Divider } from 'antd';

/** Components */
import { LoginForm } from './LoginForm';

/** Store */
import { loginRequest } from '../../store/auth/actions';
import { ApplicationState } from '../../store';
import { makeGetIsAuth } from '../../store/auth/selectors';

/** Styles */
import classes from './LoginPage.module.scss';
import { routeNames } from '../../routes';


export type LoginFormValuesType = {
    email: string
    password: string
    rememberMe: boolean
}

interface LoginPageSelectors {
    isAuth: boolean;
}

export const LoginPage = () => { 

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const selectors = createStructuredSelector<
        ApplicationState,
        LoginPageSelectors
    >({
        isAuth: makeGetIsAuth()
    });

    const { isAuth } = useSelector(selectors);

    const onFinish = (formData: LoginFormValuesType) => {
        dispatch(loginRequest(formData.email, formData.password));
    };

    const onFinishFailed = (errorInfo: any) => {

    };

    if(isAuth) {
      navigate(routeNames.myProfile)
    }
    return <div className={classes.loginForm}>  
        <h1>Login</h1>   
        <Divider />
        <LoginForm onFinish={onFinish} onFinishFailed={onFinishFailed}  />
    </div>
}