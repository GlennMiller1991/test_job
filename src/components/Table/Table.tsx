import React from "react";
import styles from './Table.module.css'

export const Table: React.FC = () => {
    return (
        <div className={styles.wrapper}>
            <div className={`${styles.row} ${styles.hat}`}>
                <div>Номер/дата</div>
                <div>Тип задания/автор</div>
                <div>Аккаунт/Терминал</div>
                <div>Статус</div>
            </div>
        </div>
    )
}