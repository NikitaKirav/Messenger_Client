/** Absolute imports */
import { combineReducers } from "redux";

/** Reducers */
import auth from "./auth/reducer";
import user from "./user/reducer";
import profile from "./profile/reducer";
import chat from "./chat/reducer";
import { reducer as formReducer } from 'redux-form'

/** Utils */
import { history } from "../utils/routerUtils";
import { createReduxHistoryContext } from "redux-first-history";


export default function createReducer(injectedReducers = {}) {

  const { createReduxHistory, routerMiddleware, routerReducer } = createReduxHistoryContext({ history });

  const rootReducer = combineReducers({
    auth,
    user,
    profile,
    chat,
    router: routerReducer,
    form: formReducer,
    ...injectedReducers,
  });

  return { createReduxHistory, routerMiddleware, rootReducer };
}
