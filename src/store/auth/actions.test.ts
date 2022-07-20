import * as t from './actionTypes'
import * as a from './actions';


describe('Auth Actions', () => {

    it('logoutRequest(): should create an action to Logout from the site.', () => {
        const expectedAction = {
            type: t.LOGOUT_REQUEST,
        }

        expect(a.logoutRequest()).toEqual(expectedAction)
    });

    it('loginRequest(): should attach email, password.', () => {
        const expectedAction = {
            type: t.LOGIN_REQUEST,
            payload: {
                email: 'h1@gmail.com', 
                password:'123123'
            }
        };

        expect(a.loginRequest('h1@gmail.com', '123123')).toEqual(expectedAction);
    });

    it('loginSuccess(): should create an action to set isLoading.', () => {
        const expectedAction = {
            type: t.LOGIN_SUCCESS,
        }

        expect(a.loginSuccess()).toEqual(expectedAction)
    });

    it('loginFailure(): should create an action to set isLoading.', () => {
        const expectedAction = {
            type: t.LOGIN_FAILURE,
        }

        expect(a.loginFailure()).toEqual(expectedAction)
    });

    it('registerRequest(): should attach email, password, userName.', () => {
        const expectedAction = {
            type: t.REGISTER_REQUEST,
            payload: {
                email: 'h1@gmail.com', 
                password:'123123',
                userName: 'Bob'
            }
        };

        expect(a.registerRequest('h1@gmail.com', '123123', 'Bob')).toEqual(expectedAction);
    });

    it('setRegisterSuccess(): should attach registerSuccess.', () => {
        const expectedAction = {
            type: t.SET_REGISTER_SUCCESS,
            payload: {
                registerSuccess: true
            }
        };

        expect(a.setRegisterSuccess(true)).toEqual(expectedAction);
    });

    it('setAuthUserData(): should attach userId, token, isAuth.', () => {
        const expectedAction = {
            type: t.SET_USER_DATA,
            payload: {
                userId: 'user-id-1', 
                token: 'token-id', 
                isAuth: true
            }
        };

        expect(a.setAuthUserData('user-id-1', 'token-id')).toEqual(expectedAction);
    });

    it('getAuthUserDataFromLocalStorage(): should create an action to set Auth user data to Store from LocalStorage.', () => {
        const expectedAction = {
            type: t.GET_AUTH_USER_DATA_FROM_LOCALSTORAGE,
        };

        expect(a.getAuthUserDataFromLocalStorage()).toEqual(expectedAction);
    });

    it('getCaptchaUrlSuccess(): should attach captchaUrl.', () => {
        const expectedAction = {
            type: t.GET_CAPTCHA_URL_SUCCESS,
            payload: {
                captchaUrl: '/captcha-id-1'
            }
        };

        expect(a.getCaptchaUrlSuccess('/captcha-id-1')).toEqual(expectedAction);
    });

    it('setError(): should attach error message.', () => {
        const expectedAction = {
            type: t.SET_ERROR,
            payload: {
                error: 'some error!'
            }
        };

        expect(a.setError('some error!')).toEqual(expectedAction);
    });

    it('initializedSuccess(): should create an action to set initialized.', () => {
        const expectedAction = {
            type: t.INITIALIZED_SUCCESS,
        };

        expect(a.initializedSuccess()).toEqual(expectedAction);
    });

    it('initializeApp(): should create an action to set Initialized and set Auth user data.', () => {
        const expectedAction = {
            type: t.INITIALIZE_APP,
        };

        expect(a.initializeApp()).toEqual(expectedAction);
    });

});