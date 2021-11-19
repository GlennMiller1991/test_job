import {applyMiddleware, combineReducers, createStore} from "redux";
import thunk from "redux-thunk";
import {
    changeCurrentPageActionType, changeFilterActionType,
    changePageSizeActionType,
    entriesReducer,
    getEntriesActionType,
    testActionType
} from "./entriesReducer";
import {entryReducer, setEntryActionType} from "./entryReducer";

//types
export type actionsType =
    testActionType
    | getEntriesActionType
    | changeCurrentPageActionType
    | changePageSizeActionType
    | setEntryActionType
    | changeFilterActionType

export type stateType = ReturnType<typeof store.getState>
export type dispatchType = typeof store.dispatch

const reducers = combineReducers({
        entriesPage: entriesReducer,
        entryPage: entryReducer,
    }
)

export const store = createStore(reducers, applyMiddleware(thunk))

//@ts-ignore
window.store = store