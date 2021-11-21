import React from "react";
import {NavLink} from "react-router-dom";
import {entryType} from "../../../redux/entriesReducer";
import styles from '../Table.module.css'

type EntryPropsType = {
    entry: entryType,
    order: number,
}

export const Entry: React.FC<EntryPropsType> = React.memo((props) => {
    const date = new Date(props.entry.created_date)
    const entry = props.entry
    return (
        <NavLink activeClassName={styles.active}
                 to={`/order/${entry.id}`} key={entry.oguid}>
            <div className={`${styles.row} ${props.order % 2 === 0 ? styles.even : ''}`}>
                <div>
                    <div>№{entry.id}</div>
                    <div className={styles.bottom}>
                        {`${date.getDate()}.${date.getMonth()}.${date.getFullYear()} ${date.getHours()}:${date.getMinutes()}`}
                    </div>
                </div>
                <div>
                    <div>
                        {entry.order_type.name}
                    </div>
                    <div className={styles.bottom}>
                        {`${entry.created_user.surname} ${entry.created_user.name[0]}.${entry.created_user.patronymic[0]}.`}
                    </div>
                </div>
                <div>
                    <div>{entry.account.name}</div>
                    <div className={styles.bottom}>{entry.terminal.name}</div>
                </div>
                <div>
                    <div>
                        {entry.status}
                    </div>
                </div>
            </div>
        </NavLink>
    )
})