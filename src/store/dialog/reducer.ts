import { Reducer } from "redux";
import { 
    DialogActions, SEND_MESSAGE
} from "./actionTypes";
import { DialogState } from "./types";

export const INITIAL_STATE: DialogState = {
    dialogs: [],
    messages: []
}
//@ts-ignore
const reducer: Reducer<DialogState> = (
    state = INITIAL_STATE,
    action: DialogActions
  ) => {
    switch(action.type) {
        case SEND_MESSAGE: {
            let body = action.payload.newMessageBody;
            return {
                ...state,
                messages: [ ...state.messages, {id: 6, message: body }],
            };
        }
        default:
            return state;
    }    
}

export default reducer;