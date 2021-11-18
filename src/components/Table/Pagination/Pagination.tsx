import React from "react";
import styles from "./Pagination.module.css";

type PaginationPropsType = {
    totalPages: number,
    currentPage: number,
    changeCurrentPage: (newCurrentPage: number) => void,
}

export const Pagination: React.FC<PaginationPropsType> = React.memo((props) => {
    console.log('from Pagination')
    return (
        <div className={styles.pages}>
                    <span className={styles.changePage}
                          onClick={(e) => {
                              props.changeCurrentPage(props.currentPage === 1 ? 1 : props.currentPage - 1)
                          }}>
                        Предыдущая
                    </span>
            <span className={styles.currentPage}>
                        {props.currentPage}/
                    </span>
            <span className={styles.lastPage}
                  onClick={(e) => {
                      props.changeCurrentPage(props.totalPages)
                  }}>
                        {props.totalPages}
                    </span>
            <span className={styles.changePage}
                  onClick={(e) => {
                      props.changeCurrentPage(props.currentPage === props.totalPages ? props.totalPages : props.currentPage + 1)
                  }}>
                        Следующая
                    </span>
        </div>
    )
})
