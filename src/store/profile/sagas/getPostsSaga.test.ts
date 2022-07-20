/** Absolute imports */
import { runSaga } from "redux-saga";

/** APIs */
import * as api from "../../../services/profileService";

/** Types */
import { ResultCode } from "../../types";
import { SET_ERROR, SET_POSTS } from "../actionTypes";
import { PostType } from "../types";

/** Sagas */
import getPostsSaga from "./getPostsSaga";


describe('getPosts Saga', () => {

    const userId = 'user-id-1';
    const action = {
        payload: {
            userId
        }
    };

    it('puts posts to store if no errors', async () => {
        const posts: Array<PostType> = [
            {
                id: '1p',
                userId: 'user1',
                avatar: 'https://avatars.com/image1.jpg',
                createDate: '22-05-2022',
                text: 'First post!',
                userName: 'Bob Smith',
                likes: 3,
                dislikes: 1,
                userLike: 'licked'
            },
            {
                id: '2p',
                userId: 'user2',
                avatar: 'https://avatars.com/image2.jpg',
                createDate: '23-05-2022',
                text: 'Second post!',
                userName: 'Adam Sandler',
                likes: 15,
                dislikes: 5,
                userLike: undefined
            }
            ];
        const dispatched: any[] = [];
        //@ts-ignore
        api.getPosts = jest.fn().mockResolvedValue({resultCode: ResultCode.Success, data: { posts: posts }})

        await runSaga(
            {
                dispatch: (action) => dispatched.push(action),
                getState: () => ({})
            },
            //@ts-ignore
            getPostsSaga,
            action
        ).toPromise();

        expect(api.getPosts).toHaveBeenCalledWith(userId, expect.anything());
        expect(dispatched).toEqual([
            {
                type: SET_POSTS,
                payload: {
                    posts
                }
            }
        ])
    });

    it('puts error data to store if error was got from server', async () => {
        const errorMessage = 'Request failed';
        const dispatched: any[] = [];
        //@ts-ignore
        api.getPosts = jest.fn().mockResolvedValue({resultCode: ResultCode.Error, message: errorMessage})

        await runSaga(
            {
                dispatch: (action) => dispatched.push(action),
                getState: () => ({})
            },
            //@ts-ignore
            getPostsSaga,
            action
        ).toPromise();

        expect(api.getPosts).toHaveBeenCalledWith(userId, expect.anything());
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
        api.getPosts = jest.fn().mockRejectedValue(errorMessage)

        await runSaga(
            {
                dispatch: (action) => dispatched.push(action),
                getState: () => ({})
            },
            //@ts-ignore
            getPostsSaga,
            action
        ).toPromise();

        expect(api.getPosts).toHaveBeenCalledWith(userId, expect.anything());
        expect(dispatched).toEqual([
            {
                type: SET_ERROR, 
                payload: { error: errorMessage.toUpperCase() }
            }
        ])
    });
});