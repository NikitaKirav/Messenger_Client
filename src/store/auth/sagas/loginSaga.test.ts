/** Absolute imports */
import { runSaga } from "redux-saga";

/** APIs */
import * as api from "../../../services/authService";

/** Utils */
import { mockLocalStorage } from "../../../utils/mockLocalStorage";

/** Types */
import { ResultCode } from "../../types";
import { LOGIN_FAILURE, LOGIN_SUCCESS, SET_ERROR, SET_USER_DATA } from "../actionTypes";

/** Sagas */
import loginSaga from "./loginSaga";


describe('login Saga', () => {

    const email = 'h1@gmail.com',
        password = '123123';
    const action = {
        payload: {
            email, password
        }
    };
    const { getItemMock, setItemMock } = mockLocalStorage();

    it('puts user auth to store if no errors', async () => {
        const userId = 'user-id-1', 
              token = 'token-1'
        const key = "userData_Messanger", 
              value = "{\"userId\":\"user-id-1\",\"token\":\"token-1\"}";
        const dispatched: any[] = [];
        //@ts-ignore
        api.login = jest.fn().mockResolvedValue({resultCode: ResultCode.Success, data: { userId, token}})

        await runSaga(
            {
                dispatch: (action) => dispatched.push(action),
                getState: () => ({})
            },
            //@ts-ignore
            loginSaga,
            action
        ).toPromise();

        expect(setItemMock).toHaveBeenCalledWith(key, value);
        expect(api.login).toHaveBeenCalledWith({email, password}, expect.anything());
        expect(dispatched).toEqual([
            {
                type: SET_ERROR, 
                payload: { error: undefined }
            },
            {
                type: LOGIN_SUCCESS
            },
            {
                type: SET_USER_DATA, 
                payload: { 
                    userId, 
                    token, 
                    isAuth: !!token 
                } 
            }
        ])
    });

    it('puts error data to store if error was got from server', async () => {
        const errorMessage = 'Request failed';
        const dispatched: any[] = [];
        //@ts-ignore
        api.login = jest.fn().mockResolvedValue({resultCode: ResultCode.Error, message: errorMessage})

        await runSaga(
            {
                dispatch: (action) => dispatched.push(action),
                getState: () => ({})
            },
            //@ts-ignore
            loginSaga,
            action
        ).toPromise();

        expect(api.login).toHaveBeenCalledWith({email, password}, expect.anything());
        expect(dispatched).toEqual([
            {
                type: SET_ERROR, 
                payload: { error: undefined }
            },
            {
                type: LOGIN_FAILURE
            },
            {
                type: SET_ERROR, 
                payload: { error: errorMessage }
            }
        ])
    });

    it('puts error data to store if error was thrown', async () => {
        const errorMessage = 'Request failed';
        const dispatched: any[] = [];
        //@ts-ignore
        api.login = jest.fn().mockRejectedValue(errorMessage)

        await runSaga(
            {
                dispatch: (action) => dispatched.push(action),
                getState: () => ({})
            },
            //@ts-ignore
            loginSaga,
            action
        ).toPromise();

        expect(api.login).toHaveBeenCalledWith({email, password}, expect.anything());
        expect(dispatched).toEqual([
            {
                type: SET_ERROR, 
                payload: { error: undefined }
            },
            {
                type: SET_ERROR, 
                payload: { error: errorMessage.toUpperCase() }
            }
        ])
    });
});