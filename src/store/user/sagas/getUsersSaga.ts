/** Absolute imports */
import { put, call, cancelled } from "redux-saga/effects";

/** Services */
import { getUsers } from "../../../services/userService";

/** Redux */
import { setError, toggleIsFetching, setCurrentPage, setFilter, setUsers, setTotalUsersCount } from "../actions";

/** Utils */
import { createCancelToken } from "../../../utils/httpUtils";

/** Types */
import { GetUsersRequest } from "../actionTypes";
import { GetItemsType } from "../types";


function* getUsersSaga({
    payload: { page, pageSize, filter },
  }: GetUsersRequest) {
  const { source, cancelToken } = createCancelToken();

  try {

    yield put(toggleIsFetching(true));
    yield put(setCurrentPage(page));
    if (filter)
    yield put(setFilter(filter));
    const { data }: GetItemsType = yield call(getUsers, page, pageSize, filter?.term, filter?.friend, { cancelToken });
    yield put(setUsers(data.items));
    yield put(setTotalUsersCount(data.totalCount));
    yield put(toggleIsFetching(false));

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

export default getUsersSaga;
