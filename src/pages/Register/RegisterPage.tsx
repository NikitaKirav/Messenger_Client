/** Absolute imports */
import React from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { createStructuredSelector } from 'reselect';

/** Ant design */
import { Divider } from 'antd';

/** Components */
import { RegisterForm } from './RegisterForm';

/** Styles */
import classes from './styles.module.scss';

/** Store */
import { ApplicationState } from '../../store';
import { makeGetIsAuth } from '../../store/auth/selectors';
import { routeNames } from '../../routes';


interface RegisterPageSelectors {
    isAuth: boolean;
}

export const RegisterPage = () => {

    const navigate = useNavigate();

    const selectors = createStructuredSelector<
        ApplicationState,
        RegisterPageSelectors
    >({
        isAuth: makeGetIsAuth()
    });

    const { isAuth } = useSelector(selectors);

    if(isAuth) {
      navigate(routeNames.myProfile);
    }

    return (
        <div className={classes.loginForm}>
            <h1>Register</h1>    
            <Divider />        
            <RegisterForm />
        </div>
    );
}