import datas from './initialData.json'
import {emptyEntry} from "../redux/entryReducer";
import {entryType, notChangedEntryType} from "../redux/entriesReducer";

let notChangedData: notChangedEntryType[] = datas
let data: entryType[] = notChangedData.map(entry => {
    return {
        ...entry,
        order_type: entry.order_type.name,
        created_user: `${entry.created_user.surname} ${entry.created_user.name[0]}.${entry.created_user.patronymic[0]}`
    }
})

export const fileApi = {
    getEntries(pageSize: number, currentPage: number, filter: string, filterDate: string) {
        //filter
        let entryArray = filter === 'all' ? data : data.filter(entry => entry.status === filter)

        //sort
        if (filterDate === 'direct') {
            entryArray.sort(directSort)
        } else {
            entryArray.sort(reverseSort)
        }

        return {entries: entryArray.slice((currentPage - 1) * pageSize, currentPage * pageSize), totalCount: entryArray.length}
    },
    setEntry(entryId: number) {
        const entry = data.find(entry => entry.id === entryId)
        return (
            entry ? entry : emptyEntry
        )
    },
    renewData(newEntry: entryType) {
        data = data.map(entry => entry.id === newEntry.id ? newEntry : entry)
    },
    getAuthors() {
        return data.map(entry => entry.created_user).filter((s, i, self) => self.indexOf(s) === i)
    },
    getOrders() {
        return data.map(entry => entry.order_type).filter((s, i, self) => self.indexOf(s) === i)
    }
}

//tools
const directSort = (first: entryType, second: entryType) => {
    return first.created_date > second.created_date ? -1 : 1
}
const reverseSort = (first: entryType, second: entryType) => {
    return first.created_date > second.created_date ? 1 : -1
}