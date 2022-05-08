/** Absolute imports */
import { createSelector } from "reselect";

/** Redux */
import { INITIAL_STATE } from "./reducer";

/** Types */
import { ApplicationState } from "..";
import { DialogState } from "./types";

const selectUser = (state: ApplicationState): DialogState =>
  state.dialog || INITIAL_STATE;

export const makeGetDialogs = () =>
  createSelector(selectUser, (userState) => userState.dialogs);

export const makeGetMessages = () =>
  createSelector(selectUser, (userState) => userState.messages);