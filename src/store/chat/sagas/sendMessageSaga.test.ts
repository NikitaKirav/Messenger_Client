/** Absolute imports */
import { runSaga } from "redux-saga";

/** APIs */
import * as api from "../../../services/chatService";

/** Types */
import { SendMessage, SET_ERROR } from "../actionTypes";

/** Sagas */
import sendMessageSaga from "./sendMessageSaga";


describe('sendMessage Saga', () => {

    const email = 'user-id-1',
        text = 'Hello world!',
        addressee = 'user-id-2';
    const action = {
        payload: {
            email, 
            text, 
            addressee
        }
    } as SendMessage;

    it('sends message from user1 to user2 if no errors', async () => {
        const dispatched: any[] = [];
        //@ts-ignore
        api.sendMessage = jest.fn();

        await runSaga(
            {
                dispatch: (action) => dispatched.push(action),
                getState: () => ({})
            },
            //@ts-ignore
            sendMessageSaga,
            action
        ).toPromise();

        expect(api.sendMessage).toHaveBeenCalledWith(email, text, addressee);
    });


    it('puts error data to store if error was thrown', async () => {
        const errorMessage = 'Request failed';
        const dispatched: any[] = [];
        //@ts-ignore
        api.sendMessage = jest.fn().mockRejectedValue(errorMessage)

        await runSaga(
            {
                dispatch: (action) => dispatched.push(action),
                getState: () => ({})
            },
            //@ts-ignore
            sendMessageSaga,
            action
        ).toPromise();

        expect(api.sendMessage).toHaveBeenCalledWith(email, text, addressee);
        expect(dispatched).toEqual([
            {
                type: SET_ERROR, 
                payload: { error: errorMessage.toUpperCase() }
            }
        ])
    });
});