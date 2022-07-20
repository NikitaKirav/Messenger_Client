/** Absolute imports */
import { runSaga } from "redux-saga";

/** APIs */
import * as api from "../../../services/profileService";

/** Types */
import { ResultCode } from "../../types";
import { ADD_POST, SET_ERROR } from "../actionTypes";

/** Sagas */
import addPostSaga from "./addPostSaga";


describe('Add Post Saga', () => {

    const text = 'Hello world!',
          profileId = 'profile-id-1';
    const action = {
        payload: {
            text, 
            profileId
        }
    };

    it('puts user likes to store if no errors', async () => {
        const newPost = {
            id: 'post-id-1',
            userId: 'user-id-1',
            avatar: '/uploads/user1.jpg',
            createDate: "7/7/2022, 7:34:00 AM",
            text: 'Hello world!',
            userName: 'Kira',
            likes: 3,
            dislikes: 0,
            userLike: 'liked'
        }
        const dispatched: any[] = [];
        //@ts-ignore
        api.addPost = jest.fn().mockResolvedValue({resultCode: ResultCode.Success, post: newPost })

        await runSaga(
            {
                dispatch: (action) => dispatched.push(action),
                getState: () => ({})
            },
            //@ts-ignore
            addPostSaga,
            action
        ).toPromise();

        expect(api.addPost).toHaveBeenCalledWith(text, profileId, expect.anything());
        expect(dispatched).toEqual([
            {
                type: ADD_POST,
                payload: {
                    post: newPost
                }
            }
        ])
    });

    it('puts error data to store if error was thrown', async () => {
        const errorMessage = 'Request failed';
        const dispatched: any[] = [];
        //@ts-ignore
        api.addPost = jest.fn().mockRejectedValue(errorMessage)

        await runSaga(
            {
                dispatch: (action) => dispatched.push(action),
                getState: () => ({})
            },
            //@ts-ignore
            addPostSaga,
            action
        ).toPromise();

        expect(api.addPost).toHaveBeenCalledWith(text, profileId, expect.anything());
        expect(dispatched).toEqual([
            {
                type: SET_ERROR, 
                payload: { error: errorMessage.toUpperCase() }
            }
        ])
    });
});