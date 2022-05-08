import { FilterType, UserType } from "./types";

export const FOLLOW = "[USER] FOLLOW";
export const UNFOLLOW = "[USER] UNFOLLOW";
export const FOLLOW_REQUEST = "[USER] FOLLOW_REQUEST";
export const UNFOLLOW_REQUEST = "[USER] UNFOLLOW_REQUEST";
export const SET_USERS = "[USER] SET_USERS";
export const SET_CURRENT_PAGE = "[USER] SET_CURRENT_PAGE";
export const SET_FILTER = "[USER] SET_FILTER";
export const SET_TOTAL_USERS_COUNT = "[USER] SET_TOTAL_USERS_COUNT";
export const TOGGLE_IS_FETCHING = "[USER] TOGGLE_IS_FETCHING";
export const TOGGLE_IS_FOLLOWING_PROGRESS = "[USER] TOGGLE_IS_FOLLOWING_PROGRESS";
export const SET_ERROR = "[USER] SET_ERROR";
export const GET_USERS_REQUEST = "[USER] GET_USERS_REQUEST";


export interface GetUsersRequest {
    type: typeof GET_USERS_REQUEST;
    payload: {
        page: number; 
        pageSize: number; 
        filter: FilterType | null;
    }
} 

export interface FollowSuccess {
    type: typeof FOLLOW;
    payload: {
        userId: string;
    }
} 

export interface UnFollowSuccess {
    type: typeof UNFOLLOW;
    payload: {
        userId: string;
    }
} 

export interface FollowRequest {
    type: typeof FOLLOW_REQUEST;
    payload: {
        userId: string;
    }
} 

export interface UnFollowRequest {
    type: typeof UNFOLLOW_REQUEST;
    payload: {
        userId: string;
    }
} 

export interface SetUsers {
    type: typeof SET_USERS;
    payload: {
        users: Array<UserType>;
    }
} 

export interface SetCurrentPage {
    type: typeof SET_CURRENT_PAGE;
    payload: {
        currentPage: number;
    }
}

export interface SetFilter {
    type: typeof SET_FILTER;
    payload: {
        filter: FilterType;
    }
}

export interface SetTotalUsersCount {
    type: typeof SET_TOTAL_USERS_COUNT;
    payload: {
        totalCount: number;
    }
}

export interface ToggleIsFetching {
    type: typeof TOGGLE_IS_FETCHING;
    payload: {
        isFetching: boolean;
    }
}

export interface ToggleFollowingProgress {
    type: typeof TOGGLE_IS_FOLLOWING_PROGRESS;
    payload: {
        isFetching: boolean; 
        userId: string;
    }
}

/** Error */
export interface SetError {
    type: typeof SET_ERROR;
    payload: { 
        error: string | undefined;
    } 
}


export type UserActions = 
    | FollowSuccess
    | UnFollowSuccess
    | SetUsers
    | SetCurrentPage
    | SetFilter
    | SetTotalUsersCount
    | ToggleIsFetching
    | ToggleFollowingProgress
    | SetError;