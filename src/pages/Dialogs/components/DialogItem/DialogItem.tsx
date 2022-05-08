/** Absolute imports */
import React from 'react';
import { NavLink } from 'react-router-dom';

/** Style */
import classes from './styles.module.scss';


type PropsType = {
    id: number
    name: string
}

export const DialogItem: React.FC<PropsType> = ({ id, name }) => {
    return (
        <div className={classes.dialog}>                
            <NavLink to={`/dialogs/${id}`}>
                <img src='https://yt3.ggpht.com/a/AATXAJwCs3rfMLFb5gC4LKzOGXci5w284N2JIH0-8A=s900-c-k-c0xffffffff-no-rj-mo'/>
                {name}                    
            </NavLink>
        </div>
    );
}
