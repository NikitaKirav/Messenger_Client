import { Reducer } from "redux";
import { 
    FOLLOW, 
    SET_CURRENT_PAGE, 
    SET_ERROR, 
    SET_FILTER, 
    SET_TOTAL_USERS_COUNT, 
    SET_USERS, 
    TOGGLE_IS_FETCHING, 
    TOGGLE_IS_FOLLOWING_PROGRESS, 
    UNFOLLOW, 
    UserActions
} from "./actionTypes";
import { UserState } from "./types";

export const INITIAL_STATE: UserState = {
    users: [],
    pageSize: 10,
    totalUsersCount: 50,
    currentPage: 1,
    isFetching: true,
    followingInProgress: [], // array of users ids
    filter: {
        term: '',
        friend: null
    },
    error: undefined
}
//@ts-ignore
const reducer: Reducer<UserState> = (
    state = INITIAL_STATE,
    action: UserActions
  ) => {
    switch(action.type) {
        case FOLLOW: {
            return { 
                ...state, 
                users: state.users.map(u => {
                    if (u.id === action.payload.userId) {
                        return { ...u, followed: true }
                    }
                    return u;
                })
            };
        }
        case UNFOLLOW: {
            return { 
                ...state, 
                users: state.users.map(u => {
                    if (u.id === action.payload.userId) {
                        return { ...u, followed: false }
                    }
                    return u;
                })
            };
        }
        case SET_ERROR: {
            return {
                ...state,
                error: action.payload.error
            }
        }
        case SET_USERS: {
            return { ...state, users: action.payload.users }
        }
        case SET_CURRENT_PAGE: {
            return { ...state, currentPage: action.payload.currentPage }
        }
        case SET_TOTAL_USERS_COUNT: {
            return { ...state, totalUsersCount: action.payload.totalCount}
        }
        case TOGGLE_IS_FETCHING: {
            return { ...state, isFetching: action.payload.isFetching }
        }
        case SET_FILTER: {
            return { ...state, filter: action.payload.filter }
        }
        case TOGGLE_IS_FOLLOWING_PROGRESS: {
            return { ...state, 
                followingInProgress: action.payload.isFetching
                ? [...state.followingInProgress, action.payload.userId]
                : state.followingInProgress.filter(id => id != action.payload.userId)
            }
        }
        default:
            return state;
    }    
}

export default reducer;