/** Absolute imports */
import { put } from "redux-saga/effects";

/** Redux */
import { setError, initializedSuccess, getAuthUserDataFromLocalStorage } from "../actions";


function* initializeSaga() {

  try {

    yield put(getAuthUserDataFromLocalStorage());
    yield put(initializedSuccess());
    
  } catch (e) {
    if (typeof e === "string") {
        yield put(setError(e.toUpperCase()));
      } else if (e instanceof Error) {
        yield put(setError(e.message));
      }
  }
}

export default initializeSaga;
