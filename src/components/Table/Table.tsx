import React, {useCallback, useEffect} from "react";
import styles from './Table.module.css'
import {Pagination} from "./Pagination/Pagination";
import {useDispatch, useSelector} from "react-redux";
import {stateType} from "../../redux/rootStore";
import {changeCurrentPage, entriesPageType, entryType, getEntries} from "../../redux/entriesReducer";
import {fileApi} from "../../api/fileApi";

export const Table: React.FC = React.memo(() => {
    console.log('from Table')
    const pages = (totalCount: number, pageSize: number) => {
        return Math.ceil(totalCount / pageSize)
    }
    const state = useSelector<stateType, entriesPageType>(state => state.entriesPage)
    const dispatch = useDispatch()
    const changeCurrentPageCallback = useCallback((newCurrentPage: number) => {
        dispatch(changeCurrentPage(newCurrentPage))
    }, [dispatch])
    useEffect(() => {
        const entries: entryType[] = fileApi.getEntries(state.pageSize, state.currentPage)
        dispatch(getEntries(entries))
    }, [state.currentPage, state.pageSize, state.entries, dispatch])

    return (
        <div className={styles.wrapper}>
            <Pagination currentPage={state.currentPage}
                        totalPages={pages(state.totalCount, state.pageSize)}
                        changeCurrentPage={changeCurrentPageCallback}/>
            <div className={`${styles.hat}`}>
                <div>Номер/дата</div>
                <div>Тип задания/автор</div>
                <div>Аккаунт/Терминал</div>
                <div>Статус</div>
            </div>
            {
                state.entries &&
                state.entries.map(entry => {
                    const date = new Date(entry.created_date)
                    return (
                        <div key={entry.oguid}
                             className={`${styles.row}`}>
                            <div>
                                <div>№{entry.id}</div>
                                <div>
                                    {`${date.getDate()}.${date.getMonth()}.${date.getFullYear()} ${date.getHours()}:${date.getMinutes()}`}
                                </div>
                            </div>
                            <div>
                                <div>
                                    {entry.order_type.name}
                                </div>
                                <div>
                                    {`${entry.created_user.surname} ${entry.created_user.name[0]}.${entry.created_user.patronymic[0]}.`}
                                </div>
                            </div>
                            <div>
                                <div>{entry.account.name}</div>
                                <div>{entry.terminal.name}</div>
                            </div>
                            <div>
                                <div>{entry.status}</div>
                            </div>
                        </div>
                    )
                })

            }
        </div>
    )
})