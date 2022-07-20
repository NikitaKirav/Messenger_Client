/** Absolute imports */
import { put, call } from "redux-saga/effects";

/** Services */
import { getChatList } from "../../../services/chatService";

/** Redux */
import { setError } from "../actions";


function* getChatListSaga() {

  try {
    yield call(getChatList);

  } catch (e) {
    if (typeof e === "string") {
        yield put(setError(e.toUpperCase()));
      } else if (e instanceof Error) {
        yield put(setError(e.message));
      }
  }
}

export default getChatListSaga;
