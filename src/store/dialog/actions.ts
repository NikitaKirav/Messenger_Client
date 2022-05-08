import { SendMessage, SEND_MESSAGE } from "./actionTypes";

export const sendMessage = (newMessageBody: string): SendMessage => ({
    type: SEND_MESSAGE,
    payload: {
        newMessageBody
    }
});