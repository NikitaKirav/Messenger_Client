import reducer, { INITIAL_STATE as initialState } from './reducer'
import * as t from './actionTypes'
import { UserType } from './types';

const getUser = (followed: boolean = false): Array<UserType> => {
    return [
        {
            id: '111',
            name: 'user1',
            status: '',
            photos: { small: null, large: null },
            followed: false
        },
        {
            id: '112',
            name: 'user2',
            status: '',
            photos: { small: null, large: null },
            followed: followed
        }
    ];
}

describe('User Reducer', () => {

    /** SET_USERS */
    it('SET_USERS - save new users.', () => {
        const action = {
            type: t.SET_USERS,
            payload: {
                users: getUser()
            }
        }

        expect(reducer(initialState, action)).toEqual({
            ...initialState,
            users: action.payload.users
        })
    });
    
    /** SET_ERROR */
    it('SET_ERROR - save an error message.', () => {
        const action = {
            type: t.SET_ERROR,
            payload: {
                error: 'Unknown error'
            }
        }

        expect(reducer(initialState, action)).toEqual({
            ...initialState,
            error: 'Unknown error'
        })
    });

    /** UNFOLLOW */
    it("UNFOLLOW - The field 'followed' = False, only in the selected user (userId = 112).", () => {
        const initialStateWithUsers = {
            ...initialState,
            users: getUser(true)    // users[1].followed = true
        };

        const action = {
            type: t.UNFOLLOW,
            payload: {
                userId: '112'
            }
        };

        expect(reducer(initialStateWithUsers, action)).toEqual({
            ...initialStateWithUsers,
            users: getUser()
        });
    });

    /** FOLLOW */
    it("FOLLOW - The field 'followed' = True, only in the selected user (userId = 112).", () => {
        const initialStateWithUsers = {
            ...initialState,
            users: getUser() // users[1].followed = false
        };

        const action = {
            type: t.FOLLOW,
            payload: {
                userId: '112'
            }
        };

        expect(reducer(initialStateWithUsers, action)).toEqual({
            ...initialStateWithUsers,
            users: getUser(true) // users[1].followed = true
        })
    });

    it('FOLLOW - Error: because users[1].followed = true.', () => {
        const initialStateWithUsers = {
            ...initialState,
            users: getUser() // users[1].followed = false
        };

        const action = {
            type: t.FOLLOW,
            payload: {
                userId: '112'
            }
        };

        expect(reducer(initialStateWithUsers, action)).not.toEqual({
            ...initialStateWithUsers
        })
    });

    /** SET_CURRENT_PAGE */
    it('SET_CURRENT_PAGE - save new current page.', () => {
        const action = {
            type: t.SET_CURRENT_PAGE,
            payload: {
                currentPage: 3
            }
        }

        expect(reducer(initialState, action)).toEqual({
            ...initialState,
            currentPage: action.payload.currentPage
        })
    });

    /** SET_TOTAL_USERS_COUNT */
    it('SET_TOTAL_USERS_COUNT - save users count.', () => {
        const action = {
            type: t.SET_TOTAL_USERS_COUNT,
            payload: {
                totalCount: 333
            }
        }

        expect(reducer(initialState, action)).toEqual({
            ...initialState,
            totalUsersCount: action.payload.totalCount
        })
    });

    /** TOGGLE_IS_FETCHING */
    it('TOGGLE_IS_FETCHING - change a field: isFetching.', () => {
        const initialStateWithCustomFetching = {
            ...initialState,
            isFetching: true
        };

        const action = {
            type: t.TOGGLE_IS_FETCHING,
            payload: {
                isFetching: false
            }
        }

        expect(reducer(initialStateWithCustomFetching, action)).toEqual({
            ...initialStateWithCustomFetching,
            isFetching: action.payload.isFetching
        })
    });

    /** SET_FILTER */
    it('SET_FILTER - save new parameters for filter', () => {
        const action = {
            type: t.SET_FILTER,
            payload: {
                filter: {
                    term: 'test',
                    friend: true
                }
            }
        }

        expect(reducer(initialState, action)).toEqual({
            ...initialState,
            filter: action.payload.filter
        })
    });

    /** TOGGLE_IS_FOLLOWING_PROGRESS */ //- Здесь может быть ошибка так как userId могут повторяться надо использовать Set возможно
    it("TOGGLE_IS_FOLLOWING_PROGRESS - add userId in the followingInProgress[] because 'isFetching: true'", () => {
        const initialStateWithFollowingInProgress = {
            ...initialState,
            followingInProgress: ['111', '113']
        };
        const action = {
            type: t.TOGGLE_IS_FOLLOWING_PROGRESS,
            payload: {
                isFetching: true, 
                userId: '112'
            }
        }

        expect(reducer(initialStateWithFollowingInProgress, action)).toEqual({
            ...initialStateWithFollowingInProgress,
            followingInProgress: ['111', '113', '112']
        })
    });

    it("TOGGLE_IS_FOLLOWING_PROGRESS - delete userId from the followingInProgress[] because 'isFetching: false'", () => {
        const initialStateWithFollowingInProgress = {
            ...initialState,
            followingInProgress: ['111', '112', '113']
        };
        const action = {
            type: t.TOGGLE_IS_FOLLOWING_PROGRESS,
            payload: {
                isFetching: false, 
                userId: '112'
            }
        }

        expect(reducer(initialStateWithFollowingInProgress, action)).toEqual({
            ...initialStateWithFollowingInProgress,
            followingInProgress: ['111', '113']
        })
    });
})