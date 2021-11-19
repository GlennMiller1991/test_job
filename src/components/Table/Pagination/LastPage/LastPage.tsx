import React from "react";
import styles from "../Pagination.module.css";

type LastPagePropsType = {
    totalPages: number,
    changeCurrentPageHandler: (newCurrentPage: number) => void,
}
export const LastPage: React.FC<LastPagePropsType> = React.memo((props) => {
    return (
        <span className={styles.lastPage}
              onClick={(e) => {
                  props.changeCurrentPageHandler(props.totalPages)
              }}>
                        {props.totalPages}
                    </span>
    )
})