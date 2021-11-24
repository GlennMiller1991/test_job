import {actionsType} from "./rootStore";
import {entryType} from "./entriesReducer";

//constants
const SET_ENTRY = 'SET-ENTRY'
export const emptyEntry = {
    id: -1,
    oguid: '',
    status: '',
    order_type: '',
    terminal: {
        name: '',
        oguid: '',
    },
    account: {
        name: '',
        oguid: '',
    },
    created_user: '',
    created_date: 0,
}
//types
export type entryPageStateType = entryType
export type setEntryActionType = ReturnType<typeof setEntry>

//action and thunk creators
export const setEntry = (entry: entryType) => {
    return {
        type: SET_ENTRY,
        payload: {
            ...entry,
        }
    } as const
}

//data
const initialState: entryPageStateType = emptyEntry


export const entryReducer = (state= initialState, action: actionsType) => {
    switch(action.type) {
        case SET_ENTRY:
            return {
                ...state,
                ...action.payload,
            }
        default:
            return state
    }
}