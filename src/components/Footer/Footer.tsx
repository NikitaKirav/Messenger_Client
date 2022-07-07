/** Absolute imports */
import React from 'react';
import { NavLink } from 'react-router-dom';
import classNames from 'classnames';

/** Ant design */
import { Layout, Menu } from 'antd';
import { UserOutlined, MessageOutlined, TeamOutlined, QuestionCircleOutlined } from '@ant-design/icons';

/** Style */
import classes from './styles.module.scss';
import { routeNames } from '../../routes';


const { Footer: FooterAntd } = Layout;

interface PropsType {
    footerLongStyle?: string | undefined;
    footerShortStyle?: string | undefined;
}

export const Footer: React.FC<PropsType> = ({ footerLongStyle = classes.footerLong, footerShortStyle = classes.footerShort }) => {

    return (
        <>
        <FooterAntd className={footerLongStyle} style={{ textAlign: 'center', marginTop: 'auto' }}>NKMessanger ©{new Date().getFullYear()} Created by Nikita Kirav</FooterAntd>
        <div className={footerShortStyle} style={{ textAlign: 'center', marginTop: 'auto' }}>
            <ul className={classNames(classes.bottomMenu, classes.menu_nav)}>
                <li className={classes.menu_item}>
                    <NavLink to={routeNames.myProfile} className={({isActive}) => isActive ? classNames(classes.active,classes.menu_link) : classes.menu_link}>
                        <UserOutlined className={classes.menuIcon} />
                    </NavLink>
                </li>
                <li className={classes.menu_item}>
                    <NavLink to={routeNames.users} className={({isActive}) => isActive ? classNames(classes.active,classes.menu_link) : classes.menu_link}>
                        <TeamOutlined className={classes.menuIcon} />
                    </NavLink>
                </li>
                <li className={classes.menu_item}>
                    <NavLink to={routeNames.chatlist} className={({isActive}) => isActive ? classNames(classes.active,classes.menu_link) : classes.menu_link}>
                        <MessageOutlined className={classes.menuIcon} />
                    </NavLink>
                </li>
                <li className={classes.menu_item}>
                    <NavLink to={routeNames.about} className={({isActive}) => isActive ? classNames(classes.active,classes.menu_link) : classes.menu_link}>
                        <QuestionCircleOutlined className={classes.menuIcon} />
                    </NavLink>
                </li>
            </ul>
        </div>
        </>
    );
}