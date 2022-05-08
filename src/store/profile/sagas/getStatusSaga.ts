/** Absolute imports */
import { put, call, cancelled } from "redux-saga/effects";

/** Services */
import { getStatus } from "../../../services/profileService";

/** Redux */
import { setError, setStatus } from "../actions";

/** Utils */
import { createCancelToken } from "../../../utils/httpUtils";

/** Types */
import { GetUserProfile } from "../actionTypes";
import { APIResponseType, ResultCode } from "../../types";
import { StatusType } from "../types";


function* getStatusSaga({
    payload: { userId },
  }: GetUserProfile) {
  const { source, cancelToken } = createCancelToken();

  try {

    const response: APIResponseType<StatusType> = yield call(getStatus, userId, { cancelToken });

    if(response.resultCode === ResultCode.Success && response.data.status !== undefined) {

        yield put(setStatus(response.data.status));
        
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

export default getStatusSaga;
