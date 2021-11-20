import React, {ChangeEvent} from "react";
import styles from './Options.module.css'

type OptionsPropsType = {
    pageSize: number,
    changePageSizeCallback: (e: ChangeEvent<HTMLSelectElement>) => void,
}

export const Options: React.FC<OptionsPropsType> = React.memo((props) => {
    return (
        <div className={styles.optionsWrapper}>
            Показывать по
            <select className={styles.select}
                    value={props.pageSize} onChange={props.changePageSizeCallback}>
                <option value={3}>3</option>
                <option value={10}>10</option>
                <option value={25}>25</option>
            </select>
        </div>
    )
})