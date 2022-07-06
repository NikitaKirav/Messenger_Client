/** Absolute imports */
import React from 'react';
import { NavLink } from 'react-router-dom';
import classNames from 'classnames';

/** Ant Design */
import Sider from 'antd/lib/layout/Sider';
import { Menu } from 'antd';
import { UserOutlined, MessageOutlined, TeamOutlined, QuestionCircleOutlined } from '@ant-design/icons';

/** Route */
import { routeNames } from '../../routes';

/** Styles */
import classes from './styles.module.scss';


interface PropsType {
    className?: string | undefined;
}

export const LeftMenu: React.FC<PropsType> = ({className}) => {
    return (
        <Sider className={className} width={150} style={{ background: 'none' }}>
            <ul className={classes.menu_nav}>
                <li className={classes.menu_item}>
                    <NavLink to={routeNames.myProfile} className={({isActive}) => isActive ? classNames(classes.active,classes.menu_link) : classes.menu_link}>
                        <UserOutlined />Profile
                    </NavLink>
                </li>
                <li className={classes.menu_item}>
                    <NavLink to={routeNames.users} className={({isActive}) => isActive ? classNames(classes.active,classes.menu_link) : classes.menu_link}>
                        <TeamOutlined />Users
                    </NavLink>
                </li>
                <li className={classes.menu_item}>
                    <NavLink to={routeNames.chatlist} className={({isActive}) => isActive ? classNames(classes.active,classes.menu_link) : classes.menu_link}>
                        <MessageOutlined />Chat
                    </NavLink>
                </li>
                <li className={classes.menu_item}>
                    <NavLink to={routeNames.about} className={({isActive}) => isActive ? classNames(classes.active,classes.menu_link) : classes.menu_link}>
                        <QuestionCircleOutlined />About
                    </NavLink>
                </li>
            </ul>
        </Sider>
    );
}