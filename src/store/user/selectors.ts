/** Absolute imports */
import { createSelector } from "reselect";

/** Redux */
import { INITIAL_STATE } from "./reducer";

/** Types */
import { ApplicationState } from "..";
import { UserState } from "./types";

const selectUser = (state: ApplicationState): UserState =>
  state.user || INITIAL_STATE;

export const makeGetUsers = () =>
  createSelector(selectUser, (userState) => userState.users);

export const makeGetPageSize = () =>
  createSelector(selectUser, (userState) => userState.pageSize);

export const makeGetTotalUserCount = () =>
  createSelector(selectUser, (userState) => userState.totalUsersCount);

export const makeGetCurrentPage = () =>
  createSelector(selectUser, (userState) => userState.currentPage);

export const makeGetIsFetching = () =>
  createSelector(selectUser, (userState) => userState.isFetching);

export const makeGetFollowingInProgress = () =>
  createSelector(selectUser, (userState) => userState.followingInProgress);

export const makeGetFilter = () =>
  createSelector(selectUser, (userState) => userState.filter);
