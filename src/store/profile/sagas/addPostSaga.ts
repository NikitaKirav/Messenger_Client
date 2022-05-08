/** Absolute imports */
import { put, call, cancelled } from "redux-saga/effects";

/** Services */
import { addPost as addPostAPI } from "../../../services/profileService";

/** Redux */
import { addPost, setError } from "../actions";

/** Utils */
import { createCancelToken } from "../../../utils/httpUtils";

/** Types */
import { AddPostRequest } from "../actionTypes";
import { ResultCode } from "../../types";
import { PostType } from "../types";



function* addPostSaga({
    payload: { text, profileId },
  }: AddPostRequest) {
  const { source, cancelToken } = createCancelToken();

  try {

    const response: {post: PostType, resultCode: ResultCode} = yield call(addPostAPI, text, profileId, { cancelToken });

    if(response.resultCode === ResultCode.Success) {

        yield put(addPost(response.post));
        
    }

  } catch (e) {
    if (typeof e === "string") {
        yield put(setError(e.toUpperCase()));
      } else if (e instanceof Error) {
        yield put(setError(e.message));
      }
  } finally {
    //@ts-ignore
    if (yield cancelled()) {
      source.cancel();
    }
  }
}

export default addPostSaga;
