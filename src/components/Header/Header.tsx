/** Absolute imports */
import { Link } from 'react-router-dom';

/** Ant design */
import { Menu, Dropdown, Avatar, Row, Layout, Button } from 'antd';
import { LeftOutlined, DownOutlined, UserOutlined } from '@ant-design/icons';

/** Routes */
import { routeNames } from '../../routes';

/** Styles */
import classes from './styles.module.scss';
import { baseUrl } from '../../services/baseURL';


interface HeaderProps {
    logoutCallback: () => void,
    isAuth: boolean,
    localData: {
        userName: string;
        userId: string;
    },
    avatar: string
}

export const Header: React.FC<HeaderProps> = ({
    logoutCallback,
    isAuth,
    localData,
    avatar
}) => {

    const menu = (
        <Menu className={classes.menu}>
          <Menu.Item key="0">
            <Link to={routeNames.about}>About this project</Link>
          </Menu.Item>
          <Menu.Item key="1">
            <div onClick={logoutCallback}>Log out</div>
          </Menu.Item>
          <Menu.Divider />
          <Menu.Item key="3" disabled>
            © NikitaKirav
          </Menu.Item>
        </Menu>
      );

    const { Header } = Layout;

    return (
        <Header className={classes.header}>
        <div className={classes.comeBack}>
            <a href={`/works`} >
                <div className={classes.navigateComeBack} style={{display: 'flex'}}>
                        <div style={{fontSize: '13px'}}><LeftOutlined /></div>
                        <span className={classes.comeBackText}>Come back to Works</span>
                </div>
            </a></div>
        <div className="logo" />
        <Row className={classes.headerRow}>
            { isAuth
                ? <>
                <div className={classes.headerDropdown}>
                <Dropdown overlay={menu} className={classes.headerMenu} placement="bottomRight">
                    <a className="ant-dropdown-link" onClick={e => e.preventDefault()}>
                        <span className={classes.userName}>{localData && localData.userName}</span>
                        {avatar ? <Avatar style={{ margin: '10px' }} src={baseUrl + avatar} /> : <Avatar size={32} style={{ margin: '10px' }} icon={<UserOutlined />} /> }
                        <DownOutlined className={classes.menuIcon} />
                    </a>
                </Dropdown>
                </div>
                    </> 
                : <div className={classes.headerDropdown}>
                        <div className={classes.loginRegister}>
                            <div>
                                <Button>
                                    <Link to={routeNames.login}>Login</Link>
                                </Button>
                            </div>
                            <div style={{marginLeft: '10px'}}>
                                <Button>
                                    <Link to={routeNames.register}>Register</Link>
                                </Button>
                            </div>
                        </div>
                    </div>    
            }
        </Row>            
        </Header>           
    );
}
