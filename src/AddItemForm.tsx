import React, {KeyboardEvent, ChangeEvent, useState} from "react";

type propsType = {
    addItem: (title: string) => void;
}

export const AddItemForm = (props: propsType) => {
    const [inputValue, setInputValue] = useState<string>('');
    const [error, setError] = useState<string>('');

    const onInputKeyPressed = (event: KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') {
            addItemHandler();
        }
    }

    const onChangeInputValue = (event: ChangeEvent<HTMLInputElement>) => {
        setError('');
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
            <input value={inputValue} onChange={onChangeInputValue} onKeyPress={onInputKeyPressed}/>
            <button onClick={addItemHandler}>+</button>
            {error && <div className='error-message'>{error}</div>}
        </div>
    )
}