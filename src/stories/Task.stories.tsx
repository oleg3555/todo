import React from 'react';
import {Task} from "../Task";
import {action} from "@storybook/addon-actions";

export default {
    title: 'Task',
    component: Task,
}

const task1 = {id: '1', title: 'TypeScript', isDone: true}
const task2 = {id: '2', title: 'React', isDone: false}

const removeTaskCallback = action('Task removed');
const changeTaskTitle = action('Title changed');
const changeTaskStatus = action('Status changed');


export const TaskBaseExample = () => {
    return <>
        <Task task={task1} removeTask={removeTaskCallback} changeTaskTitle={changeTaskTitle}
              changeTaskStatus={changeTaskStatus}/>
        <Task task={task2} removeTask={removeTaskCallback} changeTaskTitle={changeTaskTitle}
              changeTaskStatus={changeTaskStatus}/>
    </>
}