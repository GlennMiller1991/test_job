import React from "react";

type UnchangablePartPropsType = {
    id: number,
    date: string,
}
export const UnchangablePart: React.FC<UnchangablePartPropsType> = React.memo((props) => {
    console.log('from UnchangablePart')
    return (
        <React.Fragment>
            №{props.id}
            <hr/>
            {props.date}
            <hr/>
        </React.Fragment>
    )
})