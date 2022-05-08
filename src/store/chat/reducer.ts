import { Reducer } from "redux";
import { StatusType } from "../../services/api-ws";
import { 
    ChatActions, MESSAGES_RECEIVED, RESET_CHAT_LIST, SET_ERROR, STATUS_CHANGED, 
} from "./actionTypes";
import { ChatState } from "./types";

export const INITIAL_STATE: ChatState = {
    data: {    
        action: '',
        message: undefined,
        messages: [],
        onlineUsers: [],
        chatList: [],
        userAvatar: undefined,
        usersAvatarsFriends: []
    },
    status: StatusType.PENDING,
    error: undefined
}

const reducer: Reducer<ChatState> = (
    state = INITIAL_STATE,
    action: ChatActions
  ) => {
    switch(action.type) {
        case MESSAGES_RECEIVED: {
            return {
                ...state,
                data: {...state.data, ...action.payload.messages}
            }
        }
        case STATUS_CHANGED: {
            return {
                ...state,
                status: action.payload.status
            }
        }
        case RESET_CHAT_LIST: {
            return {
                ...state,
                data: {
                    ...state.data,
                    chatList: []
                }
            }
        }
        case SET_ERROR: {
            return {
                ...state,
                error: action.payload.error
            }
        }
        default:
            return state;
    }    
}

export default reducer;