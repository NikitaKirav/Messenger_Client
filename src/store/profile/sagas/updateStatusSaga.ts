/** Absolute imports */
import { put, call, cancelled } from "redux-saga/effects";

/** Services */
import { updateStatus } from "../../../services/profileService";

/** Redux */
import { setError, setStatus } from "../actions";

/** Utils */
import { createCancelToken } from "../../../utils/httpUtils";

/** Types */
import { UpdateStatus } from "../actionTypes";
import { APIResponseType, ResultCode } from "../../types";


function* updateStatusSaga({
    payload: { status },
  }: UpdateStatus) {
  const { source, cancelToken } = createCancelToken();

  try {

    const response: APIResponseType = yield call(updateStatus, status, { cancelToken });

    if(response.resultCode === ResultCode.Success) {

        yield put(setStatus(status));
        
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

export default updateStatusSaga;
