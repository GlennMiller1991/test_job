import React from 'react';
import './App.module.css';
import {TableContainer} from './components/Table/Table';
import styles from './App.module.css'
import {HashRouter, NavLink, Route} from "react-router-dom";
import {Switch} from 'react-router-dom';
import {Entry} from "./components/Entry/Entry";

const App: React.FC = React.memo(() => {

    return (
        <HashRouter>
            <div className={styles.app}>
                <h1><NavLink to={'/'}>Тестовая версия</NavLink></h1>
                <Switch>
                    <Route path={'/'} exact render={() => <TableContainer/>}/>
                    <Route path={'/order/:entryId'} render={() => <Entry/>}/>
                </Switch>
            </div>
        </HashRouter>
    )
})

export default App;

