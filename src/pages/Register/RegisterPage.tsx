/** Absolute imports */
import { useDispatch, useSelector } from 'react-redux';
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
import { registerRequest } from '../../store/auth/actions';


interface RegisterPageSelectors {
    isAuth: boolean;
}

export interface RegisterFormValuesType {
    email: string
    password: string,
    userName: string
}

export const RegisterPage = () => {

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const selectors = createStructuredSelector<
        ApplicationState,
        RegisterPageSelectors
    >({
        isAuth: makeGetIsAuth()
    });

    const { isAuth } = useSelector(selectors);

    const onFinish = (formData: RegisterFormValuesType) => {
        dispatch(registerRequest(formData.email, formData.password, formData.userName));
    };

    const onFinishFailed = (errorInfo: any) => {
    };

    if(isAuth) {
      navigate(routeNames.myProfile);
    }

    return (
        <div className={classes.loginForm}>
            <h1>Register</h1>    
            <Divider />        
            <RegisterForm onFinish={onFinish} onFinishFailed={onFinishFailed} />
        </div>
    );
}