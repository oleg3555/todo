import React, {MouseEvent} from "react";
import {AddItemForm} from "./AddItemForm";
import {EditableSpan} from "./EditableSpan";

export type taskType = {
    id: string,
    title: string,
    isDone: boolean,
}
export type filterType = 'all' | 'active' | 'completed';

type propsType = {
    id: string,
    title: string,
    tasks: Array<taskType>
    removeTask: (todolistId: string, taskId: string) => void,
    changeFilter: (todolistId: string, value: filterType) => void,
    addTask: (todolistId: string, title: string) => void,
    removeTodolist: (todolistId: string) => void,
    changeTaskTitle: (todolistId: string, taskId: string, title: string) => void,
    filter: filterType,
}


export function Todolist(props: propsType) {

    const changeFilterHandler = (event: MouseEvent<HTMLButtonElement>) => {
        props.changeFilter(props.id, event.currentTarget.id as filterType);
    }

    const addTaskHandler = (title: string) => {
        props.addTask(props.id, title);
    }
    const removeTodolistHandler = () => {
        props.removeTodolist(props.id);
    }

    return (
        <div>
            <div className='inline'>
                <h3>{props.title}</h3>
                <button onClick={removeTodolistHandler}>x</button>
            </div>
            <div>
                <AddItemForm addItem={addTaskHandler}/>
            </div>
            <ul>
                {props.tasks.map(task => {
                    const removeTask = () => props.removeTask(props.id, task.id);

                    const changeTaskTitle = (title: string) => {
                        props.changeTaskTitle(props.id, task.id, title)
                    }

                    return (
                        <li key={task.id} className={task.isDone ? 'is-done' : ''}>
                            <input type='checkbox' checked={task.isDone}/>
                            <EditableSpan title={task.title} changeTitle={changeTaskTitle}/>
                            <button type='button' onClick={removeTask}>x</button>
                        </li>)
                })}
            </ul>
            <div>
                <button type='button' id='all' onClick={changeFilterHandler}
                        className={props.filter === 'all' ? 'active-filter' : ''}>
                    All
                </button>
                <button type='button' id='active' onClick={changeFilterHandler}
                        className={props.filter === 'active' ? 'active-filter' : ''}>
                    Active
                </button>
                <button type='button' id='completed' onClick={changeFilterHandler}
                        className={props.filter === 'completed' ? 'active-filter' : ''}>
                    Completed
                </button>
            </div>
        </div>
    )
}