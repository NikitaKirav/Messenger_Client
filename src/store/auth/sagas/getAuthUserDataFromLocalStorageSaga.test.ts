/** Absolute imports */
import { runSaga } from "redux-saga";
import { mockLocalStorage } from "../../../utils/mockLocalStorage";

/** Types */
import { SET_USER_DATA } from "../actionTypes";

/** Sagas */
import getAuthUserDataFromLocalStorageSaga from "./getAuthUserDataFromLocalStorageSaga";

const { getItemMock, setItemMock } = mockLocalStorage();

describe('initialize Saga', () => {

    const action = {};

    it('puts local user auth to store if no errors', async () => {
        const dispatched: any[] = [];

        const userId = 'user-id-1';
        const token = 'token-id';
    
        let mockFridge = `{"userId":"${userId}","token":"${token}"}`;
        getItemMock.mockReturnValue(mockFridge);
        
        await runSaga(
            {
                dispatch: (action) => dispatched.push(action),
                getState: () => ({})
            },
            //@ts-ignore
            getAuthUserDataFromLocalStorageSaga,
            //@ts-ignore
            action
        ).toPromise();

        expect(dispatched).toEqual([
            {
                type: SET_USER_DATA, 
                payload: { userId, token, isAuth: !!token } 
            }
        ])
    });

});