import { Reducer } from "redux"
import { 
    AuthActions, 
    GET_CAPTCHA_URL_SUCCESS, 
    INITIALIZED_SUCCESS, 
    LOGIN_FAILURE, 
    LOGIN_REQUEST, 
    LOGIN_SUCCESS, 
    SET_ERROR, 
    SET_REGISTER_SUCCESS, 
    SET_USER_DATA 
} from "./actionTypes"
import { AuthState } from "./types"

export const INITIAL_STATE: AuthState = {
    initialized: false,
    userId: undefined,
    email: undefined,
    login: undefined,
    isAuth: false,
    isFetching: false,
    captchaUrl: undefined,
    token: undefined,
    error: undefined,
    registerSuccess: false,
    isLoadingAuth: false
}

const reducer: Reducer<AuthState> = (
    state = INITIAL_STATE,
    action: AuthActions
  ) => {
    switch(action.type) {
        case LOGIN_REQUEST: {
            return {
                ...state,
                isLoadingAuth: true
            }
        }
        case LOGIN_SUCCESS: {
            return {
                ...state,
                isLoadingAuth: false
            }
        }
        case LOGIN_FAILURE: {
            return {
                ...state,
                isLoadingAuth: false
            }
        }
        case SET_USER_DATA: {
            return {
                ...state,
                userId: action.payload.userId, 
                token: action.payload.token,
                isAuth: action.payload.isAuth
            }
        }
        case GET_CAPTCHA_URL_SUCCESS: {
            return {
                ...state,
                captchaUrl: action.payload.captchaUrl
            }
        }
        case SET_ERROR: {
            return {
                ...state,
                error: action.payload.error
            }
        }
        case SET_REGISTER_SUCCESS: {
            return {
                ...state,
                registerSuccess: action.payload.registerSuccess
            }
        }
        case INITIALIZED_SUCCESS: {
            return { 
                ...state, 
                initialized: true
            }
        }
        default:
            return state;
    }    
}

export default reducer;