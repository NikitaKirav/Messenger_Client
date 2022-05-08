import { PhotosType } from "../types";
import { PostType, ProfileType } from "./types";

export const SET_STATUS = "[PROFILE] SET_STATUS";
export const SET_USER_PROFILE = "[PROFILE] SET_USER_PROFILE";
export const SAVE_PHOTO_SUCCESS = "[PROFILE] SAVE_PHOTO_SUCCESS";
export const SET_POSTS = "[PROFILE] SET_POSTS";
export const ADD_POST = "[PROFILE] ADD_POST";
export const ADD_PHOTO = "[PROFILE] ADD_PHOTO";
export const CHANGE_FOLLOWED = "[PROFILE] CHANGE_FOLLOWED";
export const GET_USER_PROFILE = "[PROFILE] GET_USER_PROFILE";
export const SET_ERROR = "[PROFILE] SET_ERROR";
export const GET_STATUS = "[PROFILE] GET_STATUS";
export const UPDATE_STATUS = "[PROFILE] UPDATE_STATUS";
export const SAVE_PHOTO = "[PROFILE] SAVE_PHOTO"; 
export const SAVE_PROFILE = "[PROFILE] SAVE_PROFILE"; 
export const GET_POSTS = "[PROFILE] GET_POSTS";
export const DELETE_ACTIVE_POST = "[PROFILE] DELETE_ACTIVE_POST";
export const ADD_POST_REQUEST = "[PROFILE] ADD_POST_REQUEST";
export const ADD_LIKE = "[PROFILE] ADD_LIKE";
export const GET_FOLLOWED = "[PROFILE] GET_FOLLOWED";
export const SET_PROFILE_WAS_SAVED = "[PROFILE] SET_PROFILE_WAS_SAVED";

export interface SetProfileWasSaved {
    type: typeof SET_PROFILE_WAS_SAVED;
    payload: {
        profileWasSaved: boolean;
    }
}

export interface GetFollowed {
    type: typeof GET_FOLLOWED;
    payload: {
        userId: string
    } 
}

export interface AddLike {
    type: typeof ADD_LIKE;
    payload: {
        postId: string; 
        like: boolean;
        userId: string;
    } 
}

export interface AddPostRequest {
    type: typeof ADD_POST_REQUEST;
    payload: {
        text: string; 
        profileId: string;
    }
}

export interface DeleteActivePost {
    type: typeof DELETE_ACTIVE_POST;
    payload: {
        postId: string; 
        userId: string;
    }
}

export interface GetPosts {
    type: typeof GET_POSTS;
    payload: {
        userId: string
    }
}

export interface SaveProfile {
    type: typeof SAVE_PROFILE;
    payload: {
        profile: ProfileType
    }
}

export interface SavePhoto {
    type: typeof SAVE_PHOTO;
    payload: {
        file: File
    }
}

export interface UpdateStatus {
    type: typeof UPDATE_STATUS;
    payload: {
        status: string
    }
}

export interface GetStatus {
    type: typeof GET_STATUS;
    payload: {
        userId: string
    }
}

export interface GetUserProfile {
    type: typeof GET_USER_PROFILE;
    payload: {
        userId: string
    }
}

export interface SetStatus {
    type: typeof SET_STATUS;
    payload: {
        status: string
    }
}

export interface SetUserProfile {
    type: typeof SET_USER_PROFILE;
    payload: {
        profile: ProfileType | undefined;
    }
}

export interface SavePhotoSuccess {
    type: typeof SAVE_PHOTO_SUCCESS;
    payload: {
        photos: PhotosType
    }
}

export interface SetPosts {
    type: typeof SET_POSTS;
    payload: {
        posts: Array<PostType>
    }
}

export interface AddPost {
    type: typeof ADD_POST;
    payload: {
        post: PostType
    }
}

export interface AddPhoto {
    type: typeof ADD_PHOTO;
    payload: {
        photo: HTMLImageElement
    }
}

export interface ChangeFollowed {
    type: typeof CHANGE_FOLLOWED;
    payload: {
        followed: boolean
    }
}

/** Error */
export interface SetError {
    type: typeof SET_ERROR;
    payload: { 
        error: string | undefined;
    } 
}

export type ProfileActions = 
    | SetProfileWasSaved
    | SetStatus
    | SetUserProfile
    | SavePhotoSuccess
    | SetPosts
    | AddPost
    | AddPhoto
    | ChangeFollowed
    | SetError;