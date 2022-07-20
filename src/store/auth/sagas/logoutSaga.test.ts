/** Absolute imports */
import { runSaga } from "redux-saga";

/** APIs */
import * as api from "../../../services/authService";
import { RESET_CHAT_LIST } from "../../chat/actionTypes";

/** Types */
import { ResultCode } from "../../types";
import { SET_USERS } from "../../user/actionTypes";
import { SET_ERROR, SET_USER_DATA } from "../actionTypes";

/** Sagas */
import logoutSaga from "./logoutSaga";


describe('logout Saga', () => {

    const action = {};

    it('puts user likes to store if no errors', async () => {
        const dispatched: any[] = [];
        //@ts-ignore
        api.logout = jest.fn().mockResolvedValue({resultCode: ResultCode.Success})

        await runSaga(
            {
                dispatch: (action) => dispatched.push(action),
                getState: () => ({})
            },
            //@ts-ignore
            logoutSaga,
            //@ts-ignore
            action
        ).toPromise();

        expect(api.logout).toHaveBeenCalledTimes(1);
        expect(dispatched).toEqual([
            {
                type: SET_USER_DATA, 
                payload: { 
                    userId: undefined, 
                    token: undefined, 
                    isAuth: false } 
            },
            {
                type: RESET_CHAT_LIST
            },
            {
                type: SET_USERS,
                payload: {
                    users: []
                }
            }
        ])
    });

    it('puts error data to store if error was thrown', async () => {
        const errorMessage = 'Request failed';
        const dispatched: any[] = [];
        //@ts-ignore
        api.logout = jest.fn().mockRejectedValue(errorMessage)

        await runSaga(
            {
                dispatch: (action) => dispatched.push(action),
                getState: () => ({})
            },
            //@ts-ignore
            logoutSaga,
            //@ts-ignore
            action
        ).toPromise();

        expect(api.logout).toHaveBeenCalledTimes(1);
        expect(dispatched).toEqual([
            {
                type: SET_USER_DATA, 
                payload: { 
                    userId: undefined, 
                    token: undefined, 
                    isAuth: false } 
            },
            {
                type: SET_ERROR, 
                payload: { error: errorMessage.toUpperCase() }
            }
        ])
    });
});