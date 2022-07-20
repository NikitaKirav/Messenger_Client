import reducer, { INITIAL_STATE as initialState } from './reducer'
import * as t from './actionTypes'

describe('Auth Reducer', () => {

    /** LOGIN_REQUEST */
    it('LOGIN_REQUEST - began the process isLoading.', () => {
        const action = {
            type: t.LOGIN_REQUEST,
        }

        expect(reducer(initialState, action)).toEqual({
            ...initialState,
            isLoadingAuth: true
        })
    });

    /** LOGIN_SUCCESS */
    it('LOGIN_SUCCESS - stop the process isLoading.', () => {
        const action = {
            type: t.LOGIN_SUCCESS,
        }

        expect(reducer(initialState, action)).toEqual({
            ...initialState,
            isLoadingAuth: false
        })
    });

    /** LOGIN_FAILURE */
    it('LOGIN_FAILURE - stop the process isLoading.', () => {
        const action = {
            type: t.LOGIN_FAILURE,
        }

        expect(reducer(initialState, action)).toEqual({
            ...initialState,
            isLoadingAuth: false
        })
    });

    /** SET_USER_DATA */
    it('SET_USER_DATA - saved user data.', () => {
        const action = {
            type: t.SET_USER_DATA,
            payload: {
                userId: 'user1', 
                token: 'token-for-user1',
                isAuth: true
            }
        }

        expect(reducer(initialState, action)).toEqual({
            ...initialState,
            userId: 'user1', 
            token: 'token-for-user1',
            isAuth: true
        })
    });

    /** SET_REGISTER_SUCCESS */
    it('SET_REGISTER_SUCCESS - register was successful.', () => {
        const action = {
            type: t.SET_REGISTER_SUCCESS,
            payload: { 
                registerSuccess: true
            } 
        }

        expect(reducer(initialState, action)).toEqual({
            ...initialState,
            registerSuccess: true
        })
    });

    /** SET_ERROR */
    it('SET_ERROR - saved an error message.', () => {
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

    /** INITIALIZED_SUCCESS */
    it('INITIALIZED_SUCCESS - initialized was successful.', () => {
        const action = {
            type: t.INITIALIZED_SUCCESS,
        }

        expect(reducer(initialState, action)).toEqual({
            ...initialState,
            initialized: true
        })
    });
    
})