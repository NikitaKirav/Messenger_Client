/** Absolute imports */
import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { createStructuredSelector } from 'reselect';

/** Styles */
import classes from './styles.module.scss';

/** Ant design */
import { List, Avatar, Button, Divider } from 'antd';
import { UserOutlined } from '@ant-design/icons';

/** Store */
import { ApplicationState } from '../../store';
import { makeGetCurrentPage, makeGetFilter, makeGetFollowingInProgress, makeGetPageSize, makeGetUsers } from '../../store/user/selectors';
import { FilterType, UserType } from '../../store/user/types';
import { makeGetIsAuth } from '../../store/auth/selectors';
import { followRequest, getUsersRequest, unFollowRequest } from '../../store/user/actions';
import { baseUrl } from '../../services/baseURL';
import { routeNames } from '../../routes';


const count = 3;
const fakeDataUrl = `https://randomuser.me/api/?results=${count}&inc=name,gender,email,nat&noinfo`;

interface UsersSelectors {
    currentPage: number;
    pageSize: number;
    filter: FilterType;
    users: UserType[];
    followingInProgress: string[];
    isAuth: boolean;
}

export const UsersPage = () => {

    const selectors = createStructuredSelector<
        ApplicationState,
        UsersSelectors
    >({
        currentPage: makeGetCurrentPage(),
        pageSize: makeGetPageSize(),
        filter: makeGetFilter(),
        users: makeGetUsers(),
        followingInProgress: makeGetFollowingInProgress(),
        isAuth: makeGetIsAuth()
    });

    const { currentPage, pageSize, filter, users, followingInProgress, isAuth } = useSelector(selectors);

    const [initLoading, setInitLoading] = useState(true);
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState<UserType[]>([]);
    const [list, setList] = useState<UserType[]>([]);
 
    const dispatch = useDispatch();
    const history = useNavigate();

    type QueryParamsType = { term?: string; page?: string; friend?: string }
    const [searchParams, setSearchParams] = useSearchParams();

    useEffect(() => {

        let actualPage= currentPage;
        let actualFilter = filter;
        if(!!searchParams.get('page')) actualPage = Number(searchParams.get('page'));
        if(!!searchParams.get('term')) actualFilter = { ...actualFilter, term: searchParams.get('term') as string};

        switch(searchParams.get('friend')) {
            case "null": 
                actualFilter = {...actualFilter, friend: null}
                break;
            case "true":
                actualFilter = {...actualFilter, friend: true}
                break;
            case "false":
                actualFilter = {...actualFilter, friend: false}
                break;
        }
        dispatch(getUsersRequest(currentPage, pageSize, filter));
    }, []);

    useEffect(() => {
        setInitLoading(false);
        setData(users);
        setList(users);
    }, [users]);


    const onLoadMore = () => {
        setLoading(true);
        //setList(data.concat([...new Array(count)].map(() => ({ loading: true, name: {} }))));
    };

    
    useEffect(() => {
        const query: QueryParamsType = {};
        if(!!filter.term) query.term = filter.term;
        if(filter.friend !== null) query.friend = String(filter.friend);
        if(currentPage !== 1) query.page = String(currentPage);
        history(routeNames.users + new URLSearchParams([...Object.entries(query)]).toString());

    }, [filter, currentPage])

    const onPageChanged = (pageNumber: number) => {
        dispatch(getUsersRequest(pageNumber, pageSize, filter));
    }
    
    const onFilterChanged = (filter: FilterType) => {
        dispatch(getUsersRequest(1, pageSize, filter));
    }

    const follow = (userId: string) => {
        dispatch(followRequest(userId));
    }

    const unfollow = (userId: string) => {
        dispatch(unFollowRequest(userId));
    }

    const loadMore =
      !initLoading && !loading ? (
        <div
          style={{
            textAlign: 'center',
            marginTop: 12,
            height: 32,
            lineHeight: '32px',
          }}
        >
          <Button onClick={onLoadMore}>loading more</Button>
        </div>
      ) : null;


    return (
        <div className={classes.usersList}>
            {/*<UsersSearchForm onFilterChanged={onFilterChanged} filter={filter} />*/}
            <Divider className={classes.dividerUser} plain>Users</Divider>
            {/*<Paginator currentPage={currentPage} onPageChanged={onPageChanged} totalItemsCount={totalUsersCount} pageSize={pageSize} />*/}
            <List
                className="demo-loadmore-list"
                loading={initLoading}
                itemLayout="horizontal"
                //loadMore={loadMore}
                dataSource={list}
                renderItem={item => (
                <List.Item>
                    {/*<Skeleton avatar title={false} loading={item.loading} active>*/}
                        <List.Item.Meta
                            avatar={
                                <Link to={`/profile/${item.id}`}>
                                    {item.photos.small ? <Avatar size={64} src={baseUrl + item.photos.small} /> : <Avatar size={64} icon={<UserOutlined />} /> }
                                </Link>
                            }
                            title={<Link to={`/profile/${item.id}`}>{item.name}</Link>}
                            description={isAuth && <div>
                                { item.followed ? 
                                <button className={classes.followButton} disabled={followingInProgress.some(id => id === item.id)} onClick={() => {
                                    unfollow(item.id);                               
                                }}>Unfollow</button> :
                                <button className={classes.followButton}  disabled={followingInProgress.some(id => id === item.id)} onClick={() => {
                                    follow(item.id);  
                                }}>Follow</button>}                                
                            </div>}
                        />
                   {/* </Skeleton>*/}
                </List.Item>
                 )}
                 />
        </div>
    );
}

