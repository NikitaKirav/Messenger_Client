/** Absolute imports */
import { runSaga } from "redux-saga";

/** APIs */
import * as api from "../../../services/profileService";

/** Types */
import { ResultCode } from "../../types";
import { GET_POSTS, SET_ERROR } from "../actionTypes";

/** Sagas */
import addLikeSaga from "./addLikeSaga";


describe('Add Like Saga', () => {

    const postId = 'post-id-1',
          userId = 'user-id-1',
          like = true;
    const action = {
        payload: {
            postId,
            like, 
            userId
        }
    };

    it('puts user likes to store if no errors', async () => {
        const dispatched: any[] = [];
        //@ts-ignore
        api.addLike = jest.fn().mockResolvedValue({resultCode: ResultCode.Success})

        await runSaga(
            {
                dispatch: (action) => dispatched.push(action),
                getState: () => ({})
            },
            //@ts-ignore
            addLikeSaga,
            action
        ).toPromise();

        expect(api.addLike).toHaveBeenCalledWith(postId, like, expect.anything());
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
        api.addLike = jest.fn().mockResolvedValue({resultCode: ResultCode.Error, message: errorMessage})

        await runSaga(
            {
                dispatch: (action) => dispatched.push(action),
                getState: () => ({})
            },
            //@ts-ignore
            addLikeSaga,
            action
        ).toPromise();

        expect(api.addLike).toHaveBeenCalledWith(postId, like, expect.anything());
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
        api.addLike = jest.fn().mockRejectedValue(errorMessage)

        await runSaga(
            {
                dispatch: (action) => dispatched.push(action),
                getState: () => ({})
            },
            //@ts-ignore
            addLikeSaga,
            action
        ).toPromise();

        expect(api.addLike).toHaveBeenCalledWith(postId, like, expect.anything());
        expect(dispatched).toEqual([
            {
                type: SET_ERROR, 
                payload: { error: errorMessage.toUpperCase() }
            }
        ])
    });
});