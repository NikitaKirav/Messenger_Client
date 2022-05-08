import {  
    MessagesReceivedSubscriberType, 
    StatusChangedSubscriberType 
} from "../store/chat/types";
import * as ws from "./api-ws";
import { EventsNamesType } from "./api-ws";


export const start = () => {
    ws.createChannel();
}

export const stop = () => {
    ws.subscribes['messages-received'] = [];
    ws.subscribes['status-changed'] = [];
    ws.cleanUp();
    ws.close();
}

export const subscribe = (
    eventName: EventsNamesType, 
    callback: MessagesReceivedSubscriberType | StatusChangedSubscriberType) => {
        //@ts-ignore
        ws.subscribes[eventName].push(callback);
        return () => {
            //@ts-ignore
            ws.subscribes[eventName] = ws.subscribes[eventName].filter(s => s !== callback);
        }
}

export const unsubscribe = (
    eventName: EventsNamesType, 
    callback: MessagesReceivedSubscriberType | StatusChangedSubscriberType) => {
        return () => {
            //@ts-ignore
            ws.subscribes[eventName] = ws.subscribes[eventName].filter(s => s !== callback);  
        }
}

export const sendMessage = (userId: string, text: string, addressee: string) => {
    const userData = JSON.parse(localStorage.getItem('userData_Messanger')??'');
    if (userData) {
        ws.sendMessage(`{"from": "${userId}", "text": "${text}", "to": "${addressee}", "token": "${userData.token}", "action": "saveMessage" }`);
    }
}

export const getChatList = () => {
    const userData = JSON.parse(localStorage.getItem('userData_Messanger')??'');
    if (userData) {
        ws.sendMessage(`{"token": "${userData.token}", "action": "getChatList" }`);
    }
}

export const getMessagesFromUser = (userId: string) => {
    const userData = JSON.parse(localStorage.getItem('userData_Messanger')??'');
    if (userData) {
        ws.sendMessage(`{"token": "${userData.token}", "action": "getMessagesFromUser", "to": "${userId}" }`);
    }
}

export const getUserAvatar = (userId: string) => {
    const userData = JSON.parse(localStorage.getItem('userData_Messanger')??'');
    if (userData) {
        ws.sendMessage(`{"token": "${userData.token}", "action": "getUserAvatar", "userId": ["${userId}"] }`);
    }
}
    