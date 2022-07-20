/** Absolute imports */
import { runSaga } from "redux-saga";

/** APIs */
import * as api from "../../../services/profileService";

/** Types */
import { ResultCode } from "../../types";
import { GET_USER_PROFILE, SET_ERROR, SET_PROFILE_WAS_SAVED } from "../actionTypes";
import { ProfileType } from "../types";

/** Sagas */
import saveProfileSaga from "./saveProfileSaga";


describe('saveProfile Saga', () => {

    const userProfile: ProfileType = {
        id: '1a',
        userId: 'user-id-1',
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
    const userId = 'user-id-1';
    const action = {
        payload: {
            profile: userProfile
        }
    };

    it('puts profileWasSaved to store and gets the new UserProfile if no errors', async () => {
        const dispatched: any[] = [];
        //@ts-ignore
        api.saveProfile = jest.fn().mockResolvedValue({resultCode: ResultCode.Success });

        await runSaga(
            {
                dispatch: (action) => dispatched.push(action),
                getState: () => ({auth: { userId}})
            },
            //@ts-ignore
            saveProfileSaga,
            action
        ).toPromise();

        expect(api.saveProfile).toHaveBeenCalledWith(userProfile, expect.anything());
        expect(dispatched).toEqual([
            {  
                type: SET_PROFILE_WAS_SAVED,
                payload: {
                    profileWasSaved: false
                }
            },
            {
                type: GET_USER_PROFILE,
                payload: {
                    userId
                }
            },
            {  
                type: SET_PROFILE_WAS_SAVED,
                payload: {
                    profileWasSaved: true
                }
            }
        ])
    });

    it('puts error to store if no userId in the store', async () => {
        const errorMessage = "UserId can't be null";
        const dispatched: any[] = [];
        //@ts-ignore
        api.saveProfile = jest.fn().mockResolvedValue({resultCode: ResultCode.Success });

        await runSaga(
            {
                dispatch: (action) => dispatched.push(action),
                getState: () => ({})
            },
            //@ts-ignore
            saveProfileSaga,
            action
        ).toPromise();

        expect(api.saveProfile).toHaveBeenCalledWith(userProfile, expect.anything());
        expect(dispatched).toEqual([
            {  
                type: SET_PROFILE_WAS_SAVED,
                payload: {
                    profileWasSaved: false
                }
            },
            {
                type: SET_ERROR, 
                payload: { error: errorMessage }
            }
        ])
    });

    it('puts error data to store if error was got from server', async () => {
        const errorMessage = 'Request failed';
        const dispatched: any[] = [];
        //@ts-ignore
        api.saveProfile = jest.fn().mockResolvedValue({resultCode: ResultCode.Error, message: errorMessage})

        await runSaga(
            {
                dispatch: (action) => dispatched.push(action),
                getState: () => ({auth: { userId}})
            },
            //@ts-ignore
            saveProfileSaga,
            action
        ).toPromise();

        expect(api.saveProfile).toHaveBeenCalledWith(userProfile, expect.anything());
        expect(dispatched).toEqual([
            {  
                type: SET_PROFILE_WAS_SAVED,
                payload: {
                    profileWasSaved: false
                }
            },
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
        api.saveProfile = jest.fn().mockRejectedValue(errorMessage)

        await runSaga(
            {
                dispatch: (action) => dispatched.push(action),
                getState: () => ({auth: { userId}})
            },
            //@ts-ignore
            saveProfileSaga,
            action
        ).toPromise();

        expect(api.saveProfile).toHaveBeenCalledWith(userProfile, expect.anything());
        expect(dispatched).toEqual([
            {  
                type: SET_PROFILE_WAS_SAVED,
                payload: {
                    profileWasSaved: false
                }
            },
            {
                type: SET_ERROR, 
                payload: { error: errorMessage.toUpperCase() }
            }
        ])
    });
});