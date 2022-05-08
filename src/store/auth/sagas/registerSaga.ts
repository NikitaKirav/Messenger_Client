/** Absolute imports */
import { put, call, cancelled } from "redux-saga/effects";

/** Services */
import { register } from "../../../services/authService";

/** Redux */
import { setError, setRegisterSuccess } from "../actions";

/** Utils */
import { createCancelToken } from "../../../utils/httpUtils";

/** Types */
import { RegisterRequest } from "../actionTypes";
import { APIResponseType, ResultCode } from "../../types";


function* registerSaga({
    payload: { email, password, userName },
  }: RegisterRequest) {
  const { source, cancelToken } = createCancelToken();

  try {

    yield put(setError(undefined));
    yield put(setRegisterSuccess(false));
    const response: APIResponseType = yield call(register, { email, password, userName }, { cancelToken });

    if(response.resultCode === ResultCode.Success) {
        yield put(setRegisterSuccess(true));
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

export default registerSaga;
