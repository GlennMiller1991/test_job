import data from './initialData.json'

export const fileApi = {
    getEntries(pageSize: number, currentPage: number) {
        return data.slice((currentPage - 1) * pageSize, currentPage * pageSize)
    }
}