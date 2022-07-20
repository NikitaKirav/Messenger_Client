/** Absolute imports */
import { runSaga } from "redux-saga";

/** APIs */
import * as api from "../../../services/chatService";

/** Types */
import { GetUserAvatar, SET_ERROR } from "../actionTypes";

/** Sagas */
import getUserAvatarSaga from "./getUserAvatarSaga";


describe('getUserAvatar Saga', () => {

    const userId = 'user-id-1';
    const action = {
        payload: {
            userId
        }
    } as GetUserAvatar;

    it('puts user avatar to the store if no errors', async () => {
        const dispatched: any[] = [];
        //@ts-ignore
        api.getUserAvatar = jest.fn();

        await runSaga(
            {
                dispatch: (action) => dispatched.push(action),
                getState: () => ({})
            },
            //@ts-ignore
            getUserAvatarSaga,
            action
        ).toPromise();

        expect(api.getUserAvatar).toHaveBeenCalledWith(userId);
    });


    it('puts error data to store if error was thrown', async () => {
        const errorMessage = 'Request failed';
        const dispatched: any[] = [];
        //@ts-ignore
        api.getUserAvatar = jest.fn().mockRejectedValue(errorMessage)

        await runSaga(
            {
                dispatch: (action) => dispatched.push(action),
                getState: () => ({})
            },
            //@ts-ignore
            getUserAvatarSaga,
            action
        ).toPromise();

        expect(api.getUserAvatar).toHaveBeenCalledWith(userId);
        expect(dispatched).toEqual([
            {
                type: SET_ERROR, 
                payload: { error: errorMessage.toUpperCase() }
            }
        ])
    });
});