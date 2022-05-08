/** Absolute imports */
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useParams } from 'react-router-dom';
import { createStructuredSelector } from 'reselect';

/** Services */
import { StatusType } from '../../services/api-ws';

/** Store */
import { ApplicationState } from '../../store';
import { getMessagesFromUser } from '../../store/chat/actions';
import { makeGetStatus } from '../../store/chat/selectors';
import { Chat } from './components/Chat/Chat';

/** Styles */
import classes from './styles.module.scss';
import './message.css';

interface ChatPageSelectors {
    status: StatusType;
}

export const ChatPage = () => {
    const dispatch = useDispatch();
    const location = useLocation();
    const { userId } = useParams();

    const selectors = createStructuredSelector<
        ApplicationState,
        ChatPageSelectors
    >({
        status: makeGetStatus()
    });

    const { status } = useSelector(selectors);

    useEffect(() => {
        if (status === "ready" && userId) {
            dispatch(getMessagesFromUser(userId));
        }
    }, [location, status]);

    return (  
        <div className={classes.chatPage}>
            {userId &&         
                <Chat userId={userId} status={status} />
            }
        </div>
    );
}