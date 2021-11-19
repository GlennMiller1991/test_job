import data from './initialData.json'
import {emptyEntry} from "../redux/entryReducer";

export const fileApi = {
    getEntries(pageSize: number, currentPage: number, filter: string) {
        const entryArray = filter === 'all' ? data : data.filter(entry => entry.status === filter)
        return {entries: entryArray.slice((currentPage - 1) * pageSize, currentPage * pageSize), totalCount: entryArray.length}
    },
    setEntry(entryId: number) {
        const entry = data.find(entry => entry.id === entryId)
        return (
            entry ? entry : emptyEntry
        )
    }
}