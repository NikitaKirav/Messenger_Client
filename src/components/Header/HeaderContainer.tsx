/** Absolute imports */
import {useEffect, useState} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate, useLocation } from 'react-router-dom';
import { createStructuredSelector } from 'reselect';

/** Routes */
import { routeNames } from '../../routes';

/** Services */
import { StatusType } from '../../services/api-ws';

/** Store */
import { ApplicationState } from '../../store';
import { makeGetStatus, makeGetUserAvatar } from '../../store/chat/selectors';
import { makeGetProfile } from '../../store/profile/selectors';
import { ProfileType } from '../../store/profile/types';
import { UserAvatarType } from '../../store/chat/types';
import { makeGetIsAuth } from '../../store/auth/selectors';
import { getUserAvatar } from '../../store/chat/actions';
import { logoutRequest } from '../../store/auth/actions';

/** Components */
import { Header } from './Header';


interface HeaderSelectors {
    status: StatusType;
    profile: ProfileType | undefined;
    avatars: UserAvatarType | undefined;
    isAuth: boolean;
}

export const HeaderContainer = () => {
    const [localData, setLocalData] = useState({ userName: '', userId: '' });
    const location = useLocation();
    const history = useNavigate();
    const [avatar, setAvatar] = useState('');

    const dispatch = useDispatch();

    const selectors = createStructuredSelector<
        ApplicationState,
        HeaderSelectors
    >({
        status: makeGetStatus(),
        profile: makeGetProfile(),
        avatars: makeGetUserAvatar(),
        isAuth: makeGetIsAuth()
    });

    const { status, profile, avatars, isAuth } = useSelector(selectors);

    const logoutCallback = () => {
        dispatch(logoutRequest());
        history(routeNames.login);
    }

    useEffect(() => {   
        if ((status === StatusType.READY) && localData && (localData.userId !== '')) {            
            dispatch(getUserAvatar(localData.userId));
        }
    }, [status, profile, location, localData]);

    useEffect(() => {
        if (localData && localData.userId !== '') {
            if(avatars && avatars.userAvatar) {
                setAvatar(avatars.userAvatar);
            }
        }
    }, [avatars, localData]);

    useEffect(() => {
        setLocalData(localStorage.getItem('userData_Messanger')? JSON.parse(localStorage.getItem('userData_Messanger')??"{value: {userName: 'test', userId: '0'}}"):''); 
    }, [location])

    return (
        <Header logoutCallback={logoutCallback}
                isAuth={isAuth}
                localData={localData}
                avatar={avatar} />        
    );
}
