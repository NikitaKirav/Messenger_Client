/** Absolute imports */
import { put, call, cancelled } from "redux-saga/effects";

/** Services */
import { start, subscribe } from "../../../services/chatService";
import { EventsName, StatusType } from "../../../services/api-ws";

/** Types */
import { ChatType } from "../types";

/** Actions */
import { messagesReceived, setError, statusChanged } from "../actions";
import { StartMessagesListening } from "../actionTypes";


function* startMessagesListeningSaga({
  payload: { dispatch },
}: StartMessagesListening) {

  try {
    yield call(start);
    yield call(
            subscribe,
            EventsName.MESSAGES, 
            (messages: ChatType[]) => { dispatch(messagesReceived(messages)) }
        );
    yield call(
            subscribe,
            EventsName.STATUS, 
            (status: StatusType) => { dispatch(statusChanged(status)) }
        );

  } catch (e) {
    if (typeof e === "string") {
        yield put(setError(e.toUpperCase()));
      } else if (e instanceof Error) {
        yield put(setError(e.message));
      }
  }
}

export default startMessagesListeningSaga;
