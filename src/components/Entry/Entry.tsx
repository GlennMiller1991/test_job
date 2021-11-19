import React, {useEffect} from "react";
import {RouteComponentProps, withRouter} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {entryPageStateType, setEntry} from "../../redux/entryReducer";
import {stateType} from "../../redux/rootStore";
import {fileApi} from "../../api/fileApi";
import styles from "./Entry.module.css";

type PathParamsType = {
    entryId: string,
}

const EntrySecret: React.FC<RouteComponentProps<PathParamsType>> = React.memo((props) => {
    //initial data
    const state = useSelector<stateType, entryPageStateType>(state => state.entryPage)
    const dispatch = useDispatch()

    //side-effects
    useEffect(() => {
        document.title = props.match.params.entryId
        dispatch(setEntry(fileApi.setEntry(+props.match.params.entryId)))
    }, [dispatch, props.match.params.entryId])

    return (
        <div>
            {
                (state.id !== -1) &&
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
                    </div>
                </div>
            }
        </div>
    )
})

export const Entry = withRouter(EntrySecret)