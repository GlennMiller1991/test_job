import data from '../api/initialData.json'
import {actionsType} from "./rootStore";

//constants
const TEST = 'TEST'
const GET_ENTRIES = 'GET-ENTRIES'
const CHANGE_CURRENT_PAGE = 'CHANGE-CURRENT-PAGE'
const CHANGE_PAGE_SIZE = 'CHANGE-PAGE-SIZE'
const CHANGE_FILTER = 'CHANGE-FILTER'
const CHANGE_SORT_DATE_VALUE = 'CHANGE-SORT-DATE-VALUE'

//types
export type filterType = 'all' | 'new' | 'completed' | 'assigned_to' | 'started' | 'declined'
export type notChangedEntryType = {
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
export type entryType = {
    id: number,
    oguid: string,
    status: string,
    order_type: string,
    terminal: {
        name: string,
        oguid: string,
    },
    account: {
        name: string,
        oguid: string,
    },
    created_user: string,
    created_date: number,
}
export type entriesPageType = {
    entries: entryType[],
    totalCount: number,
    pageSize: number,
    currentPage: number,
    filter: string, //filterType,
    sortDate: string,
}

//action types
export type testActionType = ReturnType<typeof test>
export type getEntriesActionType = ReturnType<typeof getEntries>
export type changeCurrentPageActionType = ReturnType<typeof changeCurrentPage>
export type changePageSizeActionType = ReturnType<typeof changePageSize>
export type changeFilterActionType = ReturnType<typeof changeFilterValue>
export type changeSortDateValueActionType = ReturnType<typeof changeSortDateValue>

//action and thunk creators
export const test = () => {
    return {
        type: TEST,
        payload: {}
    } as const
}
export const getEntries = (entries: entryType[], totalCount: number, currentPage: number) => {
    return {
        type: GET_ENTRIES,
        payload: {
            entries,
            totalCount,
            currentPage,
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
export const changePageSize = (pageSize: number) => {
    return {
        type: CHANGE_PAGE_SIZE,
        payload: {
            pageSize,
        }
    } as const
}
export const changeFilterValue = (filter: string /*filterType*/) => {
    return {
        type: CHANGE_FILTER,
        payload: {
            filter,
        }
    } as const
}
export const changeSortDateValue = (sortDate: string) => {
    return {
        type: CHANGE_SORT_DATE_VALUE,
        payload: {
            sortDate,
        }
    } as const
}

const initialData: entriesPageType = {
    entries: [],
    totalCount: data.length,
    pageSize: 3,
    currentPage: 1,
    filter: 'all',
    sortDate: 'direct',
}

export const entriesReducer = (state: entriesPageType = initialData, action: actionsType) => {
    switch (action.type) {
        case GET_ENTRIES:
        case CHANGE_CURRENT_PAGE:
            return {
                ...state,
                ...action.payload,
            }
        case CHANGE_FILTER:
        case CHANGE_PAGE_SIZE:
        case CHANGE_SORT_DATE_VALUE:
            return {
                ...state,
                ...action.payload,
                currentPage: 1,
            }
        default:
            return state
    }
}