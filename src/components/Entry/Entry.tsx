import React, {useCallback, useEffect, useState} from "react";
import {RouteComponentProps, withRouter} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {entryPageStateType, setEntry} from "../../redux/entryReducer";
import {stateType} from "../../redux/rootStore";
import {fileApi} from "../../api/fileApi";
import {EntryInfo} from "./EntryInfo/EntryInfo";
import {EntryEdit} from "./EntryEdit/EntryEdit";

type PathParamsType = {
    entryId: string,
}

const EntrySecret: React.FC<RouteComponentProps<PathParamsType>> = React.memo((props) => {
    //initial data
    const state = useSelector<stateType, entryPageStateType>(state => state.entryPage)
    const dispatch = useDispatch()

    //is edit mode?
    const [editMode, setEditMode] = useState(false)

    //callbacks
    const onEditButtonCallback = useCallback(() => {
        setEditMode(true)
    }, [])
    const onSaveButtonCallback = useCallback(() => {
        setEditMode(false)
    }, [])

    //side-effects
    useEffect(() => {
        document.title = props.match.params.entryId
        dispatch(setEntry(fileApi.setEntry(+props.match.params.entryId)))
    }, [dispatch, props.match.params.entryId])

    return (
        <React.Fragment>
            {editMode ?
                <EntryEdit state={state}
                           onSaveButtonCallback={onSaveButtonCallback}/> :
                <EntryInfo state={state}
                           onEditButtonCallback={onEditButtonCallback}
                />
            }
        </React.Fragment>
    )
})

export const Entry = withRouter(EntrySecret)