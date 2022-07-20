import reducer, { INITIAL_STATE as initialState } from './reducer';
import * as t from './actionTypes';
import { ChatState } from './types';
import { StatusType } from '../../services/api-ws';

/** WSS Messages */
export const messages = [
{
    action: 'getMessagesFromUser',
    messages: [
        {
            from: 'user1',
            to: 'user2',
            text: 'Hello Ben!',
            createDate: '7/7/2022, 8:30:43 AM',
            updateDate: '7/7/2022, 8:30:43 AM',
            fromPhoto: ''
        },
        {
            from: 'user2',
            to: 'user1',
            text: 'Hello Cameron!',
            createDate: '7/7/2022, 8:33:43 AM',
            updateDate: '7/7/2022, 8:33:43 AM',
            fromPhoto: ''
        }
    ]
},
{
    action: 'getUserAvatar',
    usersAvatarsFriends: [
        {
            userId: 'user1',
            userAvatar: '/upload/avatar1',
            userName: 'Cameron'
        }
    ]
},
{
    action: 'getUserAvatar',
    userAvatar: {
        userId: 'user2',
        userAvatar: '/upload/avatar2',
        userName: 'Ben'
    },
},
{
    onlineUsers: [
        {
            userId: 'user2',
            photo: '/upload/avatar2',
            userName: 'Ben'
        }
    ],
},
{
    action: 'getChatList',
    chatList: [
        {
            from: 'user1',
            to: 'user2',
            fromPhoto: '/upload/photo1',
            toPhoto:   '/upload/photo2',
            updateDate: '7/10/2022, 6:14:14 PM',
            text: 'Hello wold!',
            fromUserName: 'Ben',
            toUserName: 'Cameron',
            userId: 'user1'
        }
    ]
}
]; 

describe('Chat Reducer', () => {

    /** MESSAGES_RECEIVED */
    it('MESSAGES_RECEIVED - received only one message (#3).', () => {
        const action = {
            type: t.MESSAGES_RECEIVED,
            payload: {
                messages: messages[3]
            }
        }

        const result = {
            action: '',
            messages: [],
            message: undefined,
            onlineUsers: messages[3].onlineUsers,   // Will changed only this field
            chatList: [],
            userAvatar: undefined,
            usersAvatarsFriends: []
        }

        expect(reducer(initialState, action)).toEqual({
            ...initialState,
            data: result
        })
    });

    it('MESSAGES_RECEIVED - received 5 messages one by one.', () => {

        /** Index is a number of message list */
        const action = (index: number) => ({
            type: t.MESSAGES_RECEIVED,
            payload: {
                messages: messages[index]
            }
        });
        /** Every next result is addition new values to previous results */
        const result = (index: number) => ({
            action:                 index >= 0 ? messages[index].action??'' : '',
            messages:               index >= 0 ? messages[0].messages : [],
            usersAvatarsFriends:    index >= 1 ? messages[1].usersAvatarsFriends : [],
            userAvatar:             index >= 2 ? messages[2].userAvatar : undefined,
            onlineUsers:            index >= 3 ? messages[3].onlineUsers : [],
            chatList:               index >= 4 ? messages[4].chatList : [],
            message:                undefined,                     
        });

        const initialStateWithMessages = (index: number) => ({
            ...initialState,
            data: result(index-1)   // Every next initial State = previous result (index - 1)
        } as ChatState);

        // First message
        expect(reducer(initialStateWithMessages(0), action(0))).toEqual({
            ...initialState,
            data: result(0)
        });
        // Second message
        expect(reducer(initialStateWithMessages(1), action(1))).toEqual({
            ...initialState,
            data: result(1)
        });
        // Third message
        expect(reducer(initialStateWithMessages(2), action(2))).toEqual({
            ...initialState,
            data: result(2)
        });
        // Fourth message
        expect(reducer(initialStateWithMessages(3), action(3))).toEqual({
            ...initialState,
            data: { ...result(3), action: messages[2].action}   // Messages[3] don't have action field for this reason get this value from previous message
        });
        // 5th message
        expect(reducer(initialStateWithMessages(4), action(4))).toEqual({
            ...initialState,
            data: result(4)
        });
    });
    
    /** STATUS_CHANGED */
    it('STATUS_CHANGED - status was changed', () => {
        const action = {
            type: t.STATUS_CHANGED,
            payload: {
                status: StatusType.READY
            }
        }

        expect(reducer(initialState, action)).toEqual({
            ...initialState,
            status: StatusType.READY
        })
    });

    /** RESET_CHAT_LIST */
    it('RESET_CHAT_LIST - reset completed chat list (became empty [])', () => {
        const initialStateWithChatList = {
            ...initialState,
            data: {
                ...initialState.data,
                ...messages[4]
            }
        };

        const action = {
            type: t.RESET_CHAT_LIST,
        }

        expect(reducer(initialStateWithChatList, action)).toEqual({
            ...initialStateWithChatList,
            data: {
                ...initialState.data,
                action: 'getChatList',
                chatList: []
            }
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
})