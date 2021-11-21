import {entryPageStateType} from "../../../redux/entryReducer";
import React from "react";
import styles from "../Entry.module.css";

type EntryInfoPropsType = {
    state: entryPageStateType,
    onEditButtonCallback: () => void
}
export const EntryInfo: React.FC<EntryInfoPropsType> = React.memo((props) => {
    const state = props.state
    return (
        <div>
            <div>
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
                    {state.status}
                    <hr/>
                    <button onClick={props.onEditButtonCallback}>Редактировать</button>
                </div>
            </div>
        </div>
    )
})