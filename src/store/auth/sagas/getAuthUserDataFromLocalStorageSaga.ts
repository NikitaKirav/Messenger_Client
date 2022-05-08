/** Absolute imports */
import { put } from "redux-saga/effects";

/** Redux */
import { setAuthUserData, setError } from "../actions";

/** Const */
import { storageName } from "../../types";

function* getAuthUserDataFromLocalStorageSaga() {
  try {
    const data = localStorage.getItem(storageName) ? JSON.parse(localStorage.getItem(storageName) ?? "") : '';
    
    if(data && data.token) {
      console.log(data);
      yield put(setAuthUserData(data.userId, data.token));
    }
  } catch (e) {
    if (typeof e === "string") {
      yield put(setError(e.toUpperCase()));
    } else if (e instanceof Error) {
      yield put(setError(e.message));
    }
  }
}

export default getAuthUserDataFromLocalStorageSaga;