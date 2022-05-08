import { Dispatch } from "redux";
import { StatusType } from "../../services/api-ws";
import { 
    GetChatList,
    GetMessagesFromUser,
    GetUserAvatar,
    GET_CHAT_LIST,
    GET_MESSAGES_FROM_USER,
    GET_USER_AVATAR,
    MessagesReceived, 
    MESSAGES_RECEIVED, 
    ResetChatList, 
    RESET_CHAT_LIST, 
    SendMessage, 
    SEND_MESSAGE, 
    SetError, 
    SET_ERROR, 
    StartMessagesListening, 
    START_MESSAGES_LISTENING, 
    StatusChanged, 
    STATUS_CHANGED, 
    StopMessagesListening, 
    STOP_MESSAGES_LISTENING
} from "./actionTypes";
import { ChatType } from "./types";

export const getUserAvatar = (userId: string): GetUserAvatar => ({
    type: GET_USER_AVATAR,
    payload: {
        userId
    }
});

export const getMessagesFromUser = (userId: string): GetMessagesFromUser => ({
    type: GET_MESSAGES_FROM_USER,
    payload: {
        userId
    }
});

export const getChatList = (): GetChatList => ({
    type: GET_CHAT_LIST
})

export const startMessagesListening = (dispatch: Dispatch<any>): StartMessagesListening => ({
    type: START_MESSAGES_LISTENING,
    payload: {
        dispatch
    }
});

export const stopMessagesListening = (dispatch: Dispatch<any>): StopMessagesListening => ({
    type: STOP_MESSAGES_LISTENING,
    payload: {
        dispatch
    }
});

export const sendMessage = (email: string, text: string, addressee: string): SendMessage => ({
    type: SEND_MESSAGE,
    payload: {
        email, text, addressee
    }
});

export const messagesReceived = (messages: ChatType[]): MessagesReceived => ({
    type: MESSAGES_RECEIVED,
    payload: {
        messages
    }
});

export const statusChanged = (status: StatusType): StatusChanged => ({
    type: STATUS_CHANGED,
    payload: {
        status
    }
});

export const resetChatList = (): ResetChatList => ({
    type: RESET_CHAT_LIST
});

/** Error */
export const setError = (error: string | undefined): SetError => ({
    type: SET_ERROR, 
    payload: { error }
});