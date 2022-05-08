/** Absolute imports */
import { createSelector } from "reselect";

/** Redux */
import { INITIAL_STATE } from "./reducer";

/** Types */
import { ApplicationState } from "..";
import { ChatState } from "./types";

const selectChat = (state: ApplicationState): ChatState =>
  state.chat || INITIAL_STATE;

export const makeGetData = () =>
  createSelector(selectChat, (chatState) => chatState.data);

export const makeGetStatus = () =>
  createSelector(selectChat, (chatState) => chatState.status);

export const makeGetUsersAvatarsFriends = () =>
  createSelector(selectChat, (chatState) => chatState.data.usersAvatarsFriends);

export const makeGetMessage = () =>
  createSelector(selectChat, (chatState) => chatState.data.message);

export const makeGetMessages = () =>
  createSelector(selectChat, (chatState) => chatState.data.messages);

export const makeGetUserAvatar = () =>
  createSelector(selectChat, (chatState) => chatState.data.userAvatar);

export const makeGetcChatList = () =>
  createSelector(selectChat, (chatState) => chatState.data.chatList);