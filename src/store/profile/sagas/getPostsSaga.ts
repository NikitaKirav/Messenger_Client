/** Absolute imports */
import { put, call, cancelled } from "redux-saga/effects";

/** Services */
import { getPosts } from "../../../services/profileService";

/** Redux */
import { setError, setPosts } from "../actions";

/** Utils */
import { createCancelToken } from "../../../utils/httpUtils";

/** Types */
import { GetPosts } from "../actionTypes";
import { APIResponseType, ResultCode } from "../../types";
import { Followed, PostRequest } from "../types";


function* getPostsSaga({
    payload: { userId },
  }: GetPosts) {
  const { source, cancelToken } = createCancelToken();

  try {

    const response: APIResponseType<PostRequest> = yield call(getPosts, userId, { cancelToken });

    if(response.resultCode === ResultCode.Success) {

        yield put(setPosts(response.data.posts));
        
    } else {
        let message = response.message ? response.message : "Some error";
        yield put(setError(message));
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

export default getPostsSaga;
