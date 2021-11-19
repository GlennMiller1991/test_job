import React, {ChangeEvent, useCallback, useEffect, useMemo} from "react";
import styles from './Table.module.css'
import {Pagination} from "./Pagination/Pagination";
import {useDispatch, useSelector} from "react-redux";
import {stateType} from "../../redux/rootStore";
import {
    changeCurrentPage, changeFilterValue,
    changePageSize,
    entriesPageType,
    getEntries
} from "../../redux/entriesReducer";
import {fileApi} from "../../api/fileApi";
import {Entry} from "./Entry/Entry";
import {TableHat} from "./TableHat/TableHat";
import {Options} from "./Options/Options";

export const TableContainer: React.FC = React.memo(() => {
    //initial data
    const state = useSelector<stateType, entriesPageType>(state => state.entriesPage)
    const dispatch = useDispatch()

    //side-effects
    useEffect(() => {
        const {entries, totalCount} = fileApi.getEntries(state.pageSize, state.currentPage, state.filter)
        dispatch(getEntries(entries, totalCount))
    }, [state.currentPage, state.pageSize, dispatch, state.filter])

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
    return (
        <Table state={state}
               totalPages={totalPages}
               changePageSizeCallback={changePageSizeCallback}
               changeCurrentPageCallback={changeCurrentPageCallback}
               changeFilterCallback={changeFilterCallback}/>
    )
})

type TablePropsType = {
    state: entriesPageType,
    totalPages: number,
    changePageSizeCallback: (e: ChangeEvent<HTMLSelectElement>) => void,
    changeCurrentPageCallback: (newCurrentPage: number) => void,
    changeFilterCallback: (e: ChangeEvent<HTMLSelectElement>) => void,
}
const Table: React.FC<TablePropsType> = React.memo((props) => {
    return (
        <div className={styles.wrapper}>
            <div className={styles.optionsWrapper}>
                <Options pageSize={props.state.pageSize}
                         changePageSizeCallback={props.changePageSizeCallback}/>
                <Filter filter={props.state.filter} changeFilterCallback={props.changeFilterCallback}/>
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

type FilterPropsType = {
    filter: string, //filterType,
    changeFilterCallback: (e: ChangeEvent<HTMLSelectElement>) => void,
}
export const Filter: React.FC<FilterPropsType> = React.memo((props) => {
    return (
        <div>
            Статус:
            <select value={props.filter} onChange={props.changeFilterCallback}>
                <option value={'all'}>Все статусы</option>
                <option value={'new'}>new</option>
                <option value={'completed'}>completed</option>
                <option value={'assigned_to'}>assigned_to</option>
                <option value={'started'}>started</option>
                <option value={'declined'}>declined</option>
            </select>
        </div>
    )
})