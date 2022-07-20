/** Absolute imports */
import { runSaga } from "redux-saga";

/** APIs */
import * as api from "../../../services/chatService";

/** Types */
import { SET_ERROR } from "../actionTypes";

/** Sagas */
import getChatListSaga from "./getChatListSaga";


describe('getChatList Saga', () => {
    const action = {};

    it('puts user chat list to the store if no errors', async () => {
        const dispatched: any[] = [];
        //@ts-ignore
        api.getChatList = jest.fn();

        await runSaga(
            {
                dispatch: (action) => dispatched.push(action),
                getState: () => ({})
            },
            //@ts-ignore
            getChatListSaga,
            //@ts-ignore
            action
        ).toPromise();

        expect(api.getChatList).toHaveBeenCalledTimes(1);
    });


    it('puts error data to store if error was thrown', async () => {
        const errorMessage = 'Request failed';
        const dispatched: any[] = [];
        //@ts-ignore
        api.getChatList = jest.fn().mockRejectedValue(errorMessage)

        await runSaga(
            {
                dispatch: (action) => dispatched.push(action),
                getState: () => ({})
            },
            //@ts-ignore
            getChatListSaga,
            //@ts-ignore
            action
        ).toPromise();

        expect(api.getChatList).toHaveBeenCalledTimes(1);
        expect(dispatched).toEqual([
            {
                type: SET_ERROR, 
                payload: { error: errorMessage.toUpperCase() }
            }
        ])
    });
});