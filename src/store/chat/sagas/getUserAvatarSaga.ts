/** Absolute imports */
import { put, call } from "redux-saga/effects";

/** Services */
import { getUserAvatar } from "../../../services/chatService";

/** Redux */
import { setError } from "../actions";

/** Types */
import { GetUserAvatar } from "../actionTypes";


function* getUserAvatarSaga({
    payload: { userId },
  }: GetUserAvatar) {

  try {

    yield call(getUserAvatar, userId);

  } catch (e) {
    if (typeof e === "string") {
        yield put(setError(e.toUpperCase()));
      } else if (e instanceof Error) {
        yield put(setError(e.message));
      }
  }
}

export default getUserAvatarSaga;