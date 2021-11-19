import data from './initialData.json'
import {emptyEntry} from "../redux/entryReducer";

export const fileApi = {
    getEntries(pageSize: number, currentPage: number) {
        return data.slice((currentPage - 1) * pageSize, currentPage * pageSize)
    },
    setEntry(entryId: number) {
        const entry = data.find(entry => entry.id === entryId)
        return (
            entry ? entry : emptyEntry
        )
    }
}