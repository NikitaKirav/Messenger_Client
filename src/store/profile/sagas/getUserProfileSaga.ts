/** Absolute imports */
import { put, call, cancelled } from "redux-saga/effects";

/** Services */
import { getProfile } from "../../../services/profileService";

/** Redux */
import { setError, setUserProfile } from "../actions";

/** Utils */
import { createCancelToken } from "../../../utils/httpUtils";

/** Types */
import { GetUserProfile } from "../actionTypes";
import { APIResponseType, ResultCode } from "../../types";
import { ProfileType } from "../types";


function* getUserProfileSaga({
    payload: { userId },
  }: GetUserProfile) {
  const { source, cancelToken } = createCancelToken();

  try {

    const response: APIResponseType<ProfileType> = yield call(getProfile, userId, { cancelToken });

    if(response.resultCode === ResultCode.Success) {

        yield put(setUserProfile(response.data));
        
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

export default getUserProfileSaga;
