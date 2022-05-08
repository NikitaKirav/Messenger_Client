/** Absolute imports */
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { createStructuredSelector } from 'reselect';
import classnames from 'classnames';

/** Ant design */
import { Button } from 'antd';

/** Store */
import { getFollowed } from '../../../../../store/profile/actions';
import { ApplicationState } from '../../../../../store';
import { makeGetFollowingInProgress, makeGetUsers } from '../../../../../store/user/selectors';
import { makeGetFollowed } from '../../../../../store/profile/selectors';
import { followRequest, unFollowRequest } from '../../../../../store/user/actions';

/** Types */
import { WriteMessageOrFollowSelectors, WriteMessageOrFollowType } from './types';

/** Styles */
import classes from '../../styles.module.scss';

export const WriteMessageOrFollow: React.FC<WriteMessageOrFollowType> = ({userId}) => {

    const history = useNavigate();
    const dispatch = useDispatch();

    const selectors = createStructuredSelector<
        ApplicationState,
        WriteMessageOrFollowSelectors
        >({
            followed: makeGetFollowed(),
            followingInProgress: makeGetFollowingInProgress(),
            users: makeGetUsers()
        });

    const { followed, followingInProgress, users } = useSelector(selectors);

    useEffect(() => {
        dispatch(getFollowed(userId));
    },[userId, users]);

    const onWriteMessage = () => {
        history(`/chat/${userId}`);
    }

    const follow = (userId: string) => {
        dispatch(followRequest(userId));
    }

    const unfollow = (userId: string) => {
        dispatch(unFollowRequest(userId));
    }

    return (
        <div className={classes.messegeFollowButtons}>
            <Button type="primary" className={classes.button} onClick={onWriteMessage}>Write a message</Button>
            { followed ? 
            <button className={classnames(classes.button, classes.marginLeft)} disabled={followingInProgress.some(id => id === userId)} onClick={() => {
                unfollow(userId);                               
            }}>Unfollow</button> :
            <button className={classnames(classes.button, classes.marginLeft)} disabled={followingInProgress.some(id => id === userId)} onClick={() => {
                follow(userId);  
            }}>Follow</button>} 
        </div>);
}