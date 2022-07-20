/** Absolute imports */
import { runSaga } from "redux-saga";

/** APIs */
import * as api from "../../../services/userService";

/** Types */
import { ResultCode } from "../../types";
import { FOLLOW, SET_ERROR, TOGGLE_IS_FOLLOWING_PROGRESS } from "../actionTypes";

/** Sagas */
import followSaga from "./followSaga";



describe('Follow Saga', () => {

    const userId = 'user-id-1';
    const action = {
        payload: {
            userId: userId
        }
    };

    it('puts user follow to store if no errors', async () => {
        const dispatched: any[] = [];
        //@ts-ignore
        api.follow = jest.fn().mockResolvedValue({resultCode: ResultCode.Success})

        await runSaga(
            {
                dispatch: (action) => dispatched.push(action),
                getState: () => ({})
            },
            //@ts-ignore
            followSaga,
            action
        ).toPromise();

        expect(api.follow).toHaveBeenCalledWith(userId, expect.anything());
        expect(dispatched).toEqual([
            {
                type: TOGGLE_IS_FOLLOWING_PROGRESS,
                payload: {
                    isFetching: true, 
                    userId
                }
            },
            {
                type: FOLLOW,
                payload: {
                    userId: userId
                }
            },
            {
                type: TOGGLE_IS_FOLLOWING_PROGRESS,
                payload: {
                    isFetching: false, 
                    userId
                }
            },
        ])
    });

    it('puts error data to store if error was thrown', async () => {
        const errorMessage = 'Request failed';
        const dispatched: any[] = [];
        //@ts-ignore
        api.follow = jest.fn().mockRejectedValue(errorMessage)

        await runSaga(
            {
                dispatch: (action) => dispatched.push(action),
                getState: () => ({})
            },
            //@ts-ignore
            followSaga,
            action
        ).toPromise();

        expect(api.follow).toHaveBeenCalledWith(userId, expect.anything());
        expect(dispatched).toEqual([
            {
                type: TOGGLE_IS_FOLLOWING_PROGRESS,
                payload: {
                    isFetching: true, 
                    userId
                }
            },
            {
                type: SET_ERROR, 
                payload: { error: errorMessage.toUpperCase() }
            }
        ])
    });
});