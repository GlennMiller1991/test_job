import {applyMiddleware, combineReducers, createStore } from "redux";
import thunk from "redux-thunk";
import {entriesReducer, testActionType} from "./entriesReducer";

//types
export type actionsType = testActionType
export type stateType = ReturnType<typeof store.getState>
export type dispatchType = typeof store.dispatch

const reducers = combineReducers({
        entriesPage: entriesReducer,
    }
)

export const store = createStore(reducers, applyMiddleware(thunk))

//@ts-ignore
window.store = store