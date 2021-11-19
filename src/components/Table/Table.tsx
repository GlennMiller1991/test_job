import React, {ChangeEvent, useCallback, useEffect, useMemo} from "react";
import styles from './Table.module.css'
import {Pagination} from "./Pagination/Pagination";
import {useDispatch, useSelector} from "react-redux";
import {stateType} from "../../redux/rootStore";
import {changeCurrentPage, changePageSize, entriesPageType, entryType, getEntries} from "../../redux/entriesReducer";
import {fileApi} from "../../api/fileApi";
import {NavLink} from "react-router-dom";
import {Entry} from "./Entry/Entry";
import {TableHat} from "./TableHat/TableHat";
import {Options} from "./Options/Options";

export const TableContainer: React.FC = React.memo(() => {
    console.log('from TableContainer')

    //initial data
    const state = useSelector<stateType, entriesPageType>(state => state.entriesPage)
    const dispatch = useDispatch()

    //side-effects
    useEffect(() => {
        const entries: entryType[] = fileApi.getEntries(state.pageSize, state.currentPage)
        dispatch(getEntries(entries))
    }, [state.currentPage, state.pageSize, dispatch])

    //callbacks
    const changePageSizeCallback = useCallback((e: ChangeEvent<HTMLSelectElement>) => {
        dispatch(changePageSize(Number(e.currentTarget.value)))
    }, [dispatch])
    const changeCurrentPageCallback = useCallback((newCurrentPage: number) => {
        dispatch(changeCurrentPage(newCurrentPage))
    }, [dispatch])
    const totalPages = useMemo(() => {
        console.log('from useMemo')
        return Math.ceil(state.totalCount / state.pageSize)
    }, [state.totalCount, state.pageSize])

    return (
        <Table state={state}
               totalPages={totalPages}
               changePageSizeCallback={changePageSizeCallback}
               changeCurrentPageCallback={changeCurrentPageCallback}/>
    )
})

type TablePropsType = {
    state: entriesPageType,
    totalPages: number,
    changePageSizeCallback: (e: ChangeEvent<HTMLSelectElement>) => void,
    changeCurrentPageCallback: (newCurrentPage: number) => void,
}
const Table: React.FC<TablePropsType> = React.memo((props) => {
    console.log('from Table')
    return (
        <div className={styles.wrapper}>
            <div className={styles.optionsWrapper}>
                <Options changePageSizeCallback={props.changePageSizeCallback}/>
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