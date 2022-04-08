import {useState, KeyboardEvent, ChangeEvent} from "react";
import React from "react";
import {TextField} from "@mui/material";

type propsType = {
    title: string,
    changeTitle: (title: string) => void;
}

export const EditableSpan = (props: propsType) => {
    const [editMode, setEditMode] = useState<boolean>(false);
    const [inputValue, setInputValue] = useState<string>(props.title);

    const enableEditMode = () => {
        setEditMode(true);
    }

    const changeTitle = () => {
        const newTitle = inputValue.trim();
        if (newTitle) {
            props.changeTitle(newTitle);
            setEditMode(false);
        }
    }

    const onKeyPressHandler = (event: KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') {
            changeTitle();
        }
    }

    const onInputChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
        setInputValue(event.currentTarget.value);
    }


    return editMode
        ? (<TextField size={'small'} label={'Type title'} value={inputValue} onBlur={changeTitle}
                      onKeyPress={onKeyPressHandler}
                      onChange={onInputChangeHandler} autoFocus/>)
        : (<span onDoubleClick={enableEditMode}>{props.title}</span>);
}