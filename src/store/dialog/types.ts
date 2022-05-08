export interface DialogState {
    dialogs: Array<DialogType>;
    messages: Array<MessageType>
}

export interface DialogType {
    id: number;
    name: string;
}

export interface MessageType {
    id: number;
    message: string;
}