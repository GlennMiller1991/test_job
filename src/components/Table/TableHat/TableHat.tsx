import React from "react";
import styles from "../Table.module.css";

export const TableHat: React.FC = React.memo(() => {
    console.log('from table hat')
    return (
        <div className={`${styles.hat}`}>
            <div>Номер/дата</div>
            <div>Тип задания/автор</div>
            <div>Аккаунт/Терминал</div>
            <div>Статус</div>
        </div>
    )
})