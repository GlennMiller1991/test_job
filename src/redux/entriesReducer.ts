import data from '../api/initialData.json'
import {actionsType} from "./rootStore";

//constants
const TEST = 'TEST'
const GET_ENTRIES = 'GET-ENTRIES'
const CHANGE_CURRENT_PAGE = 'CHANGE-CURRENT-PAGE'

//types
export type entryType = {
    id: number,
    oguid: string,
    status: string,
    order_type: {
        name: string,
        oguid: string,
    },
    terminal: {
        name: string,
        oguid: string,
    },
    account: {
        name: string,
        oguid: string,
    },
    created_user: {
        surname: string,
        name: string,
        patronymic: string,
        oguid: string,
    },
    created_date: number,
}
export type entriesPageType = {
    entries: entryType[],
    totalCount: number,
    pageSize: number,
    currentPage: number,
}

//action types
export type testActionType = ReturnType<typeof test>
export type getEntriesActionType = ReturnType<typeof getEntries>
export type changeCurrentPageActionType = ReturnType<typeof changeCurrentPage>

//action and thunk creators
export const test = () => {
    return {
        type: TEST,
        payload: {}
    } as const
}
export const getEntries = (entries: entryType[]) => {
    return {
        type: GET_ENTRIES,
        payload: {
            entries,
        }
    } as const
}
export const changeCurrentPage = (currentPage: number) => {
    return {
        type: CHANGE_CURRENT_PAGE,
        payload: {
            currentPage,
        }
    } as const
}

const initialData: entriesPageType = {
    entries: [],
    totalCount: data.length,
    pageSize: 3,
    currentPage: 1,
}

export const entriesReducer = (state: entriesPageType = initialData, action: actionsType) => {
    switch (action.type) {
        case GET_ENTRIES:
        case CHANGE_CURRENT_PAGE:
            return {
                ...state,
                ...action.payload,
            }
        default:
            return state
    }
}