import React, {ChangeEvent, useCallback, useEffect, useMemo} from "react";
import styles from './Table.module.css'
import {Pagination} from "./Pagination/Pagination";
import {useDispatch, useSelector} from "react-redux";
import {stateType} from "../../redux/rootStore";
import {
    changeCurrentPage,
    changeFilterValue,
    changePageSize, changeSortDateValue,
    entriesPageType,
    getEntries
} from "../../redux/entriesReducer";
import {fileApi} from "../../api/fileApi";
import {Entry} from "./Entry/Entry";
import {TableHat} from "./TableHat/TableHat";
import {Options} from "./Options/Options";
import {Filter} from "./Filter/Filter";

export const TableContainer: React.FC = React.memo(() => {
    console.log('from table')
    //initial data
    const state = useSelector<stateType, entriesPageType>(state => state.entriesPage)
    const dispatch = useDispatch()

    //callbacks
    const changePageSizeCallback = useCallback((e: ChangeEvent<HTMLSelectElement>) => {
        dispatch(changePageSize(Number(e.currentTarget.value)))
    }, [dispatch])
    const changeCurrentPageCallback = useCallback((newCurrentPage: number) => {
        dispatch(changeCurrentPage(newCurrentPage))
    }, [dispatch])
    const totalPages = useMemo(() => {
        return Math.ceil(state.totalCount / state.pageSize)
    }, [state.totalCount, state.pageSize])
    const changeFilterCallback = useCallback((e: ChangeEvent<HTMLSelectElement>) => {
        dispatch(changeFilterValue(e.currentTarget.value))
    }, [dispatch])
    const changeSortDateCallback = useCallback((e: ChangeEvent<HTMLSelectElement>) => {
        dispatch(changeSortDateValue(e.currentTarget.value))
    }, [dispatch])

    //side-effects
    useEffect(() => {
        const {entries, totalCount} = fileApi.getEntries(state.pageSize, state.currentPage, state.filter, state.sortDate)
        if (totalCount) {
            if (entries.length) dispatch(getEntries(entries, totalCount, state.currentPage))
            else dispatch(getEntries(entries, totalCount, 1))
        } else {
            dispatch(getEntries(entries, totalCount, 0))
        }
    }, [state.currentPage, state.pageSize, dispatch, state.filter, state.sortDate])

    return (
        <Table state={state}
               totalPages={totalPages}
               changePageSizeCallback={changePageSizeCallback}
               changeCurrentPageCallback={changeCurrentPageCallback}
               changeFilterCallback={changeFilterCallback}
               changeSortDateCallback={changeSortDateCallback}/>
    )
})

type TablePropsType = {
    state: entriesPageType,
    totalPages: number,
    changePageSizeCallback: (e: ChangeEvent<HTMLSelectElement>) => void,
    changeCurrentPageCallback: (newCurrentPage: number) => void,
    changeFilterCallback: (e: ChangeEvent<HTMLSelectElement>) => void,
    changeSortDateCallback: (e: ChangeEvent<HTMLSelectElement>) => void,
}
const Table: React.FC<TablePropsType> = React.memo((props) => {
    return (
        <div className={styles.wrapper}>
            <div className={styles.optionsWrapper}>
                <Filter filter={props.state.filter}
                        sortDate={props.state.sortDate}
                        changeFilterCallback={props.changeFilterCallback}
                        changeSortDateCallback={props.changeSortDateCallback}/>
                <Options pageSize={props.state.pageSize}
                         changePageSizeCallback={props.changePageSizeCallback}/>
                <Pagination currentPage={props.state.currentPage}
                            totalPages={props.totalPages}
                            changeCurrentPage={props.changeCurrentPageCallback}/>
            </div>
            <TableHat/>
            {
                props.state.entries.map((entry, order) => {
                    return (
                        <Entry entry={entry} order={order} key={order}/>
                    )
                })
            }
        </div>
    )
})

