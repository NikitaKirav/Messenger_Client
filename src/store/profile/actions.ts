import { PhotosType } from "../types";
import { 
    AddLike,
    AddPhoto,
    AddPost,
    AddPostRequest,
    ADD_LIKE,
    ADD_PHOTO,
    ADD_POST,
    ADD_POST_REQUEST,
    ChangeFollowed,
    CHANGE_FOLLOWED,
    DeleteActivePost,
    DELETE_ACTIVE_POST,
    GetFollowed,
    GetPosts,
    GetStatus,
    GetUserProfile,
    GET_FOLLOWED,
    GET_POSTS,
    GET_STATUS,
    GET_USER_PROFILE,
    SavePhoto,
    SavePhotoSuccess,
    SaveProfile,
    SAVE_PHOTO,
    SAVE_PHOTO_SUCCESS,
    SAVE_PROFILE,
    SetError,
    SetPosts,
    SetProfileWasSaved,
    SetStatus, 
    SetUserProfile, 
    SET_ERROR, 
    SET_POSTS, 
    SET_PROFILE_WAS_SAVED, 
    SET_STATUS, 
    SET_USER_PROFILE,
    UpdateStatus,
    UPDATE_STATUS
} from "./actionTypes";
import { PostType, ProfileType } from "./types";

export const setProfileWasSaved = (profileWasSaved: boolean): SetProfileWasSaved => ({
    type: SET_PROFILE_WAS_SAVED,
    payload: {
        profileWasSaved
    }
});

export const getFollowed = (userId: string): GetFollowed => ({
    type: GET_FOLLOWED,
    payload: {
        userId
    } 
});

export const addLike = (postId: string, like: boolean, userId: string): AddLike => ({
    type: ADD_LIKE,
    payload: {
        postId,
        like,
        userId
    } 
});

export const addPostRequest = (text: string, profileId: string): AddPostRequest => ({
    type: ADD_POST_REQUEST,
    payload: {
        text,
        profileId
    }
});

export const deleteActivePost = (postId: string, userId: string): DeleteActivePost => ({
    type: DELETE_ACTIVE_POST,
    payload: {
        postId,
        userId
    }
});

export const getPosts = (userId: string): GetPosts => ({
    type: GET_POSTS,
    payload: {
        userId
    }
});

export const saveProfile = (profile: ProfileType): SaveProfile => ({
    type: SAVE_PROFILE,
    payload: {
        profile
    }
});

export const savePhoto = (file: File): SavePhoto => ({
    type: SAVE_PHOTO,
    payload: {
        file
    }
});

export const updateStatus = (status: string): UpdateStatus => ({
    type: UPDATE_STATUS,
    payload: {
        status
    }
});

export const getStatus = (userId: string): GetStatus => ({
    type: GET_STATUS,
    payload: {
        userId
    }
});

export const getUserProfile = (userId: string): GetUserProfile => ({
    type: GET_USER_PROFILE,
    payload: {
        userId
    }
});

export const setStatus = (status: string): SetStatus => ({
    type: SET_STATUS,
    payload: {
        status
    }
});

export const setUserProfile = (profile: ProfileType | undefined): SetUserProfile => ({
    type: SET_USER_PROFILE,
    payload: {
        profile
    }
});

export const savePhotoSuccess = (photos: PhotosType): SavePhotoSuccess => ({
    type: SAVE_PHOTO_SUCCESS,
    payload: {
        photos
    }
});

export const setPosts = (posts: Array<PostType>): SetPosts => ({
    type: SET_POSTS,
    payload: {
        posts
    }
});

export const addPost = (post: PostType): AddPost => ({
    type: ADD_POST,
    payload: {
        post
    }
});

export const addPhoto = (photo: HTMLImageElement): AddPhoto => ({
    type: ADD_PHOTO,
    payload: {
        photo
    }
});

export const changeFollowed = (followed: boolean): ChangeFollowed => ({
    type: CHANGE_FOLLOWED,
    payload: {
        followed
    }
});

/** Error */
export const setError = (error: string | undefined): SetError => ({
    type: SET_ERROR, 
    payload: { error }
});