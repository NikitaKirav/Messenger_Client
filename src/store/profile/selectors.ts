/** Absolute imports */
import { createSelector } from "reselect";

/** Redux */
import { INITIAL_STATE } from "./reducer";

/** Types */
import { ApplicationState } from "..";
import { ProfileState } from "./types";

const selectProfile = (state: ApplicationState): ProfileState =>
  state.profile || INITIAL_STATE;

export const makeGetProfile = () =>
  createSelector(selectProfile, (profileState) => profileState.profile);

export const makeGetStatus = () =>
  createSelector(selectProfile, (profileState) => profileState.status);

export const makeGetProfileWasSaved = () =>
  createSelector(selectProfile, (profileState) => profileState.profileWasSaved);

export const makeGetPhoto = () =>
  createSelector(selectProfile, (profileState) => profileState.photo);

export const makeGetPosts = () =>
  createSelector(selectProfile, (profileState) => profileState.posts);

export const makeGetFollowed = () =>
  createSelector(selectProfile, (profileState) => profileState.followed);

export const makeGetPhotoLarge = () =>
  createSelector(selectProfile, (profileState) => profileState.profile?.photos.large);