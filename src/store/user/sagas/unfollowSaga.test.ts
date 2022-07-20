/** Absolute imports */
import { runSaga } from "redux-saga";

/** APIs */
import * as api from "../../../services/userService";

/** Types */
import { ResultCode } from "../../types";
import { SET_ERROR, TOGGLE_IS_FOLLOWING_PROGRESS, UNFOLLOW } from "../actionTypes";

/** Sagas */
import unfollowSaga from "./unfollowSaga";



describe('Unfollow Saga', () => {

    const userId = 'user-id-1';
    const action = {
        payload: {
            userId: userId
        }
    };

    it('puts user unfollow to store if no errors', async () => {
        const dispatched: any[] = [];
        //@ts-ignore
        api.unfollow = jest.fn().mockResolvedValue({resultCode: ResultCode.Success})

        await runSaga(
            {
                dispatch: (action) => dispatched.push(action),
                getState: () => ({})
            },
            //@ts-ignore
            unfollowSaga,
            action
        ).toPromise();

        expect(api.unfollow).toHaveBeenCalledWith(userId, expect.anything());
        expect(dispatched).toEqual([
            {
                type: TOGGLE_IS_FOLLOWING_PROGRESS,
                payload: {
                    isFetching: true, 
                    userId
                }
            },
            {
                type: UNFOLLOW,
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
        api.unfollow = jest.fn().mockRejectedValue(errorMessage)

        await runSaga(
            {
                dispatch: (action) => dispatched.push(action),
                getState: () => ({})
            },
            //@ts-ignore
            unfollowSaga,
            action
        ).toPromise();

        expect(api.unfollow).toHaveBeenCalledWith(userId, expect.anything());
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