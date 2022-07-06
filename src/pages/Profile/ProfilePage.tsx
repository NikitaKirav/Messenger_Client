/** Absolute imports  */
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from 'react-router-dom';
import { createStructuredSelector } from 'reselect';

/** Components */
import { ProfileInfo } from './ProfileInfo/ProfileInfo';

/** Store */
import { ApplicationState } from '../../store';
import { makeGetIsAuth, makeGetUserId } from '../../store/auth/selectors';

import { makeGetProfile, makeGetStatus } from '../../store/profile/selectors';
import { getUserProfile, getStatus } from '../../store/profile/actions';

/** Router */
import { routeNames } from '../../routes';

/** Types */
import { ProfileType } from '../../store/profile/types';
import Preloader from '../../components/Preloader/Preloader';
import { MyPosts } from './MyPosts/MyPosts';



interface ProfilePageSelectors {
    autorizedUserId: string | undefined;
    profile: ProfileType | undefined;
    status: string;
    isAuth: boolean;
}

export const ProfilePage = () => { 

    const params = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const selectors = createStructuredSelector<
        ApplicationState,
        ProfilePageSelectors
    >({
        autorizedUserId: makeGetUserId(),
        profile: makeGetProfile(),
        status: makeGetStatus(),
        isAuth: makeGetIsAuth()
    });

    const { autorizedUserId, profile, status, isAuth } = useSelector(selectors);

    const refreshProfile = () => {
        let userId: string | undefined = params.userId;
        if(!userId && autorizedUserId) {
            userId = autorizedUserId;
            if(!userId) {
                navigate(routeNames.login);
            }
        }
        if (userId) {
            dispatch(getUserProfile(userId));
            dispatch(getStatus(userId));
        }
    }

    useEffect(() => {
        refreshProfile();
        if (autorizedUserId===undefined && params.userId===undefined)
            navigate(routeNames.about);
    },[params.userId, autorizedUserId]);

    if (!profile)
        return <Preloader isBlackStyle={false} />
     
    return (
        <div className='profile'>
            <ProfileInfo profile={profile} isOwner={!params.userId} status={status} isAuth={isAuth} />
            <MyPosts profile={profile} isAuth={isAuth} />
        </div>
    );
}




