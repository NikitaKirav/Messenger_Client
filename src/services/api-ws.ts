import { MessagesReceivedSubscriberType, StatusChangedSubscriberType } from "../store/chat/types";
import { baseUrl_Ws } from "./baseURL";

let _ws: WebSocket | null = null;

export enum EventsName {
    MESSAGES = 'messages-received', 
    STATUS = 'status-changed'
}

export enum StatusType {
    PENDING = 'pending', 
    READY = 'ready',
    ERROR = 'error'
}

export type EventsNamesType = typeof EventsName.MESSAGES | typeof EventsName.STATUS;


export const subscribes = {
    [EventsName.MESSAGES]: [] as MessagesReceivedSubscriberType[],
    [EventsName.STATUS]: [] as StatusChangedSubscriberType[]
};

/**
 * Remove all opened EventListeners
 */
export const cleanUp = () => {
    _ws?.removeEventListener('close', _closeHandler);
    _ws?.removeEventListener('message', _messageHandler);
    _ws?.removeEventListener('open', _openHandler);
    _ws?.removeEventListener('error', _errorHandler);
}

/**
 * Close WebSocket connection
 */
export const close = () => {
    _ws?.close();
}

/**
 * Send a message using WebSocket
 * @param message - (string)
 */
export const sendMessage = (message: string) => {
    _ws?.send(message);
}

/**
 * Open a new WebSocket channel
 * Ps: the old channel will be closed  
 */
export const createChannel = () => {
    cleanUp();
    _ws?.close();
    _ws = new WebSocket(baseUrl_Ws); //'ws://localhost:8081' //wss://kirav.ru:8050
    _notifySubscribersAboutStatus(StatusType.PENDING);
    _ws.addEventListener('close', _closeHandler);
    _ws.addEventListener('message', _messageHandler);
    _ws.addEventListener('open', _openHandler);
    _ws.addEventListener('error', _errorHandler);
}

/**
 * Private function block
 */

const _notifySubscribersAboutStatus = (status: StatusType) => {
    subscribes[EventsName.STATUS].forEach(s => s(status));
}

const _closeHandler = () => {
    _notifySubscribersAboutStatus(StatusType.PENDING);
    setTimeout(createChannel, 3000);
}

const _messageHandler = (e: MessageEvent) => {
    const newMessages = JSON.parse(e.data);
    subscribes[EventsName.MESSAGES].forEach(s => s(newMessages));
}

const _openHandler = () => {
    _notifySubscribersAboutStatus(StatusType.READY);
    const userData = localStorage.getItem('userData_Messanger') ? JSON.parse(localStorage.getItem('userData_Messanger')??'{}') : '{}';
    if (userData && userData.token) {
        _ws?.send(`{"token": "${userData.token}", "action": "auntification"}`);
    }
}

const _errorHandler = () => {
    _notifySubscribersAboutStatus(StatusType.ERROR);
}