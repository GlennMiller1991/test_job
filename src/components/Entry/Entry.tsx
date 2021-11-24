import React, {useCallback, useEffect} from "react";
import {RouteComponentProps, withRouter} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {entryPageStateType, setEntry} from "../../redux/entryReducer";
import {stateType} from "../../redux/rootStore";
import {fileApi} from "../../api/fileApi";
import {EntryInfo} from "./EntryInfo/EntryInfo";
import preLoader from '../../common/preloader.gif'
import {entriesPageType, getEntries} from "../../redux/entriesReducer";

type PathParamsType = {
    entryId: string,
}

const EntrySecret: React.FC<RouteComponentProps<PathParamsType>> = React.memo((props) => {
    console.log('from Entry')
    //initial data
    const state = useSelector<stateType, entryPageStateType>(state => state.entryPage)
    const entriesState = useSelector<stateType, entriesPageType>(state => state.entriesPage)
    const dispatch = useDispatch()

    const onSaveButtonCallback = useCallback((obj: Object, entryId: number) => {
        fileApi.renewData(obj, entryId)
        dispatch(setEntry(fileApi.setEntry(state.id)))
        const {entries, totalCount} = fileApi.getEntries(
            entriesState.pageSize,
            entriesState.currentPage,
            entriesState.filter,
            entriesState.sortDate)
        dispatch(getEntries(entries, totalCount, 1))
    }, [state.id, dispatch])

    //side-effects
    useEffect(() => {
        document.title = props.match.params.entryId
        dispatch(setEntry(fileApi.setEntry(+props.match.params.entryId)))
    }, [dispatch, props.match.params.entryId])

    return (
        <React.Fragment>
            {
                state.id !== +props.match.params.entryId ?
                    <img src={preLoader} alt={'please, wait...'}/> :
                    <EntryInfo state={state}
                               onSaveButtonCallback={onSaveButtonCallback}/>
            }
        </React.Fragment>
    )
})

export const Entry = withRouter(EntrySecret)