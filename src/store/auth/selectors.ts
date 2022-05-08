/** Absolute imports */
import { createSelector } from "reselect";

/** Redux */
import { INITIAL_STATE } from "./reducer";

/** Types */
import { ApplicationState } from "..";
import { AuthState } from "./types";

const selectAuth = (state: ApplicationState): AuthState =>
  state.auth || INITIAL_STATE;

export const makeGetIsAuth = () =>
  createSelector(selectAuth, (authState) => authState.isAuth);

export const makeGetLogin = () =>
  createSelector(selectAuth, (authState) => authState.login);

export const makeGetUserId = () =>
  createSelector(selectAuth, (authState) => authState.userId);

export const makeGetRegisterSuccess = () =>
  createSelector(selectAuth, (authState) => authState.registerSuccess);

export const makeGetError = () =>
  createSelector(selectAuth, (authState) => authState.error);