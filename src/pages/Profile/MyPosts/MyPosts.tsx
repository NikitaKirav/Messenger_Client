/** Absolute imports */
import React, { useEffect } from 'react';
import { reset } from 'redux-form';
import { createStructuredSelector } from 'reselect';
import { useDispatch, useSelector } from 'react-redux';

/** Components */
import { Post } from './Post/Post';
import AddPostForm from './AddPostForm/AddPostForm';

/** Store */
import { getPosts, addPostRequest } from '../../../store/profile/actions';
import { setPosts, setUserProfile } from '../../../store/profile/actions';
import { ApplicationState } from '../../../store';
import { makeGetPosts } from '../../../store/profile/selectors';
import { PostType, ProfileType } from '../../../store/profile/types';

/** Styles */
import classes from './styles.module.scss';

/** Types */
import { AddPostFormValuesType } from './AddPostForm/AddPostForm';


export type PropsType = {
    profile: ProfileType;
    isAuth: boolean;
}

export interface MyPostsSelectors {
    posts: PostType[];
}

export const MyPosts: React.FC<PropsType> = ({profile, isAuth}) => {

    const dispatch = useDispatch();

    const selectors = createStructuredSelector<
        ApplicationState,
        MyPostsSelectors
    >({
        posts: makeGetPosts()
    });

    const { posts } = useSelector(selectors);
 
    let onAddPost = (formData: AddPostFormValuesType) => {
        if (formData.newPostText) {
            dispatch(addPostRequest(formData.newPostText, profile.id));
            dispatch(reset("profile-add-post"));
        }
    }

    useEffect(() => {
        return () => {
            dispatch(setPosts([]));
            dispatch(setUserProfile(undefined));
        }
    },[]);


    useEffect(() => {
        if(profile && profile.userId) {
            dispatch(getPosts(profile.userId));   
      
        }   
    }, [profile]);

    return (    
        <div className={classes.postsBlock}>
            {isAuth && <AddPostForm onSubmit={onAddPost} />}
            <div className={classes.posts}>
                {posts.length > 0 && [...posts].reverse().map(p => <Post key={p.id} isAuth={isAuth} post={p} userId={profile ? profile.userId : ''} />)}
            </div>
        </div>
    );
}
