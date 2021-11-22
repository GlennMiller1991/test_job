import React, {ChangeEvent, useState} from "react";
import styles from "../Entry.module.css";
import {entryPageStateType} from "../../../redux/entryReducer";
import {entryType} from "../../../redux/entriesReducer";

type EntryEditPropsType = {
    state: entryPageStateType,
    onSaveButtonCallback: (entry: entryType) => void,
}
export const EntryEdit: React.FC<EntryEditPropsType> = React.memo((props) => {
    const state = props.state
    
    //status
    const [status, setStatus] = useState(state.status)

    //callback
    const onChangeCallback = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>, func: (str: string) => void) => {
        const value = e.currentTarget.value
        if (value) {
            func(value)
        }
    }
    return (
        <div>
            <div className={styles.entry}>
                <div className={styles.entry}>
                    №{state.id}
                    <hr/>
                    {`${new Date(state.created_date).getDate()}.${new Date(state.created_date).getMonth()}.${new Date(state.created_date).getFullYear()} ${new Date(state.created_date).getHours()}:${new Date(state.created_date).getMinutes()}`}
                    <hr/>
                    {state.order_type.name}
                    <hr/>
                    {`${state.created_user.surname} ${state.created_user.name[0]}.${state.created_user.patronymic[0]}.`}
                    <hr/>
                    {state.account.name}
                    <hr/>
                    {state.terminal.name}
                    <hr/>
                    <select value={status} autoFocus
                            onChange={(e) => onChangeCallback(e, setStatus)}>
                        <option value={'new'}>new</option>
                        <option value={'completed'}>completed</option>
                        <option value={'assigned_to'}>assigned_to</option>
                        <option value={'declined'}>declined</option>
                        <option value={'started'}>started</option>
                    </select>
                    <hr/>
                    <button onClick={() => props.onSaveButtonCallback(
                        {
                            ...props.state,
                            status: status,
                        }
                    )}>Сохранить
                    </button>
                </div>
            </div>
        </div>
    )
})