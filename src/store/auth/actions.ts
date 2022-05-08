import { 
    GetCaptchaUrlSuccess,
    SetAuthUserData, 
    SetError, 
    SET_ERROR, 
    SET_USER_DATA,
    GET_CAPTCHA_URL_SUCCESS,
    SET_REGISTER_SUCCESS,
    SetRegisterSuccess,
    GET_AUTH_USER_DATA_FROM_LOCALSTORAGE,
    GetAuthUserDataFromLocalStorage,
    LoginRequest,
    LOGIN_REQUEST,
    RegisterRequest,
    REGISTER_REQUEST,
    LoginSuccess,
    LOGIN_SUCCESS,
    LoginFailure,
    LOGIN_FAILURE,
    LOGOUT_REQUEST,
    LogoutRequest,
    InitializedSuccess,
    INITIALIZED_SUCCESS,
    InitializeApp,
    INITIALIZE_APP, 
} from "./actionTypes";

/** Logout */
export const logoutRequest = (): LogoutRequest => ({
    type: LOGOUT_REQUEST
});


/** Login */
export const loginRequest = (email: string, password: string): LoginRequest => ({
    type: LOGIN_REQUEST,
    payload: {
        email, password
    }
});

export const loginSuccess = (): LoginSuccess => ({
    type: LOGIN_SUCCESS
});

export const loginFailure = (): LoginFailure => ({
    type: LOGIN_FAILURE
});


/** Register */
export const registerRequest = (email: string, password: string, userName: string): RegisterRequest => ({
    type: REGISTER_REQUEST,
    payload: {
        email, password, userName
    }
});

export const setRegisterSuccess = (registerSuccess: boolean): SetRegisterSuccess => ({
    type: SET_REGISTER_SUCCESS, 
    payload: { registerSuccess }
});  


/** Auth User Data */
export const setAuthUserData = (userId: string | undefined, token: string | undefined): SetAuthUserData => ({
    type: SET_USER_DATA, 
    payload: { userId, token, isAuth: !!token } 
});

export const getAuthUserDataFromLocalStorage = (): GetAuthUserDataFromLocalStorage => ({
    type: GET_AUTH_USER_DATA_FROM_LOCALSTORAGE
});


/** Captcha */
export const getCaptchaUrlSuccess = (captchaUrl: string): GetCaptchaUrlSuccess => ({
    type: GET_CAPTCHA_URL_SUCCESS, 
    payload: { captchaUrl }
});


/** Error */
export const setError = (error: string | undefined): SetError => ({
    type: SET_ERROR, 
    payload: { error }
});

/** Initialized */
export const initializedSuccess = (): InitializedSuccess => ({
    type: INITIALIZED_SUCCESS
});

export const initializeApp = (): InitializeApp => ({
    type: INITIALIZE_APP
});


