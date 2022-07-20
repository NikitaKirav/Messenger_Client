/** Absolute imports */
import { createStore, compose, applyMiddleware } from "redux";
import createSagaMiddleware from "redux-saga";

/** Redux */
import createReducer from "./rootReducer";
import rootSaga from "./rootSagas";

/** Types */
import { AuthState } from "./auth/types";
import { UserState } from "./user/types";
import { ProfileState } from "./profile/types";
import { ChatState } from "./chat/types";


export interface ApplicationState {
  auth: AuthState;
  user: UserState;
  profile: ProfileState;
  chat: ChatState;
}

declare global {
  interface Window {
    __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
  }
}

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;


const { createReduxHistory, routerMiddleware, rootReducer } = createReducer();

const configureStore = (initialState = {}) => {
  const sagaMiddleware = createSagaMiddleware();
  const middlewares = [sagaMiddleware, routerMiddleware];
  const enhancers = [applyMiddleware(...middlewares)];

  const store = createStore(
    rootReducer,
    initialState,
    composeEnhancers(...enhancers)
  );

  // @ts-ignore
  store.sagaTask = sagaMiddleware.run(rootSaga);

  return store;
};

export const history = createReduxHistory(configureStore());

export default configureStore;
