import React, {KeyboardEvent, ChangeEvent, useState} from "react";
import {IconButton, TextField} from "@mui/material";
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';

type propsType = {
    addItem: (title: string) => void;
}

export const AddItemForm = React.memo((props: propsType) => {
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
        const title = inputValue.trim();
        if (title) {
            props.addItem(title);
            setInputValue('');
        } else {
            setError('Title is required');
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
            <IconButton color='primary' size={'medium'} onClick={addItemHandler}>
                <AddCircleOutlineIcon/>
            </IconButton>
        </div>
    )
});