/** Absolute imports */
import {useEffect, useState} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { createStructuredSelector } from 'reselect';

/** Ant design */
import { Menu, Dropdown, Avatar, Row, Layout, Button } from 'antd';
import { LeftOutlined, DownOutlined, UserOutlined } from '@ant-design/icons';

/** Routes */
import { routeNames } from '../../routes';

/** Services */
import { StatusType } from '../../services/api-ws';

/** Store */
import { ApplicationState } from '../../store';
import { makeGetStatus, makeGetUserAvatar } from '../../store/chat/selectors';
import { makeGetProfile } from '../../store/profile/selectors';
import { ProfileType } from '../../store/profile/types';
import { UserAvatarType } from '../../store/chat/types';
import { makeGetIsAuth } from '../../store/auth/selectors';
import { getUserAvatar } from '../../store/chat/actions';
import { logoutRequest } from '../../store/auth/actions';

/** Styles */
import classes from './styles.module.scss';
import { baseUrl } from '../../services/baseURL';


interface HeaderSelectors {
    status: StatusType;
    profile: ProfileType | undefined;
    avatars: UserAvatarType | undefined;
    isAuth: boolean;
}

export const Header = () => {
    const [localData, setLocalData] = useState({ userName: '', userId: '' });
    const location = useLocation();
    const history = useNavigate();
    const [avatar, setAvatar] = useState('');

    const dispatch = useDispatch();

    const selectors = createStructuredSelector<
        ApplicationState,
        HeaderSelectors
    >({
        status: makeGetStatus(),
        profile: makeGetProfile(),
        avatars: makeGetUserAvatar(),
        isAuth: makeGetIsAuth()
    });

    const { status, profile, avatars, isAuth } = useSelector(selectors);

    const logoutCallback = () => {
        dispatch(logoutRequest());
        history(routeNames.login);
    }

    useEffect(() => {   
        console.log(status);     
        if ((status === StatusType.READY) && localData && (localData.userId !== '')) {            
            dispatch(getUserAvatar(localData.userId));
        }
    }, [status, profile, location, localData]);

    useEffect(() => {
        console.log(avatars);
        if (localData && localData.userId !== '') {
            if(avatars && avatars.userAvatar) {
                setAvatar(avatars.userAvatar);
            }
        }
    }, [avatars, localData]);

    useEffect(() => {
        setLocalData(localStorage.getItem('userData_Messanger')? JSON.parse(localStorage.getItem('userData_Messanger')??"{value: {userName: 'test', userId: '0'}}"):''); 
    }, [location])

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
        <div className={classes.comeBack}><a href={`/works`} ><div style={{display: 'flex'}}><div style={{fontSize: '13px'}}><LeftOutlined /></div>
                        <span className={classes.comeBackText}>Come back to Works</span></div></a></div>
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
