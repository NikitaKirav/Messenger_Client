/** Absolute imports */
import { put } from "redux-saga/effects";

/** Redux */
import { setError, initializedSuccess, getAuthUserDataFromLocalStorage } from "../actions";


function* initializeSaga() {

    yield put(getAuthUserDataFromLocalStorage());
    yield put(initializedSuccess());

}

export default initializeSaga;
