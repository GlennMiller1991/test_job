import React from "react";
import styles from "./Pagination.module.css";
import {LastPage} from "./LastPage/LastPage";

type PaginationPropsType = {
    totalPages: number,
    currentPage: number,
    changeCurrentPage: (newCurrentPage: number) => void,
}

export const Pagination: React.FC<PaginationPropsType> = React.memo((props) => {
    return (
        <div className={styles.pages}>
                    <span className={styles.changePage}
                          onClick={(e) => {
                              props.currentPage !== 1 && props.changeCurrentPage(props.currentPage - 1)
                          }}>
                        Предыдущая
                    </span>
            <span className={styles.currentPage}>
                        {props.currentPage}/
                    </span>
            <LastPage totalPages={props.totalPages} changeCurrentPageHandler={props.changeCurrentPage}/>
            <span className={styles.changePage}
                  onClick={(e) => {
                      props.currentPage !== props.totalPages && props.changeCurrentPage(props.currentPage + 1)
                  }}>
                        Следующая
                    </span>
        </div>
    )
})

