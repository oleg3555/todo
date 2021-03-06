import React, {KeyboardEvent, ChangeEvent, useState} from "react";
import {IconButton, TextField} from "@mui/material";
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import {useDispatch} from "react-redux";
import {setAppErrorAC} from "../../redux/reducers/appStatusReducer";

type propsType = {
    addItem: (title: string) => void,
    disabled?: boolean,
}

export const AddItemForm = React.memo((props: propsType) => {
    const dispatch = useDispatch();
    const [inputValue, setInputValue] = useState<string>('');
    const [error, setError] = useState<string>('');

    const onInputKeyPressed = (event: KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') {
            addItemHandler();
        }
    }

    const onChangeInputValue = (event: ChangeEvent<HTMLInputElement>) => {
        if (error) {
            setError('');
        }
        setInputValue(event.currentTarget.value);
    }

    const addItemHandler = () => {
        if (!props.disabled) {
            const title = inputValue.trim();
            if (title) {
                props.addItem(title);
                setInputValue('');
            } else {
                setError('Title is required');
            }
        } else {
            dispatch(setAppErrorAC('Please, add the task after loading of current task'));
        }
    }

    return (
        <div>
            <TextField size={'small'}
                       value={inputValue}
                       onChange={onChangeInputValue}
                       error={!!error}
                       helperText={error}
                       onKeyPress={onInputKeyPressed}
                       label={'Type title'}/>
            <IconButton color='primary' size={'medium'} onClick={addItemHandler} disabled={props.disabled}>
                <AddCircleOutlineIcon/>
            </IconButton>
        </div>
    )
});