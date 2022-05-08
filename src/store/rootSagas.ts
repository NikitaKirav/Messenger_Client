/** Absolute imports */
import { all, fork } from "redux-saga/effects";

/** Redux */
import watchAuthSagas from "./auth/sagas";
import watchUserSagas from "./user/sagas";
import watchProfileSagas from "./profile/sagas";
import watchChatSagas from "./chat/sagas";

function* rootSaga() {
  yield all([fork(watchAuthSagas)]);
  yield all([fork(watchUserSagas)]);
  yield all([fork(watchProfileSagas)]);
  yield all([fork(watchChatSagas)]);
}

export default rootSaga;
