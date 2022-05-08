import { 
    FOLLOW, 
    FollowRequest, 
    FollowSuccess, 
    FOLLOW_REQUEST, 
    GetUsersRequest, 
    GET_USERS_REQUEST, 
    SetCurrentPage, 
    SetError, 
    SetFilter, 
    SetTotalUsersCount, 
    SetUsers, 
    SET_CURRENT_PAGE, 
    SET_ERROR, 
    SET_FILTER, 
    SET_TOTAL_USERS_COUNT, 
    SET_USERS, 
    ToggleFollowingProgress, 
    ToggleIsFetching, 
    TOGGLE_IS_FETCHING, 
    TOGGLE_IS_FOLLOWING_PROGRESS, 
    UNFOLLOW, 
    UnFollowRequest, 
    UnFollowSuccess,
    UNFOLLOW_REQUEST
} from "./actionTypes";
import { FilterType, UserType } from "./types";

export const followRequest = (userId: string): FollowRequest => ({
    type: FOLLOW_REQUEST,
    payload: {
        userId
    }
}); 

export const unFollowRequest = (userId: string): UnFollowRequest => ({
    type: UNFOLLOW_REQUEST,
    payload: {
        userId
    }
}); 

export const getUsersRequest = (page: number, pageSize: number, filter: FilterType | null): GetUsersRequest => ({
    type: GET_USERS_REQUEST,
    payload: {
        page, 
        pageSize,
        filter
    }
}); 

export const followSuccess = (userId: string): FollowSuccess => ({
    type: FOLLOW,
    payload: {
        userId
    }
});

export const unFollowSuccess = (userId: string): UnFollowSuccess => ({
    type: UNFOLLOW,
    payload: {
        userId
    }
});

export const setUsers = (users: Array<UserType>): SetUsers => ({
    type: SET_USERS,
    payload: {
        users
    }
});

export const setCurrentPage = (currentPage: number): SetCurrentPage => ({
    type: SET_CURRENT_PAGE,
    payload: {
        currentPage
    }
});

export const setFilter = (filter: FilterType): SetFilter => ({
    type: SET_FILTER,
    payload: {
        filter
    }
});

export const setTotalUsersCount = (totalCount: number): SetTotalUsersCount => ({
    type: SET_TOTAL_USERS_COUNT,
    payload: {
        totalCount
    }
});

export const toggleIsFetching = (isFetching: boolean): ToggleIsFetching => ({
    type: TOGGLE_IS_FETCHING,
    payload: {
        isFetching
    }
});

export const toggleFollowingProgress = (isFetching: boolean, userId: string): ToggleFollowingProgress => ({
    type: TOGGLE_IS_FOLLOWING_PROGRESS,
    payload: {
        isFetching, userId
    }
});

/** Error */
export const setError = (error: string | undefined): SetError => ({
    type: SET_ERROR, 
    payload: { error }
});