import { Dispatch } from "redux";
import { StatusType } from "../../services/api-ws";
import { ChatType } from "./types";

export const MESSAGES_RECEIVED = "[CHAT] MESSAGES_RECEIVED";
export const STATUS_CHANGED = "[CHAT] STATUS_CHANGED";
export const RESET_CHAT_LIST = "[CHAT] RESET_CHAT_LIST";
export const START_MESSAGES_LISTENING = "[CHAT] START_MESSAGES_LISTENING";
export const STOP_MESSAGES_LISTENING = "[CHAT] STOP_MESSAGES_LISTENING";
export const SET_ERROR = "[CHAT] SET_ERROR";
export const SEND_MESSAGE = "[CHAT] SEND_MESSAGE";
export const GET_CHAT_LIST = "[CHAT] GET_CHAT_LIST";
export const GET_MESSAGES_FROM_USER = "[CHAT] GET_MESSAGES_FROM_USER";
export const GET_USER_AVATAR = "[CHAT] GET_USER_AVATAR";


export interface GetUserAvatar {
    type: typeof GET_USER_AVATAR;
    payload: {
        userId: string
    }
}

export interface GetMessagesFromUser {
    type: typeof GET_MESSAGES_FROM_USER;
    payload: {
        userId: string
    }
}

export interface GetChatList {
    type: typeof GET_CHAT_LIST;
}

export interface SendMessage {
    type: typeof SEND_MESSAGE;
    payload: {
        email: string; 
        text: string; 
        addressee: string;
    }
}

export interface StartMessagesListening {
    type: typeof START_MESSAGES_LISTENING;
    payload: {
        dispatch: Dispatch<any>
    }
}

export interface StopMessagesListening {
    type: typeof STOP_MESSAGES_LISTENING;
    payload: {
        dispatch: Dispatch<any>
    }
}

export interface MessagesReceived {
    type: typeof MESSAGES_RECEIVED;
    payload: {
        messages: ChatType[]
    }
}

export interface StatusChanged {
    type: typeof STATUS_CHANGED;
    payload: {
        status: StatusType
    }
}

export interface ResetChatList {
    type: typeof RESET_CHAT_LIST;
}

/** Error */
export interface SetError {
    type: typeof SET_ERROR;
    payload: { 
        error: string | undefined;
    } 
}


export type ChatActions =
    | MessagesReceived
    | StatusChanged
    | ResetChatList
    | SetError;