import data from '../data/initialData.json'
import {actionsType} from "./rootStore";

//constants
const TEST = 'TEST'

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
}

//action types
export type testActionType = ReturnType<typeof test>
//action and thunk creators
export const test = () => {
    return {
        type: TEST,
        payload: {

        }
    } as const
}


const initialData: entriesPageType = {
    entries: data,
    totalCount: data.length,
    pageSize: 3,
}

export const entriesReducer = (state: entriesPageType = initialData, action: actionsType) => {
    switch (action.type) {
        case TEST:
            return state
        default:
            return state
    }
}