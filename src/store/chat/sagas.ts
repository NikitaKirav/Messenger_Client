/** Absolute import */
import { takeLatest } from "redux-saga/effects";

/** Redux */
import getChatListSaga from "./sagas/getChatListSaga";
import getMessagesFromUserSaga from "./sagas/getMessagesFromUserSaga";
import getUserAvatarSaga from "./sagas/getUserAvatarSaga";
import sendMessageSaga from "./sagas/sendMessageSaga";
import startMessagesListeningSaga from "./sagas/startMessagesListeningSaga";
import stopMessagesListeningSaga from "./sagas/stopMessagesListeningSaga";

/** Types */
import {
    GET_CHAT_LIST, 
    GET_MESSAGES_FROM_USER, 
    GET_USER_AVATAR, 
    SEND_MESSAGE,
    START_MESSAGES_LISTENING,
    STOP_MESSAGES_LISTENING, 
} from "./actionTypes";


function* watchUserSagas() {
  yield takeLatest(GET_CHAT_LIST, getChatListSaga);
  yield takeLatest(GET_MESSAGES_FROM_USER, getMessagesFromUserSaga);
  yield takeLatest(GET_USER_AVATAR, getUserAvatarSaga);
  yield takeLatest(SEND_MESSAGE, sendMessageSaga);
  yield takeLatest(START_MESSAGES_LISTENING, startMessagesListeningSaga);
  yield takeLatest(STOP_MESSAGES_LISTENING, stopMessagesListeningSaga);
}

export default watchUserSagas;