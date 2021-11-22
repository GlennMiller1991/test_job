import React, {ChangeEvent, useMemo, useState} from "react";
import styles from "../Entry.module.css";
import {entryPageStateType} from "../../../redux/entryReducer";
import {entryType} from "../../../redux/entriesReducer";

type EntryEditPropsType = {
    state: entryPageStateType,
    onSaveButtonCallback: (entry: entryType) => void,
}
export const EntryEdit: React.FC<EntryEditPropsType> = React.memo((props) => {
    console.log('from entryEdit')
    const state = props.state
    const [orderType, setOrderType] = useState(state.order_type.name)
    const orderTypeLength = useMemo(() => {
        return orderType.length
    }, [])

    //author
    const fullName = state.created_user.surname + ' ' + state.created_user.name + ' ' + state.created_user.patronymic
    const [author, setAuthor] = useState(fullName)
    const authorLength = useMemo(() => {
        return author.length
    }, [])

    //terminal
    const [terminal, setTerminal] = useState(state.terminal.name)
    const terminalLength = useMemo(() => {
        return terminal.length
    }, [])

    //account
    const [account, setAccount] = useState(state.account.name)
    const accountLength = useMemo(() => {
        return account.length
    }, [])

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
            <h1>NOT IMPLEMENTED YET</h1>
            <div className={styles.entry}>
                {/*№{state.id}
                <hr/>
                {`${new Date(state.created_date).getDate()}.${new Date(state.created_date).getMonth()}.${new Date(state.created_date).getFullYear()} ${new Date(state.created_date).getHours()}:${new Date(state.created_date).getMinutes()}`}
                <hr/>
                <input value={orderType}
                       size={orderTypeLength}
                       autoFocus={true}
                       onChange={(e) => onChangeCallback(e, setOrderType)}/>
                <hr/>
                <input
                    value={author}
                    size={authorLength}
                    onChange={(e) => onChangeCallback(e, setAuthor)}/>
                <hr/>
                <input value={account}
                       size={accountLength}
                       onChange={(e) => onChangeCallback(e, setAccount)}/>
                <hr/>
                <input value={terminal}
                       size={terminalLength}
                       onChange={(e) => onChangeCallback(e, setTerminal)}/>
                <hr/>*/}
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
                            created_user: {
                                surname: author.split(' ')[0],
                                name: author.split(' ')[1],
                                patronymic: author.split(' ')[2],
                                oguid: props.state.created_user.oguid,
                            },
                            terminal: {
                                name: terminal,
                                oguid: props.state.terminal.oguid,
                            },
                            account: {
                                name: account,
                                oguid: props.state.account.oguid,
                            },
                            order_type: {
                                name: orderType,
                                oguid: props.state.order_type.oguid,
                            },
                            status: status,
                        }
                    )}>Сохранить
                    </button>
                </div>
            </div>
        </div>
    )
})