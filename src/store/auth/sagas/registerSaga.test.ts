/** Absolute imports */
import { runSaga } from "redux-saga";

/** APIs */
import * as api from "../../../services/authService";

/** Types */
import { ResultCode } from "../../types";
import { SET_ERROR, SET_REGISTER_SUCCESS } from "../actionTypes";

/** Sagas */
import registerSaga from "./registerSaga";


describe('register Saga', () => {

    const email = 'h1@gmail.com',
        password = '123123',
        userName = 'Bob_tester';
    const action = {
        payload: {
            email, password, userName
        }
    };

    it('puts register was successful to store if no errors', async () => {
        const dispatched: any[] = [];
        //@ts-ignore
        api.register = jest.fn().mockResolvedValue({resultCode: ResultCode.Success})

        await runSaga(
            {
                dispatch: (action) => dispatched.push(action),
                getState: () => ({})
            },
            //@ts-ignore
            registerSaga,
            action
        ).toPromise();

        expect(api.register).toHaveBeenCalledWith({email, password, userName}, expect.anything());
        expect(dispatched).toEqual([
            {
                type: SET_ERROR, 
                payload: { error: undefined }
            },
            {
                type: SET_REGISTER_SUCCESS, 
                payload: { 
                    registerSuccess: false 
                }
            },
            {
                type: SET_REGISTER_SUCCESS, 
                payload: { 
                    registerSuccess: true 
                }
            }
        ])
    });

    it('puts error data to store if error was got from server', async () => {
        const errorMessage = 'Request failed';
        const dispatched: any[] = [];
        //@ts-ignore
        api.register = jest.fn().mockResolvedValue({resultCode: ResultCode.Error, message: errorMessage})

        await runSaga(
            {
                dispatch: (action) => dispatched.push(action),
                getState: () => ({})
            },
            //@ts-ignore
            registerSaga,
            action
        ).toPromise();

        expect(api.register).toHaveBeenCalledWith({email, password, userName}, expect.anything());
        expect(dispatched).toEqual([
            {
                type: SET_ERROR, 
                payload: { error: undefined }
            },
            {
                type: SET_REGISTER_SUCCESS, 
                payload: { 
                    registerSuccess: false 
                }
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
        api.register = jest.fn().mockRejectedValue(errorMessage)

        await runSaga(
            {
                dispatch: (action) => dispatched.push(action),
                getState: () => ({})
            },
            //@ts-ignore
            registerSaga,
            action
        ).toPromise();

        expect(api.register).toHaveBeenCalledWith({email, password, userName}, expect.anything());
        expect(dispatched).toEqual([
            {
                type: SET_ERROR, 
                payload: { error: undefined }
            },
            {
                type: SET_REGISTER_SUCCESS, 
                payload: { 
                    registerSuccess: false 
                }
            },
            {
                type: SET_ERROR, 
                payload: { error: errorMessage.toUpperCase() }
            }
        ])
    });
});