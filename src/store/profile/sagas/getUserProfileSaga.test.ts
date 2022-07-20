/** Absolute imports */
import { runSaga } from "redux-saga";

/** APIs */
import * as api from "../../../services/profileService";

/** Types */
import { ResultCode } from "../../types";
import { SET_ERROR, SET_USER_PROFILE } from "../actionTypes";
import { ProfileType } from "../types";

/** Sagas */
import getUserProfileSaga from "./getUserProfileSaga";


describe('getUserProfile Saga', () => {

    const userId = 'user-id-1';
    const action = {
        payload: {
            userId
        }
    };

    it('puts profile to store if no errors', async () => {
        const userProfile: ProfileType = {
            id: '1a',
            userId: 'user1',
            aboutMe: 'about me in details',
            lookingForAJob: true,
            lookingForAJobDescription: 'programmer',
            fullName: 'Bob Smith',
            contacts: {
                github: 'https://github.com/unknown',
                facebook: 'https://facebook.com/unknown',
            },
            photos: {
                small: 'https://example.com/small.jpg',
                large: 'https://example.com/large.jpg'
            }
        };
        const dispatched: any[] = [];
        //@ts-ignore
        api.getProfile = jest.fn().mockResolvedValue({resultCode: ResultCode.Success, data: userProfile })

        await runSaga(
            {
                dispatch: (action) => dispatched.push(action),
                getState: () => ({})
            },
            //@ts-ignore
            getUserProfileSaga,
            action
        ).toPromise();

        expect(api.getProfile).toHaveBeenCalledWith(userId, expect.anything());
        expect(dispatched).toEqual([
            {
                type: SET_USER_PROFILE,
                payload: {
                    profile: userProfile
                }
            }
        ])
    });

    it('puts error data to store if error was got from server', async () => {
        const errorMessage = 'Request failed';
        const dispatched: any[] = [];
        //@ts-ignore
        api.getProfile = jest.fn().mockResolvedValue({resultCode: ResultCode.Error, message: errorMessage})

        await runSaga(
            {
                dispatch: (action) => dispatched.push(action),
                getState: () => ({})
            },
            //@ts-ignore
            getUserProfileSaga,
            action
        ).toPromise();

        expect(api.getProfile).toHaveBeenCalledWith(userId, expect.anything());
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
        api.getProfile = jest.fn().mockRejectedValue(errorMessage)

        await runSaga(
            {
                dispatch: (action) => dispatched.push(action),
                getState: () => ({})
            },
            //@ts-ignore
            getUserProfileSaga,
            action
        ).toPromise();

        expect(api.getProfile).toHaveBeenCalledWith(userId, expect.anything());
        expect(dispatched).toEqual([
            {
                type: SET_ERROR, 
                payload: { error: errorMessage.toUpperCase() }
            }
        ])
    });
});