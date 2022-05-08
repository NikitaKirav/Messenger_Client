/** Absolute imports */
import { put, call } from "redux-saga/effects";

/** Services */
import { logout } from "../../../services/authService";

/** Redux */
import { setError, setAuthUserData } from "../actions";

/** Types */
import { storageName } from "../../types";
import { resetChatList } from "../../chat/actions";
import { setUsers } from "../../user/actions";


function* logoutSaga() {

  try {

    yield put(setAuthUserData(undefined, undefined));
    localStorage.removeItem(storageName);  
    yield call(logout);
    yield put(resetChatList());
    yield put(setUsers([]));

  } catch (e) {
    if (typeof e === "string") {
        yield put(setError(e.toUpperCase()));
      } else if (e instanceof Error) {
        yield put(setError(e.message));
      }
  }
}

export default logoutSaga;
