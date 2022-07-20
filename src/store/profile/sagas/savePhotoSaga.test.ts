/** Absolute imports */
import { runSaga } from "redux-saga";

/** APIs */
import * as api from "../../../services/profileService";

/** Types */
import { ResultCode } from "../../types";
import { SAVE_PHOTO_SUCCESS, SET_ERROR } from "../actionTypes";

/** Sagas */
import savePhotoSaga from "./savePhotoSaga";


describe('savePhoto Saga', () => {

    const file = new File(["dummy content"], "example.png", {
        type: "image/png",
    });
    const action = {
        payload: {
            file
        }
    };

    it('puts photos urls to store if no errors', async () => {
        const photos = {
            small: '/uploads/smallImage.jpg',
            large: '/uploads/largeImage.jpg'
        };
        const dispatched: any[] = [];
        //@ts-ignore
        api.savePhoto = jest.fn().mockResolvedValue({resultCode: ResultCode.Success, data: { photos } })

        await runSaga(
            {
                dispatch: (action) => dispatched.push(action),
                getState: () => ({})
            },
            //@ts-ignore
            savePhotoSaga,
            action
        ).toPromise();

        expect(api.savePhoto).toHaveBeenCalledWith(file);
        expect(dispatched).toEqual([
            {
                type: SAVE_PHOTO_SUCCESS,
                payload: {
                    photos
                }
            }
        ])
    });

    it('puts error data to store if error was got from server', async () => {
        const errorMessage = 'Request failed';
        const dispatched: any[] = [];
        //@ts-ignore
        api.savePhoto = jest.fn().mockResolvedValue({resultCode: ResultCode.Error, message: errorMessage})

        await runSaga(
            {
                dispatch: (action) => dispatched.push(action),
                getState: () => ({})
            },
            //@ts-ignore
            savePhotoSaga,
            action
        ).toPromise();

        expect(api.savePhoto).toHaveBeenCalledWith(file);
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
        api.savePhoto = jest.fn().mockRejectedValue(errorMessage)

        await runSaga(
            {
                dispatch: (action) => dispatched.push(action),
                getState: () => ({})
            },
            //@ts-ignore
            savePhotoSaga,
            action
        ).toPromise();

        expect(api.savePhoto).toHaveBeenCalledWith(file);
        expect(dispatched).toEqual([
            {
                type: SET_ERROR, 
                payload: { error: errorMessage.toUpperCase() }
            }
        ])
    });
});