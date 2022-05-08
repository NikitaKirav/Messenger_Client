/** Absolute imports */
import { put, call } from "redux-saga/effects";

/** Services */
import { savePhoto } from "../../../services/profileService";

/** Redux */
import { savePhotoSuccess, setError } from "../actions";

/** Types */
import { SavePhoto } from "../actionTypes";
import { APIResponseType, ResultCode } from "../../types";
import { SavePhotoResponseDataType } from "../types";


function* savePhotoSaga({
    payload: { file },
  }: SavePhoto) {

  try {

    const response: APIResponseType<SavePhotoResponseDataType> = yield call(savePhoto, file);

    if(response.resultCode === ResultCode.Success) {

        yield put(savePhotoSuccess(response.data.photos));
        
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
  }
}

export default savePhotoSaga;
