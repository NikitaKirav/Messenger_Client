/** Absolute imports */
import React from 'react';
import { Link } from 'react-router-dom';

/** Ant Design */
import Sider from 'antd/lib/layout/Sider';
import { Menu } from 'antd';
import { UserOutlined, MessageOutlined, TeamOutlined, QuestionCircleOutlined } from '@ant-design/icons';

/** Route */
import { routeNames } from '../../routes';

interface PropsType {
    className: string | undefined;
}

export const LeftMenu: React.FC<PropsType> = ({className}) => {
    return (
        <Sider className={className} width={150} style={{ background: 'none' }}>
            <Menu
                mode="inline"
                defaultSelectedKeys={['1']}
                defaultOpenKeys={['sub1']}
                style={{ height: '100%', background: 'none' }}
            >
                <Menu.Item key="1"><Link to={routeNames.myProfile}><UserOutlined />Profile</Link></Menu.Item>
                <Menu.Item key="2"><Link to={routeNames.users}><TeamOutlined />Users</Link></Menu.Item>
                <Menu.Item key="3"><Link to={routeNames.chatlist}><MessageOutlined />Chat</Link></Menu.Item>
                <Menu.Item key="4"><Link to={routeNames.about}><QuestionCircleOutlined />About</Link></Menu.Item>
            </Menu>
        </Sider>
    );
}