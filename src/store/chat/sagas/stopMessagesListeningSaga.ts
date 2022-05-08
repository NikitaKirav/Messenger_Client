/** Absolute imports */
import { put, call } from "redux-saga/effects";

/** Services */
import { unsubscribe } from "../../../services/chatService";
import { EventsName, StatusType } from "../../../services/api-ws";

/** Types */
import { ChatType } from "../types";

/** Actions */
import { messagesReceived, setError, statusChanged } from "../actions";
import { StopMessagesListening } from "../actionTypes";


function* stopMessagesListeningSaga({
  payload: { dispatch },
}: StopMessagesListening) {

  try {

    yield call(
            unsubscribe,
            EventsName.MESSAGES, 
            (messages: ChatType[]) => { dispatch(messagesReceived(messages)) }
        );
    yield call(
            unsubscribe,
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

export default stopMessagesListeningSaga;
