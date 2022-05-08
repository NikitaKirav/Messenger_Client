/** Absolute imports */
import React from 'react';
import { Link } from 'react-router-dom';

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
            <Menu
                className={classes.bottomMenu}
                mode="horizontal"
                defaultSelectedKeys={['1']}
                defaultOpenKeys={['sub1']}
            >
                <Menu.Item key="1"><Link to={routeNames.profile}><UserOutlined className={classes.menuIcon} /></Link></Menu.Item>
                <Menu.Item key="2"><Link to={routeNames.users}><TeamOutlined className={classes.menuIcon} /></Link></Menu.Item>
                <Menu.Item key="3"><Link to={routeNames.chatlist}><MessageOutlined className={classes.menuIcon} /></Link></Menu.Item>
                <Menu.Item key="4"><Link to={routeNames.about}><QuestionCircleOutlined className={classes.menuIcon} /></Link></Menu.Item>
            </Menu>
        </div>
        </>
    );
}