/** Absolute imports */
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import InfiniteScroll from 'react-infinite-scroller';
import { createStructuredSelector } from 'reselect';

/** Ant design */
import { List, message, Avatar, Spin, Comment } from 'antd';
import { UserOutlined } from '@ant-design/icons';

/** Services */
import { StatusType } from '../../services/api-ws';

/** Store */
import { ApplicationState } from '../../store';
import { makeGetcChatList, makeGetStatus } from '../../store/chat/selectors';
import { LastMessageInChatList } from '../../store/chat/types';
import { getChatList } from '../../store/chat/actions';

/** Styles */
import classes from './styles.module.scss';
import { baseUrl } from '../../services/baseURL';



interface ChatListSelectors {
    status: StatusType;
    chatList: LastMessageInChatList[];
}

export const ChatList = () => {

    const [data, setData] = useState<LastMessageInChatList[]>([]);
    const [isLoading, changeIsLoading] = useState(false);
    const [hasMore, changeHasMore] = useState(true);
    const dispatch = useDispatch();


    const selectors = createStructuredSelector<
        ApplicationState,
        ChatListSelectors
    >({
        status: makeGetStatus(),
        chatList: makeGetcChatList()
    });

    const { status, chatList } = useSelector(selectors);

    
    const handleInfiniteOnLoad = () => {
        changeIsLoading(true);

        if (data.length > 14) {
          message.warning('Infinite List loaded all');
          changeIsLoading(false);
          changeHasMore(false);
          return;
        }
    };

    useEffect(() => {
        if(status === "ready") {
            dispatch(getChatList());
        }
    }, [status]);

    useEffect(() => {
        setData(chatList);
    }, [chatList])


    return (
        <div className={classes.chatList}>
        <div className="demo-infinite-container">
        <InfiniteScroll
          initialLoad={false}
          pageStart={0}
          loadMore={handleInfiniteOnLoad}
          hasMore={!isLoading && hasMore}
          useWindow={false}
        >
            <List
                className="comment-list"
                header={`${data.length} replies`}
                itemLayout="horizontal"
                dataSource={data}
                renderItem={item => (
                <li>
                    <Link to={`/chat/${item.userId}`}>
                    <Comment className={classes.comment}
                    author={item.userId === item.from ? <span className={classes.userName}>{item.fromUserName}</span> : <span className={classes.userName}>{item.toUserName}</span>}
                    avatar={item.userId === item.from ? item.fromPhoto ? <Avatar src={baseUrl + item.fromPhoto} size={64} alt={item.fromUserName}/> : <Avatar size={64} icon={<UserOutlined />} />
                                                      : item.toPhoto ? <Avatar src={baseUrl + item.toPhoto} size={64} alt={item.toUserName}/> : <Avatar size={64} icon={<UserOutlined />} />}
                    content={<div className={classes.messageContext}>
                        {item.fromPhoto ? <Avatar src={baseUrl + item.fromPhoto} /> : <Avatar size={32} icon={<UserOutlined />} />}<div className={classes.contextText}>{item.text}</div>
                    </div>}
                    datetime={<span className={classes.date}>{item.updateDate}</span>}
                    />
                    </Link>
                </li>
                )}
            />
            {isLoading && hasMore && (
              <div className="demo-loading-container">
                <Spin />
              </div>
            )}
        </InfiniteScroll>
      </div>
      </div>
    );
}