/** Absolute imports */
import { runSaga } from "redux-saga";

/** APIs */
import * as api from "../../../services/userService";

/** Types */
import { ResultCode } from "../../types";
import { CHANGE_FOLLOWED, SET_ERROR } from "../actionTypes";

/** Sagas */
import getFollowedSaga from "./getFollowedSaga";


describe('getFollowed Saga', () => {

    const userId = 'user-id-1';
    const action = {
        payload: {
            userId
        }
    };

    it('puts followed or not to store if no errors', async () => {
        const dispatched: any[] = [];
        //@ts-ignore
        api.getFollowed = jest.fn().mockResolvedValue({resultCode: ResultCode.Success, data: { followed: true }})

        await runSaga(
            {
                dispatch: (action) => dispatched.push(action),
                getState: () => ({})
            },
            //@ts-ignore
            getFollowedSaga,
            action
        ).toPromise();

        expect(api.getFollowed).toHaveBeenCalledWith(userId, expect.anything());
        expect(dispatched).toEqual([
            {
                type: CHANGE_FOLLOWED,
                payload: {
                    followed: true
                }
            }
        ])
    });

    it('puts error data to store if error was got from server', async () => {
        const errorMessage = 'Request failed';
        const dispatched: any[] = [];
        //@ts-ignore
        api.getFollowed = jest.fn().mockResolvedValue({resultCode: ResultCode.Error, message: errorMessage})

        await runSaga(
            {
                dispatch: (action) => dispatched.push(action),
                getState: () => ({})
            },
            //@ts-ignore
            getFollowedSaga,
            action
        ).toPromise();

        expect(api.getFollowed).toHaveBeenCalledWith(userId, expect.anything());
        expect(dispatched).toEqual([
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
        api.getFollowed = jest.fn().mockRejectedValue(errorMessage)

        await runSaga(
            {
                dispatch: (action) => dispatched.push(action),
                getState: () => ({})
            },
            //@ts-ignore
            getFollowedSaga,
            action
        ).toPromise();

        expect(api.getFollowed).toHaveBeenCalledWith(userId, expect.anything());
        expect(dispatched).toEqual([
            {
                type: SET_ERROR, 
                payload: { error: errorMessage.toUpperCase() }
            }
        ])
    });
});