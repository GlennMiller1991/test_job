import React, {useState} from "react";

type EditableSelectPropsType = {
    options: string[],
    startValue: string,
    onBlurCallback: (obj: Object, changeEditModeFunct: (value: boolean) => void) => void,
    propertyName: string,
}
export const EditableSelect: React.FC<EditableSelectPropsType> = React.memo((props) => {
    console.log('from EditableSelect')
    const [value, setValue] = useState(props.startValue)
    const [editMode, setEditMode] = useState(false)
    return (
        <React.Fragment>
            {
                editMode ?
                    <select value={value}
                            autoFocus
                            onBlur={() => props.onBlurCallback({[props.propertyName]: value}, setEditMode)}
                            onChange={(e) => setValue(e.currentTarget.value)}>
                        {
                            props.options.map((option, id) => <option key={id} value={option}>{option}</option>)
                        }
                    </select>
                    :
                    <span onDoubleClick={() => setEditMode(true)}>{value}</span>
            }
        </React.Fragment>
    )
})