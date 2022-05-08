/** Absolute import */
import { takeLatest } from "redux-saga/effects";

/** Redux */
import getUserProfileSaga from "./sagas/getUserProfileSaga";
import getStatusSaga from "./sagas/getStatusSaga";
import updateStatusSaga from "./sagas/updateStatusSaga";
import addPostSaga from "./sagas/addPostSaga";
import getPostsSaga from "./sagas/getPostsSaga";
import addLikeSaga from "./sagas/addLikeSaga";
import deleteActivePostSaga from "./sagas/deleteActivePostSaga";
import getFollowedSaga from "./sagas/getFollowedSaga";
import savePhotoSaga from "./sagas/savePhotoSaga";
import saveProfileSaga from "./sagas/saveProfileSaga";

/** Types */
import {
  ADD_LIKE,
    ADD_POST_REQUEST,
    DELETE_ACTIVE_POST,
    GET_FOLLOWED,
    GET_POSTS,
    GET_STATUS,
    GET_USER_PROFILE,
    SAVE_PHOTO,
    SAVE_PROFILE,
    UPDATE_STATUS, 
} from "./actionTypes";

function* watchUserSagas() {
  yield takeLatest(GET_USER_PROFILE, getUserProfileSaga);
  yield takeLatest(GET_STATUS, getStatusSaga);
  yield takeLatest(UPDATE_STATUS, updateStatusSaga);
  yield takeLatest(ADD_POST_REQUEST, addPostSaga);
  yield takeLatest(GET_POSTS, getPostsSaga);
  yield takeLatest(ADD_LIKE, addLikeSaga);
  yield takeLatest(DELETE_ACTIVE_POST, deleteActivePostSaga);
  yield takeLatest(GET_FOLLOWED, getFollowedSaga);
  yield takeLatest(SAVE_PHOTO, savePhotoSaga);
  yield takeLatest(SAVE_PROFILE, saveProfileSaga);
}

export default watchUserSagas;