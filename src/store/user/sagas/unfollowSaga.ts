/** Absolute imports */
import { put, call, cancelled } from "redux-saga/effects";

/** Services */
import { unfollow } from "../../../services/userService";

/** Redux */
import { toggleFollowingProgress, setError, unFollowSuccess } from "../actions";

/** Utils */
import { createCancelToken } from "../../../utils/httpUtils";

/** Types */
import { UnFollowSuccess } from "../actionTypes";
import { APIResponseType, ResultCode } from "../../types";


function* unfollowSaga({
    payload: { userId },
  }: UnFollowSuccess) {
  const { source, cancelToken } = createCancelToken();

  try {

    yield put(toggleFollowingProgress(true, userId));
    const response: APIResponseType = yield call(unfollow, userId, { cancelToken });

    if(response.resultCode === ResultCode.Success) {

        yield put(unFollowSuccess(userId));
    } 
    yield put(toggleFollowingProgress(false, userId));
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

export default unfollowSaga;
