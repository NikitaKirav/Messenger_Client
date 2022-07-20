/** Absolute imports */
import { runSaga } from "redux-saga";

/** APIs */
import * as api from "../../../services/chatService";

/** Types */
import { GetMessagesFromUser, SET_ERROR } from "../actionTypes";

/** Sagas */
import getMessagesFromUserSaga from "./getMessagesFromUserSaga";


describe('getMessagesFromUser Saga', () => {

    const userId = 'user-id-1';
    const action = {
        payload: {
            userId
        }
    } as GetMessagesFromUser;

    it('puts user messages to the store if no errors', async () => {
        const dispatched: any[] = [];
        //@ts-ignore
        api.getMessagesFromUser = jest.fn();

        await runSaga(
            {
                dispatch: (action) => dispatched.push(action),
                getState: () => ({})
            },
            //@ts-ignore
            getMessagesFromUserSaga,
            action
        ).toPromise();

        expect(api.getMessagesFromUser).toHaveBeenCalledWith(userId);
    });


    it('puts error data to store if error was thrown', async () => {
        const errorMessage = 'Request failed';
        const dispatched: any[] = [];
        //@ts-ignore
        api.getMessagesFromUser = jest.fn().mockRejectedValue(errorMessage)

        await runSaga(
            {
                dispatch: (action) => dispatched.push(action),
                getState: () => ({})
            },
            //@ts-ignore
            getMessagesFromUserSaga,
            action
        ).toPromise();

        expect(api.getMessagesFromUser).toHaveBeenCalledWith(userId);
        expect(dispatched).toEqual([
            {
                type: SET_ERROR, 
                payload: { error: errorMessage.toUpperCase() }
            }
        ])
    });
});