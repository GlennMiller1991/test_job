import React, {ChangeEvent} from "react";
import styles from './FIlter.module.css'

type FilterPropsType = {
    filter: string, //filterType,
    sortDate: string,
    changeFilterCallback: (e: ChangeEvent<HTMLSelectElement>) => void,
    changeSortDateCallback: (e: ChangeEvent<HTMLSelectElement>) => void,
}
export const Filter: React.FC<FilterPropsType> = React.memo((props) => {
    return (
        <div className={styles.filterWrapper}>
            <FilterStatus filter={props.filter} changeFilterCallback={props.changeFilterCallback}/>
            <SortDate sortDate={props.sortDate} changeSortDateCallback={props.changeSortDateCallback}/>
        </div>
    )
})

type FilterStatusPropsType = {
    filter: string, //filterType,
    changeFilterCallback: (e: ChangeEvent<HTMLSelectElement>) => void,
}
export const FilterStatus: React.FC<FilterStatusPropsType> = React.memo((props) => {
    return (
        <div className={styles.filterStatusWrapper}>
            <div className={styles.name}>
                Статус:
            </div>
            <select value={props.filter}
                    className={styles.select}
                    onChange={props.changeFilterCallback}>
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

type SortDatePropsType = {
    changeSortDateCallback: (e: ChangeEvent<HTMLSelectElement>) => void,
    sortDate: string,
}
export const SortDate: React.FC<SortDatePropsType> = React.memo((props) => {
    return (
        <div className={styles.sortDateWrapper}>
            <div className={styles.name}>
                Дата:
            </div>
            <select value={props.sortDate}
                    className={styles.select}
                    onChange={props.changeSortDateCallback}>
                <option value={'direct'}>Сначала поздние</option>
                <option value={'reverse'}>Сначала ранние</option>
            </select>
        </div>
    )
})