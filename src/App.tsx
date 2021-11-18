import React, {useEffect} from 'react';
import './App.module.css';
import {Table} from './components/Table/Table';
import styles from './App.module.css'
import {HashRouter} from "react-router-dom";

const App: React.FC = React.memo(() => {
    useEffect(() => {
        document.title = 'Тестовое задание'
    }, [])

    return (
        <HashRouter>
            <div className={styles.app}>
                <h1>Тестовое задание</h1>
                <Table/>
            </div>
        </HashRouter>
    )
})

export default App;

