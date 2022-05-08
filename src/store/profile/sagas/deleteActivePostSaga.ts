/** Absolute imports */
import { put, call, cancelled } from "redux-saga/effects";

/** Services */
import { deletePost } from "../../../services/profileService";

/** Redux */
import { getPosts, setError } from "../actions";

/** Utils */
import { createCancelToken } from "../../../utils/httpUtils";

/** Types */
import { DeleteActivePost } from "../actionTypes";
import { APIResponseType, ResultCode } from "../../types";


function* deleteActivePostSaga({
    payload: { postId, userId },
  }: DeleteActivePost) {
  const { source, cancelToken } = createCancelToken();

  try {
      
    const response: APIResponseType = yield call(deletePost, postId, { cancelToken });

    if(response.resultCode === ResultCode.Success) {

        yield put(getPosts(userId));
        
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

export default deleteActivePostSaga;
