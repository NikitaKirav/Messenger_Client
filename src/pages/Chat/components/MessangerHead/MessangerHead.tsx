/** Absolute imports */
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { Link } from 'react-router-dom';

/** Ant design */
import { UserOutlined } from '@ant-design/icons';
import { Avatar } from 'antd';

/** Services */
import { StatusType } from '../../../../services/api-ws';

/** Store */
import { getUserAvatar } from '../../../../store/chat/actions';
import { makeGetUsersAvatarsFriends } from '../../../../store/chat/selectors';
import { ApplicationState } from '../../../../store';
import { UserAvatarType } from '../../../../store/chat/types';

/** Styles */
import classes from '../../styles.module.scss';
import { baseUrl } from '../../../../services/baseURL';


type PathParamsType = {
    userId: string;
    status: StatusType;
}

interface MessangerHeadSelectors {
    avatars: UserAvatarType[];
}

export const MessangerHead: React.FC<PathParamsType> = ({ userId, status }) => {
    const [avatar, setAvatar] = useState('');
    const [userName, setUserName] = useState('');
    const dispatch = useDispatch();

    const selectors = createStructuredSelector<
        ApplicationState,
        MessangerHeadSelectors
    >({
        avatars: makeGetUsersAvatarsFriends()
    });

    const { avatars } = useSelector(selectors);

    useEffect(() => {
        if (status === 'ready') {
            dispatch(getUserAvatar(userId));
        }
    }, [status]);

    useEffect(() => {
        if (avatars && avatars.length > 0) {
            const user = avatars.find(ava => ava.userId === userId);
            if(user) {
                setAvatar(user.userAvatar);
                setUserName(user.userName);
            }
        }
    }, [avatars]);

    return (
        <div>
            <Link className={classes.addressee} to={`/profile/${userId}`}>
                {avatar ? <Avatar src={baseUrl + avatar} />
                        : <Avatar size={32} icon={<UserOutlined />} />}
                <div className={classes.friendName}>{userName}</div>
            </Link>
        </div>
    );
}