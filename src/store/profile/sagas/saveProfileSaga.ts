/** Absolute imports */
import { put, call, cancelled, select } from "redux-saga/effects";

/** Services */
import { saveProfile } from "../../../services/profileService";

/** Redux */
import { getUserProfile, setError, setProfileWasSaved, setUserProfile } from "../actions";

/** Utils */
import { createCancelToken } from "../../../utils/httpUtils";

/** Types */
import { SaveProfile } from "../actionTypes";
import { APIResponseType, ResultCode } from "../../types";
import { ProfileType } from "../types";

/** Selectors */
import { makeGetUserId } from "../../auth/selectors";


function* saveProfileSaga({
    payload: { profile },
  }: SaveProfile) {
  const { source, cancelToken } = createCancelToken();

  try {
    yield put(setProfileWasSaved(false));
    const userId: string | undefined = yield select(makeGetUserId());
    const response: APIResponseType = yield call(saveProfile, profile, { cancelToken });

    if(response.resultCode === ResultCode.Success) {

        if (userId != null) {
            yield put(getUserProfile(userId));
            yield put(setProfileWasSaved(true));
       } else {
           throw new Error("UserId can't be null");
       }
        
    } else {
        //yield put(stopSubmit("edit-profile", {_error: response.messages[0] }));
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

export default saveProfileSaga;
