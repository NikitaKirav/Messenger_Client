/** Absolute import */
import { takeLatest } from "redux-saga/effects";

/** Redux */
import getAuthUserDataFromLocalStorageSaga from "./sagas/getAuthUserDataFromLocalStorageSaga";
import loginSaga from "./sagas/loginSaga";
import registerSaga from "./sagas/registerSaga";
import initializeSaga from "./sagas/initializeSaga";
import logoutSaga from "./sagas/logoutSaga";

/** Types */
import {
    GET_AUTH_USER_DATA_FROM_LOCALSTORAGE, 
    INITIALIZE_APP, 
    LOGIN_REQUEST, 
    LOGOUT_REQUEST, 
    REGISTER_REQUEST
} from "./actionTypes";


function* watchAuthSagas() {
  yield takeLatest(GET_AUTH_USER_DATA_FROM_LOCALSTORAGE, getAuthUserDataFromLocalStorageSaga);
  yield takeLatest(LOGIN_REQUEST, loginSaga);
  yield takeLatest(LOGOUT_REQUEST, logoutSaga);
  yield takeLatest(REGISTER_REQUEST, registerSaga);
  yield takeLatest(INITIALIZE_APP, initializeSaga);
}

export default watchAuthSagas;