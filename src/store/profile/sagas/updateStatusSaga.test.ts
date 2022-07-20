/** Absolute imports */
import { runSaga } from "redux-saga";

/** APIs */
import * as api from "../../../services/profileService";

/** Types */
import { ResultCode } from "../../types";
import { SET_ERROR, SET_STATUS } from "../actionTypes";

/** Sagas */
import updateStatusSaga from "./updateStatusSaga";


describe('updateStatus Saga', () => {

    const status = 'my new status';
    const action = {
        payload: {
            status
        }
    };

    it('puts status to store if no errors', async () => {
        const dispatched: any[] = [];
        //@ts-ignore
        api.updateStatus = jest.fn().mockResolvedValue({resultCode: ResultCode.Success })

        await runSaga(
            {
                dispatch: (action) => dispatched.push(action),
                getState: () => ({})
            },
            //@ts-ignore
            updateStatusSaga,
            action
        ).toPromise();

        expect(api.updateStatus).toHaveBeenCalledWith(status, expect.anything());
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
        api.updateStatus = jest.fn().mockResolvedValue({resultCode: ResultCode.Error, message: errorMessage})

        await runSaga(
            {
                dispatch: (action) => dispatched.push(action),
                getState: () => ({})
            },
            //@ts-ignore
            updateStatusSaga,
            action
        ).toPromise();

        expect(api.updateStatus).toHaveBeenCalledWith(status, expect.anything());
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
        api.updateStatus = jest.fn().mockRejectedValue(errorMessage)

        await runSaga(
            {
                dispatch: (action) => dispatched.push(action),
                getState: () => ({})
            },
            //@ts-ignore
            updateStatusSaga,
            action
        ).toPromise();

        expect(api.updateStatus).toHaveBeenCalledWith(status, expect.anything());
        expect(dispatched).toEqual([
            {
                type: SET_ERROR, 
                payload: { error: errorMessage.toUpperCase() }
            }
        ])
    });
});