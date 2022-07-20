import * as t from './actionTypes'
import * as a from './actions';


describe('User Actions', () => {

    const users = [
        {
            id: 'user1',
            name: 'Bob',
            status: '',
            photos: {
                small: '/uploads/smallImage1.jpg',
                large: '/uploads/largeImage1.jpg'
            },
            followed: true
        },
        {
            id: 'user2',
            name: 'Cameron',
            status: '',
            photos: {
                small: '/uploads/smallImage2.jpg',
                large: '/uploads/largeImage2.jpg'
            },
            followed: false
        },
    ];

    it('followRequest(): should attach userId.', () => {
        const expectedAction = {
            type: t.FOLLOW_REQUEST,
            payload: {
                userId: 'user1'
            }
        }

        expect(a.followRequest('user1')).toEqual(expectedAction)
    });

    it('unFollowRequest(): should attach userId.', () => {
        const expectedAction = {
            type: t.UNFOLLOW_REQUEST,
            payload: {
                userId: 'user1'
            }
        }

        expect(a.unFollowRequest('user1')).toEqual(expectedAction)
    });

    it('getUsersRequest(): should attach data.', () => {
        const expectedAction = {
            type: t.GET_USERS_REQUEST,
            payload: {
                page: 1, 
                pageSize: 2,
                filter: null    // At the moment it works without filter
            }
        }

        expect(a.getUsersRequest(1, 2, null)).toEqual(expectedAction)
    });

    it('followSuccess(): should attach userId.', () => {
        const expectedAction = {
            type: t.FOLLOW,
            payload: {
                userId: 'user1'
            }
        }

        expect(a.followSuccess('user1')).toEqual(expectedAction)
    });

    it('unFollowSuccess(): should attach userId.', () => {
        const expectedAction = {
            type: t.UNFOLLOW,
            payload: {
                userId: 'user1'
            }
        }

        expect(a.unFollowSuccess('user1')).toEqual(expectedAction)
    });
    
    it('setUsers(): should attach users.', () => {
        const expectedAction = {
            type: t.SET_USERS,
            payload: {
                users: users
            }
        };

        expect(a.setUsers(users)).toEqual(expectedAction)
    });

    it('setCurrentPage(): should attach currentPage.', () => {
        const expectedAction = {
            type: t.SET_CURRENT_PAGE,
            payload: {
                currentPage: 3
            }
        };

        expect(a.setCurrentPage(3)).toEqual(expectedAction)
    });

    it('setFilter(): should attach filter.', () => {
        const expectedAction = {
            type: t.SET_FILTER,
            payload: {
                filter: {
                    term: '',
                    friend: true
                }
            }
        };

        expect(a.setFilter({ term: '', friend: true })).toEqual(expectedAction);
    });

    it('setTotalUsersCount(): should attach totalCount.', () => {
        const expectedAction = {
            type: t.SET_TOTAL_USERS_COUNT,
            payload: {
                totalCount: 8
            }
        };

        expect(a.setTotalUsersCount(8)).toEqual(expectedAction);
    });

    it('toggleIsFetching(): should attach isFetching.', () => {
        const expectedAction = {
            type: t.TOGGLE_IS_FETCHING,
            payload: {
                isFetching: true
            }
        };

        expect(a.toggleIsFetching(true)).toEqual(expectedAction);
    });

    it('toggleFollowingProgress(): should attach isFetching.', () => {
        const expectedAction = {
            type: t.TOGGLE_IS_FOLLOWING_PROGRESS,
            payload: {
                isFetching: true, 
                userId: 'user1'
            }
        };

        expect(a.toggleFollowingProgress(true, 'user1')).toEqual(expectedAction);
    });

    it('setError(): should attach error message.', () => {
        const expectedAction = {
            type: t.SET_ERROR,
            payload: {
                error: 'some error!'
            }
        };

        expect(a.setError('some error!')).toEqual(expectedAction);
    });
});