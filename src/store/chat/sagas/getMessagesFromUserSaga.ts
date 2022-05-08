/** Absolute imports */
import { put, call } from "redux-saga/effects";

/** Services */
import { getMessagesFromUser } from "../../../services/chatService";

/** Redux */
import { setError } from "../actions";
import { GetMessagesFromUser } from "../actionTypes";


function* getMessagesFromUserSaga({
    payload: { userId },
  }: GetMessagesFromUser) {

  try {

    yield call(getMessagesFromUser, userId);

  } catch (e) {
    if (typeof e === "string") {
        yield put(setError(e.toUpperCase()));
      } else if (e instanceof Error) {
        yield put(setError(e.message));
      }
  }
}

export default getMessagesFromUserSaga;