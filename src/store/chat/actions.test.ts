import * as t from './actionTypes'
import * as a from './actions';
import { ChatType } from './types';
import { StatusType } from '../../services/api-ws';


describe('Chat Actions', () => {

    it('getUserAvatar(): should attach userId.', () => {
        const expectedAction = {
            type: t.GET_USER_AVATAR,
            payload: {
                userId: 'user-id-1'
            }
        }

        expect(a.getUserAvatar('user-id-1')).toEqual(expectedAction)
    });

    it('getMessagesFromUser(): should attach userId.', () => {
        const expectedAction = {
            type: t.GET_MESSAGES_FROM_USER,
            payload: {
                userId: 'user-id-1'
            }
        }

        expect(a.getMessagesFromUser('user-id-1')).toEqual(expectedAction)
    });

    it('getChatList(): should create an action to set Chat List.', () => {
        const expectedAction = {
            type: t.GET_CHAT_LIST,
        }

        expect(a.getChatList()).toEqual(expectedAction)
    });

    it('startMessagesListening(): should attach dispatch.', () => {
        const dispatch = jest.fn();
        const expectedAction = {
            type: t.START_MESSAGES_LISTENING,
            payload: {
                dispatch
            }
        }

        expect(a.startMessagesListening(dispatch)).toEqual(expectedAction)
    });

    it('stopMessagesListening(): should attach dispatch.', () => {
        const dispatch = jest.fn();
        const expectedAction = {
            type: t.STOP_MESSAGES_LISTENING,
            payload: {
                dispatch
            }
        }

        expect(a.stopMessagesListening(dispatch)).toEqual(expectedAction)
    });

    it('sendMessage(): should attach email, text, addressee.', () => {
        const expectedAction = {
            type: t.SEND_MESSAGE,
            payload: {
                email: 'user-id-1', 
                text: 'Hello my friend', 
                addressee: 'user-id-2'
            }
        }

        expect(a.sendMessage('user-id-1', 'Hello my friend', 'user-id-2')).toEqual(expectedAction)
    });

    it('messagesReceived(): should attach messages.', () => {

        const messageList = [{
            action:                 'getMessagesFromUser',
            messages:               [
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
            ],
            usersAvatarsFriends:    [],
            userAvatar:             undefined,
            onlineUsers:            [],
            chatList:               [],
            message:                undefined,                     
        },
        {
            action:                 'getUserAvatar',
            messages:               [],
            usersAvatarsFriends:    [],
            userAvatar:             {
                userId: 'user2',
                userAvatar: '/upload/avatar2',
                userName: 'Ben'
            },
            onlineUsers:            [],
            chatList:               [],
            message:                undefined,                     
        }] as ChatType[];

        const expectedAction = {
            type: t.MESSAGES_RECEIVED,
            payload: {
                messages: messageList
            }
        }

        expect(a.messagesReceived(messageList)).toEqual(expectedAction)
    });

    it('statusChanged(): should attach status.', () => {
        const expectedAction = {
            type: t.STATUS_CHANGED,
            payload: {
                status: StatusType.READY
            }
        }

        expect(a.statusChanged(StatusType.READY)).toEqual(expectedAction)
    });

    it('resetChatList(): should create an action to reset Chat List.', () => {
        const expectedAction = {
            type: t.RESET_CHAT_LIST,
        }

        expect(a.resetChatList()).toEqual(expectedAction)
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