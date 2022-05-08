export const SEND_MESSAGE = "[DIALOG] SEND_MESSAGE";

export interface SendMessage {
    type: typeof SEND_MESSAGE;
    payload: {
        newMessageBody: string
    }
}

export type DialogActions = 
    | SendMessage;