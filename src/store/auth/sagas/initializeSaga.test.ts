/** Absolute imports */
import { runSaga } from "redux-saga";

/** Types */
import { GET_AUTH_USER_DATA_FROM_LOCALSTORAGE, INITIALIZED_SUCCESS } from "../actionTypes";

/** Sagas */
import initializeSaga from "./initializeSaga";


describe('initialize Saga', () => {

    const action = {};

    it('puts local user auth to store if no errors', async () => {
        const dispatched: any[] = [];

        await runSaga(
            {
                dispatch: (action) => dispatched.push(action),
                getState: () => ({})
            },
            //@ts-ignore
            initializeSaga,
            //@ts-ignore
            action
        ).toPromise();

        expect(dispatched).toEqual([
            {
                type: GET_AUTH_USER_DATA_FROM_LOCALSTORAGE
            },
            {
                type: INITIALIZED_SUCCESS
            }
        ])
    });

});