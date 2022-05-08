/** Absolute imports */
import React from 'react';

/** Servises */
import { StatusType } from '../../../../services/api-ws';

/** Styles */
import classes from '../../styles.module.scss';

/** Components */
import { MessangerHead } from '../MessangerHead/MessangerHead';
import { Messages } from '../Messages/Messages';
import { AddMessageForm } from '../AddMessageForm/AddMessageForm';

type PathParamsType = {
    userId: string;
    status: StatusType;
}

export const Chat: React.FC<PathParamsType> = ({userId, status}) => {

    return (
        <div className={classes.contentMesseges}>
            <MessangerHead userId={userId} status={status} />
            <Messages />
            <AddMessageForm userId={userId} status={status} />
        </div>
    );
}