/** Absolute imports */
import React, { createElement, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';

/** Ant design */
import { Comment, Tooltip, Avatar, Menu, Dropdown, Popconfirm  } from 'antd';
import { DislikeOutlined, LikeOutlined, DislikeFilled, LikeFilled, DownOutlined, UserOutlined } from '@ant-design/icons';

/** Store */
import { addLike, deleteActivePost } from '../../../../store/profile/actions';
import { PostType } from '../../../../store/profile/types';

/** Styles */
import classes from './styles.module.scss';
import { baseUrl } from '../../../../services/baseURL';



type PropsType = {
    post: PostType
    userId: string,
    isAuth: boolean;
}

export const Post: React.FC<PropsType> = ({post, userId, isAuth}) => {
    const [likes, setLikes] = useState(post.likes);
    const [dislikes, setDislikes] = useState(post.dislikes);
    const [action, setAction] = useState(post.userLike);
    const dispatch = useDispatch();

    const like = () => {
      if (isAuth) {
        if ((action === 'disliked') || (action === null) || (action === undefined))  {
          setLikes(likes + 1);
          setDislikes(dislikes);
          setAction('liked');
          dispatch(addLike(post.id, true, userId));

          if (action === 'disliked') {
            setDislikes(dislikes - 1);
          }
        }
      }
    };
  
    const dislike = () => {
      if (isAuth) {
        if ((action === 'liked') || (action === null)) {
          setLikes(likes);
          setDislikes(dislikes + 1);
          setAction('disliked');
          dispatch(addLike(post.id, false, userId));

          if (action === 'liked') {
            setLikes(likes - 1);
          }
        }
      }
    };

    const deletePost = () => {
      dispatch(deleteActivePost(post.id, userId));
    }
  
    const actions = [
      <Tooltip key="comment-basic-like" title="Like">
        <span onClick={like} data-testid="like">
          {createElement(action === 'liked' ? LikeFilled : LikeOutlined)}
          <span className="comment-action">{likes}</span>
        </span>
      </Tooltip>,
      <Tooltip key="comment-basic-dislike" title="Dislike">
        <span onClick={dislike} data-testid="dislike">
          {React.createElement(action === 'disliked' ? DislikeFilled : DislikeOutlined)}
          <span className="comment-action">{dislikes}</span>
        </span>
      </Tooltip>
    ];

    const menu = (
      <Menu className={classes.menu}>
        <Menu.Item key="0">
          <Popconfirm title="Are you sure to delete this post?" okText="Yes" onConfirm={deletePost} cancelText="No" placement="topRight">
            <div>Delete</div>
          </Popconfirm>
        </Menu.Item>
      </Menu>
    );

    return (
        <Comment
            actions={actions}
            author={<>
                <Link to={`/profile/${post.userId}`}>
                <span className={classes.userName}>{post.userName}</span>
                </Link>
                <Dropdown overlay={menu} className={classes.postMenu}  placement="bottomRight">
                        <a className="ant-dropdown-link"  onClick={e => e.preventDefault()}>
                            <DownOutlined className={classes.menuIcon} data-testid="postMenu" />
                        </a>
                </Dropdown>
                </>}
            avatar={
            post.avatar ? <Avatar
                className={classes.postAvatar}
                size={64}
                src={baseUrl + post.avatar}
                alt={post.userName}
            />
            : <Avatar size={64} icon={<UserOutlined />} />
            }
            content={post.text}
            datetime={<span>{post.createDate}</span>}
        />       
    );
}

