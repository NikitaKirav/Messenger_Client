import { Reducer } from "redux";
import { 
    ADD_PHOTO,
    ADD_POST,
    CHANGE_FOLLOWED,
    ProfileActions,
    SAVE_PHOTO_SUCCESS,
    SET_ERROR,
    SET_POSTS,
    SET_PROFILE_WAS_SAVED,
    SET_STATUS,
    SET_USER_PROFILE, 
} from "./actionTypes";
import { ProfileState } from "./types";

export const INITIAL_STATE: ProfileState = {
    posts: [],
    profile: undefined,
    status: '',
    photo: undefined,
    followed: false,
    error: undefined,
    profileWasSaved: false
}
//@ts-ignore
const reducer: Reducer<ProfileState> = (
    state = INITIAL_STATE,
    action: ProfileActions
  ) => {
    switch(action.type) {
        case SET_PROFILE_WAS_SAVED:
            return {
                ...state,
                profileWasSaved: action.payload.profileWasSaved
            }
        case ADD_POST:  {
            let newPost = action.payload.post;        
            return {
                ...state,
                posts: [ ...state.posts, newPost]
            };
        }
        case SET_USER_PROFILE: 
            return { ...state, profile: action.payload.profile };        
        case SET_STATUS: 
            return {
                ...state,
                status: action.payload.status
            }
        case SAVE_PHOTO_SUCCESS:
            return {
                ...state,
                profile: { ...state.profile, photos: action.payload.photos }
            }
        case SET_POSTS:
            return {
                ...state,
                posts: action.payload.posts
            }
        case ADD_PHOTO:
            return {
                ...state,
                photo: action.payload.photo
            }
        case CHANGE_FOLLOWED:
            return {
                ...state,
                followed: action.payload.followed
            }
        case SET_ERROR:
            return {
                ...state,
                error: action.payload.error
            }
        default:
            return state;
    }    
}

export default reducer;