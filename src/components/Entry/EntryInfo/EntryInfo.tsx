import {entryPageStateType} from "../../../redux/entryReducer";
import React, {useCallback, useMemo} from "react";
import styles from "../Entry.module.css";
import {fileApi} from "../../../api/fileApi";
import {EditableSelect} from "./EditableSelect/EditableSelect";
import {UnchangablePart} from "./UnchangedPart/UnchangablePart";

type EntryInfoPropsType = {
    state: entryPageStateType,
    onSaveButtonCallback: (obj: Object, entryId: number) => void,
}
export const EntryInfo: React.FC<EntryInfoPropsType> = React.memo((props) => {
    console.log('from entryInfo')
    const state = props.state

    //useMemo only for test aim, 'cause if we are getting data from server, we are must check it every time
    const [created_users, order_types, statuses] = useMemo(() => {
        return [fileApi.getAuthors(), fileApi.getOrders(), ['new', 'completed', 'assigned_to', 'declined', 'started']]
    }, [])

    const onBlurCallback = useCallback((obj: Object, changeEditModeFunct: (value: boolean) => void) => {
        props.onSaveButtonCallback(obj, props.state.id)
        changeEditModeFunct(false)
    }, [props.onSaveButtonCallback, props.state.id])

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
                    <span className={styles.description}>Двойной клик по полям<br/>типа заявки,
                    исполнителя <br/>и статуса позволяет <br/>их редактировать</span>
                    <hr/>
                </div>
            </div>
        </div>
    )
})

