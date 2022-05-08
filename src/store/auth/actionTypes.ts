export const INITIALIZED_SUCCESS = "[AUTH] INITIALIZED_SUCCESS";
export const INITIALIZE_APP = "[AUTH] INITIALIZE_APP";

export const SET_USER_DATA = "[AUTH] SET_USER_DATA";
export const GET_CAPTCHA_URL_SUCCESS = "[AUTH] GET_CAPTCHA_URL_SUCCESS";
export const SET_ERROR = "[AUTH] SET_ERROR";
export const SET_REGISTER_SUCCESS = "[AUTH] SET_REGISTER_SUCCESS";
export const GET_AUTH_USER_DATA_FROM_LOCALSTORAGE = "[AUTH] GET_AUTH_USER_DATA_FROM_LOCALSTORAGE";

export const LOGIN_REQUEST = "[AUTH] LOGIN_REQUEST";
export const LOGIN_SUCCESS = "[AUTH] LOGIN_SUCCESS";
export const LOGIN_FAILURE = "[AUTH] LOGIN_FAILURE";

export const REGISTER_REQUEST = "[AUTH] REGISTER_REQUEST";

export const LOGOUT_REQUEST = "[AUTH] LOGOUT_REQUEST";

/** Logout */
export interface LogoutRequest {
    type: typeof LOGOUT_REQUEST;
}


/** Login */
export interface LoginRequest {
    type: typeof LOGIN_REQUEST;
    payload: {
        email: string; 
        password: string;
    }
}

export interface LoginSuccess {
    type: typeof LOGIN_SUCCESS;
}

export interface LoginFailure {
    type: typeof LOGIN_FAILURE;
}


/** Register */
export interface RegisterRequest {
    type: typeof REGISTER_REQUEST;
    payload: {
        email: string, 
        password: string, 
        userName: string
    }
}

export interface SetRegisterSuccess {
    type: typeof SET_REGISTER_SUCCESS;
    payload: { 
        registerSuccess: boolean;
    } 
}


/** Auth User Data */
export interface SetAuthUserData {
    type: typeof SET_USER_DATA;
    payload: { 
        userId: string | undefined; 
        token: string | undefined;
        isAuth: boolean;
    } 
}

export interface GetAuthUserDataFromLocalStorage {
    type: typeof GET_AUTH_USER_DATA_FROM_LOCALSTORAGE;
}


/** Captcha */
export interface GetCaptchaUrlSuccess {
    type: typeof GET_CAPTCHA_URL_SUCCESS;
    payload: { 
        captchaUrl: string;
    } 
}

/** Error */
export interface SetError {
    type: typeof SET_ERROR;
    payload: { 
        error: string | undefined;
    } 
}

/** Initialized */
export interface InitializedSuccess {
    type: typeof INITIALIZED_SUCCESS;
}

export interface InitializeApp {
    type: typeof INITIALIZE_APP;
}

export type AuthActions =
    | LoginRequest
    | LoginSuccess
    | LoginFailure
    | SetAuthUserData
    | GetCaptchaUrlSuccess
    | SetError
    | SetRegisterSuccess
    | InitializedSuccess;