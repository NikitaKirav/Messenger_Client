/** Absolute imports */
import { runSaga } from "redux-saga";

/** APIs */
import * as api from "../../../services/userService";

/** Types */
import { SET_CURRENT_PAGE, SET_ERROR, SET_TOTAL_USERS_COUNT, SET_USERS, TOGGLE_IS_FETCHING } from "../actionTypes";

/** Sagas */
import getUsersSaga from "./getUsersSaga";


describe('getUsers Saga', () => {

    const page = 2, 
          pageSize = 20;
    const action = {
        payload: {
            page,
            pageSize,
            filter: undefined
        }
    };

    it('puts users data to store if no errors', async () => {
        const dispatched: any[] = [];
        const items = [
            {
                id: 'user-id-1',
                name: 'Bob',
                status: '',
                photos: {
                    small: '/uploads/smallImage1.jpg',
                    large: '/uploads/largeImage1.jpg'
                },
                followed: true
            },
            {
                id: 'user-id-2',
                name: 'Cameron',
                status: '',
                photos: {
                    small: '/uploads/smallImage2.jpg',
                    large: '/uploads/largeImage2.jpg'
                },
                followed: true
            }
        ];
        //@ts-ignore
        api.getUsers = jest.fn().mockResolvedValue({ data: { items: items, totalCount: 2 }})

        await runSaga(
            {
                dispatch: (action) => dispatched.push(action),
                getState: () => ({})
            },
            //@ts-ignore
            getUsersSaga,
            action
        ).toPromise();

        expect(api.getUsers).toHaveBeenCalledWith(page, pageSize, undefined, undefined, expect.anything());
        expect(dispatched).toEqual([
            {
                type: TOGGLE_IS_FETCHING,
                payload: {
                    isFetching: true
                }
            },
            {
                type: SET_CURRENT_PAGE,
                payload: {
                    currentPage: page
                }
            },
            {
                type: SET_USERS,
                payload: {
                    users: items
                }
            },
            {
                type: SET_TOTAL_USERS_COUNT,
                payload: {
                    totalCount: 2
                }
            },
            {
                type: TOGGLE_IS_FETCHING,
                payload: {
                    isFetching: false
                }
            },
        ])
    });

    it('puts error data to store if error was thrown', async () => {
        const errorMessage = 'Request failed';
        const dispatched: any[] = [];
        //@ts-ignore
        api.getUsers = jest.fn().mockRejectedValue(errorMessage)

        await runSaga(
            {
                dispatch: (action) => dispatched.push(action),
                getState: () => ({})
            },
            //@ts-ignore
            getUsersSaga,
            action
        ).toPromise();

        expect(api.getUsers).toHaveBeenCalledWith(page, pageSize, undefined, undefined, expect.anything());
        expect(dispatched).toEqual([
            {
                type: TOGGLE_IS_FETCHING,
                payload: {
                    isFetching: true
                }
            },
            {
                type: SET_CURRENT_PAGE,
                payload: {
                    currentPage: page
                }
            },
            {
                type: SET_ERROR, 
                payload: { error: errorMessage.toUpperCase() }
            }
        ])
    });
});