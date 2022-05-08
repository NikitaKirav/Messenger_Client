/** Absolute imports */
import { put, call } from "redux-saga/effects";

/** Services */
import { sendMessage } from "../../../services/chatService";

/** Redux */
import { setError } from "../actions";

/** Types */
import { SendMessage } from "../actionTypes";


function* sendMessageSaga({
    payload: { email, text, addressee },
  }: SendMessage) {

  try {

    yield call(sendMessage, email, text, addressee);

  } catch (e) {
    if (typeof e === "string") {
        yield put(setError(e.toUpperCase()));
      } else if (e instanceof Error) {
        yield put(setError(e.message));
      }
  }
}

export default sendMessageSaga;
