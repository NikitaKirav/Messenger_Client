export interface AuthState {
    initialized: boolean;
    userId: string | undefined;
    email: string | undefined;
    login: string | undefined;
    isAuth: boolean;
    isFetching: boolean;
    captchaUrl: string | undefined;
    token: string | undefined;
    error: string | undefined;
    registerSuccess: boolean;
    isLoadingAuth: boolean;
}

export type LoginResponseDataType = {
    token: string
    userId: string
    userName: string
}
