/** Absolute imports */
import { put, call, cancelled } from "redux-saga/effects";

/** Services */
import { login } from "../../../services/authService";

/** Redux */
import { setError, setAuthUserData, loginSuccess, loginFailure } from "../actions";

/** Utils */
import { createCancelToken } from "../../../utils/httpUtils";

/** Types */
import { LoginRequest } from "../actionTypes";
import { APIResponseType, ResultCode, storageName } from "../../types";
import { LoginResponseDataType } from "../types";


function* loginSaga({
    payload: { email, password },
  }: LoginRequest) {
  const { source, cancelToken } = createCancelToken();

  try {

    yield put(setError(undefined));
    const response: APIResponseType<LoginResponseDataType> = yield call(login, { email, password }, { cancelToken });

    if(response.resultCode === ResultCode.Success) {
        yield put(loginSuccess());

        localStorage.setItem(storageName, JSON.stringify({ userId: response.data.userId, userName: response.data.userName, token: response.data.token }));
        yield put(setAuthUserData(response.data.userId, response.data.token));
    } else {
        yield put(loginFailure());
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

export default loginSaga;
