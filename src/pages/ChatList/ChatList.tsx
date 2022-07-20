/** Absolute imports */
import React from 'react';
import { Link } from 'react-router-dom';
import InfiniteScroll from 'react-infinite-scroller';

/** Ant design */
import { List, Avatar, Spin, Comment } from 'antd';
import { UserOutlined } from '@ant-design/icons';

/** Store */
import { LastMessageInChatList } from '../../store/chat/types';

/** Styles */
import classes from './styles.module.scss';
import { baseUrl } from '../../services/baseURL';


interface ChatListProps {
    handleInfiniteOnLoad: () => void;
    isLoading: boolean;
    hasMore: boolean;
    data: LastMessageInChatList[];
}

export const ChatList: React.FC<ChatListProps> = ({
    handleInfiniteOnLoad,
    isLoading,
    hasMore,
    data
}) => {

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
                header={`${data ? data.length : 0} replies`}
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