import { StatusType } from "../../services/api-ws";



export interface ChatState {
    data: ChatType;
    status: StatusType;
    error: string | undefined;
}

export interface ChatType {
    action: string;
    message: ChatMessageType | undefined;
    messages: Array<ChatMessageType>;
    onlineUsers: Array<OnlineUsersType>;
    chatList: Array<LastMessageInChatList>;
    userAvatar: UserAvatarType | undefined;
    usersAvatarsFriends: Array<UserAvatarType>;
}

export interface ChatMessageType {
    from: string;
    to: string;
    text: string;
    createDate: string;
    updateDate: string;
    fromPhoto: string;
}

export interface OnlineUsersType {
    photo: string;
    userId: string;
    userName: string;
}

export interface LastMessageInChatList {
    from: string;
    to: string;
    fromPhoto: string;
    toPhoto: string;
    updateDate: string;
    text: string;
    fromUserName: string;
    toUserName: string;
    userId: string;
}

export interface UserAvatarType {
    userId: string;
    userAvatar: string;
    userName: string;
}

export type MessagesReceivedSubscriberType = (messages: ChatType[]) => void;

export type StatusChangedSubscriberType = (status: StatusType) => void;
