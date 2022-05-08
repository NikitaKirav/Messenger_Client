/** Absolute imports */
import React from 'react';

/** Style */
import classes from './styles.module.scss';

type PropsType = {
    message: string
}

export const Message: React.FC<PropsType> = ({ message }) => {
    return (
        <div className={classes.message}>
            {message}
        </div>
    );
}