/** Absolute import */
import { takeLatest } from "redux-saga/effects";

/** Redux */
import followSaga from "./sagas/followSaga";
import unfollowSaga from "./sagas/unfollowSaga";
import getUsersSaga from "./sagas/getUsersSaga";

/** Types */
import {
    FOLLOW_REQUEST, 
    GET_USERS_REQUEST, 
    UNFOLLOW_REQUEST,
} from "./actionTypes";


function* watchUserSagas() {
  yield takeLatest(FOLLOW_REQUEST, followSaga);
  yield takeLatest(UNFOLLOW_REQUEST, unfollowSaga);
  yield takeLatest(GET_USERS_REQUEST, getUsersSaga);
}

export default watchUserSagas;