import {entryPageStateType} from "../../../redux/entryReducer";
import React, {useCallback, useMemo, useState} from "react";
import styles from "../Entry.module.css";
import {entryType} from "../../../redux/entriesReducer";
import {fileApi} from "../../../api/fileApi";

type EntryInfoPropsType = {
    state: entryPageStateType,
    onSaveButtonCallback: (entry: entryType) => void,
}
export const EntryInfo: React.FC<EntryInfoPropsType> = React.memo((props) => {
    console.log('from entryInfo')
    const state = props.state

    //useMemo only for test aim, 'cause if we are getting data from server, we are must check it every time
    const [created_users, order_types, statuses] = useMemo(() => {
        return [fileApi.getAuthors(), fileApi.getOrders(), ['new', 'completed', 'assigned_to', 'declined', 'started']]
    }, [])

    const onBlurCallback = useCallback((obj: Object, changeEditModeFunct: (value: boolean) => void) => {
        props.onSaveButtonCallback({
            ...props.state,
            ...obj,
        })
        changeEditModeFunct(false)
    }, [props.onSaveButtonCallback, props.state])

    return (
        <div>
            <div>
                <div className={styles.entry}>
                    <UnchangablePart id={state.id}
                                     date={`${new Date(state.created_date).getDate()}.${new Date(state.created_date).getMonth()}.${new Date(state.created_date).getFullYear()} ${new Date(state.created_date).getHours()}:${new Date(state.created_date).getMinutes()}`}/>
                    <EditableSelect options={order_types}
                                    startValue={state.order_type}
                                    onBlurCallback={onBlurCallback}
                                    propertyName={'order_type'}/>
                    <hr/>
                    <EditableSelect options={created_users}
                                    startValue={state.created_user}
                                    onBlurCallback={onBlurCallback}
                                    propertyName={'created_user'}/>
                    <hr/>
                    {state.account.name}
                    <hr/>
                    {state.terminal.name}
                    <hr/>
                    <EditableSelect options={statuses}
                                    startValue={props.state.status}
                                    onBlurCallback={onBlurCallback}
                                    propertyName={'status'}/>
                    <hr/>
                </div>
            </div>
        </div>
    )
})

type EditableSelectPropsType = {
    options: string[],
    startValue: string,
    onBlurCallback: (obj: Object, changeEditModeFunct: (value: boolean) => void) => void,
    propertyName: string,
}
export const EditableSelect: React.FC<EditableSelectPropsType> = React.memo((props) => {
    console.log('from EditableSelect')
    const [value, setValue] = useState(props.startValue)
    const [editMode, setEditMode] = useState(false)
    return (
        <React.Fragment>
            {
                editMode ?
                    <select value={value}
                            autoFocus
                            onBlur={() => props.onBlurCallback({[props.propertyName]: value}, setEditMode)}
                            onChange={(e) => setValue(e.currentTarget.value)}>
                        {
                            props.options.map((option, id) => <option key={id} value={option}>{option}</option>)
                        }
                    </select>
                    :
                    <span onDoubleClick={() => setEditMode(true)}>{value}</span>
            }
        </React.Fragment>
    )
})

type UnchangablePartPropsType = {
    id: number,
    date: string,
}
export const UnchangablePart: React.FC<UnchangablePartPropsType> = React.memo((props) => {
    console.log('from UnchangablePart')
    return (
        <React.Fragment>
            №{props.id}
            <hr/>
            {props.date}
            <hr/>
        </React.Fragment>
    )
})