import React, {ChangeEvent} from "react";
import styles from "../Table.module.css";

type OptionsPropsType = {
    changePageSizeCallback: (e: ChangeEvent<HTMLSelectElement>) => void
}

export const Options: React.FC<OptionsPropsType> = React.memo((props) => {
    console.log('from options')
    return (
            <div>
                Показывать по
                <select onChange={props.changePageSizeCallback}>
                    <option value={3}>3</option>
                    <option value={10}>10</option>
                    <option value={25}>25</option>
                </select>
            </div>
    )
})