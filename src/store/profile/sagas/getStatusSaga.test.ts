/** Absolute imports */
import { runSaga } from "redux-saga";

/** APIs */
import * as api from "../../../services/profileService";

/** Types */
import { ResultCode } from "../../types";
import { SET_ERROR, SET_STATUS } from "../actionTypes";

/** Sagas */
import getStatusSaga from "./getStatusSaga";


describe('getStatus Saga', () => {

    const userId = 'user-id-1';
    const action = {
        payload: {
            userId
        }
    };

    it('puts status to store if no errors', async () => {
        const status  = 'my new status';
        const dispatched: any[] = [];
        //@ts-ignore
        api.getStatus = jest.fn().mockResolvedValue({resultCode: ResultCode.Success, data: { status: status }})

        await runSaga(
            {
                dispatch: (action) => dispatched.push(action),
                getState: () => ({})
            },
            //@ts-ignore
            getStatusSaga,
            action
        ).toPromise();

        expect(api.getStatus).toHaveBeenCalledWith(userId, expect.anything());
        expect(dispatched).toEqual([
            {
                type: SET_STATUS,
                payload: {
                    status
                }
            }
        ])
    });

    it('puts error data to store if error was got from server', async () => {
        const errorMessage = 'Request failed';
        const dispatched: any[] = [];
        //@ts-ignore
        api.getStatus = jest.fn().mockResolvedValue({resultCode: ResultCode.Error, message: errorMessage})

        await runSaga(
            {
                dispatch: (action) => dispatched.push(action),
                getState: () => ({})
            },
            //@ts-ignore
            getStatusSaga,
            action
        ).toPromise();

        expect(api.getStatus).toHaveBeenCalledWith(userId, expect.anything());
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
        api.getStatus = jest.fn().mockRejectedValue(errorMessage)

        await runSaga(
            {
                dispatch: (action) => dispatched.push(action),
                getState: () => ({})
            },
            //@ts-ignore
            getStatusSaga,
            action
        ).toPromise();

        expect(api.getStatus).toHaveBeenCalledWith(userId, expect.anything());
        expect(dispatched).toEqual([
            {
                type: SET_ERROR, 
                payload: { error: errorMessage.toUpperCase() }
            }
        ])
    });
});