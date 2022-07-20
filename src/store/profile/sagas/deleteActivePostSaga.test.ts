/** Absolute imports */
import { runSaga } from "redux-saga";

/** APIs */
import * as api from "../../../services/profileService";

/** Types */
import { ResultCode } from "../../types";
import { GET_POSTS, SET_ERROR } from "../actionTypes";

/** Sagas */
import deleteActivePostSaga from "./deleteActivePostSaga";


describe('deleteActivePost Saga', () => {

    const postId = 'post-id-1',
          userId = 'user-id-1';
    const action = {
        payload: {
            postId,
            userId
        }
    };

    it('puts posts to store if no errors', async () => {
        const dispatched: any[] = [];
        //@ts-ignore
        api.deletePost = jest.fn().mockResolvedValue({resultCode: ResultCode.Success})

        await runSaga(
            {
                dispatch: (action) => dispatched.push(action),
                getState: () => ({})
            },
            //@ts-ignore
            deleteActivePostSaga,
            action
        ).toPromise();

        expect(api.deletePost).toHaveBeenCalledWith(postId, expect.anything());
        expect(dispatched).toEqual([
            {
                type: GET_POSTS,
                payload: {
                    userId
                }
            }
        ])
    });

    it('puts error data to store if error was got from server', async () => {
        const errorMessage = 'Request failed';
        const dispatched: any[] = [];
        //@ts-ignore
        api.deletePost = jest.fn().mockResolvedValue({resultCode: ResultCode.Error, message: errorMessage})

        await runSaga(
            {
                dispatch: (action) => dispatched.push(action),
                getState: () => ({})
            },
            //@ts-ignore
            deleteActivePostSaga,
            action
        ).toPromise();

        expect(api.deletePost).toHaveBeenCalledWith(postId, expect.anything());
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
        api.deletePost = jest.fn().mockRejectedValue(errorMessage)

        await runSaga(
            {
                dispatch: (action) => dispatched.push(action),
                getState: () => ({})
            },
            //@ts-ignore
            deleteActivePostSaga,
            action
        ).toPromise();

        expect(api.deletePost).toHaveBeenCalledWith(postId, expect.anything());
        expect(dispatched).toEqual([
            {
                type: SET_ERROR, 
                payload: { error: errorMessage.toUpperCase() }
            }
        ])
    });
});