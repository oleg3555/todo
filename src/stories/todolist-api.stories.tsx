import React, {useEffect, useState} from 'react'
import {todolistsAPI} from "../api/todolists-api";

export default {
    title: 'API'
}


export const GetTodolists = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        (async () => {
            const res = await todolistsAPI.getTodolists();
            setState(res.data);
        })();
    }, [])

    return <div> {JSON.stringify(state)}</div>
}

export const CreateTodolist = () => {
    const [state, setState] = useState<any>(null);
    const [title, setTitle] = useState<string>('');

    const createTodolist = async () => {
        const res = await todolistsAPI.createTodolist(title);
        setState(res.data);
    }

    return <div>
        <input placeholder='title' value={title} onChange={e => setTitle(e.currentTarget.value)}/>
        <button onClick={createTodolist}>Create</button>
        <div>{JSON.stringify(state)}</div>
    </div>
}

export const DeleteTodolist = () => {
    const [state, setState] = useState<any>(null);
    const [todolistId, setTodolistId] = useState<string>('');

    const removeTodolist = async () => {
        const res = await todolistsAPI.removeTodolist(todolistId);
        setState(res.data);
    }

    return <div>
        <input placeholder='todolistId' value={todolistId} onChange={e => setTodolistId(e.currentTarget.value)}/>
        <button onClick={removeTodolist}>Remove</button>
        <div>{JSON.stringify(state)}</div>
    </div>
}

export const UpdateTodolistTitle = () => {
    const [state, setState] = useState<any>(null);
    const [todolistId, setTodolistId] = useState<string>('');
    const [title, setTitle] = useState<string>('');

    const updateTodolist = async () => {
        const res = await todolistsAPI.updateTodolist(todolistId, title);
        setState(res.data);
    }

    return <div>
        <input placeholder='todolistId' value={todolistId} onChange={e => setTodolistId(e.currentTarget.value)}/>
        <input placeholder='title' value={title} onChange={e => setTitle(e.currentTarget.value)}/>
        <button onClick={updateTodolist}>Update</button>
        <div>{JSON.stringify(state)}</div>
    </div>
}


export const GetTasks = () => {
    const [state, setState] = useState<any>(null);
    const [todolistId, setTodolistId] = useState<string>('');

    const getTasks = async () => {
        const res = await todolistsAPI.getTasks(todolistId);
        setState(res.data);
    }

    return <div>
        <input placeholder='todolistId' value={todolistId} onChange={e => setTodolistId(e.currentTarget.value)}/>
        <button onClick={getTasks}>Get tasks</button>
        <div>{JSON.stringify(state)}</div>
    </div>
}


export const addTask = () => {
    const [state, setState] = useState<any>(null);
    const [todolistId, setTodolistId] = useState<string>('');
    const [title, setTitle] = useState<string>('');

    const addTask = async () => {
        const res = await todolistsAPI.addTask(todolistId, title);
        setState(res.data);
    }
    return <div>
        <input placeholder='todolistId' value={todolistId} onChange={e => setTodolistId(e.currentTarget.value)}/>
        <input placeholder='title' value={title} onChange={e => setTitle(e.currentTarget.value)}/>
        <button onClick={addTask}>Add task</button>
        <div>{JSON.stringify(state)}</div>
    </div>
}

export const removeTask = () => {
    const [state, setState] = useState<any>(null)
    const [taskId, setTaskId] = useState<string>('')
    const [todolistId, setTodolistId] = useState<string>('')

    const removeTask = async () => {
        const res = await todolistsAPI.removeTask(todolistId, taskId);
        setState(res.data);
    }

    return <div>
        <input placeholder='taskId' value={taskId} onChange={e => setTaskId(e.currentTarget.value)}/>
        <input placeholder='todolistId' value={todolistId} onChange={e => setTodolistId(e.currentTarget.value)}/>
        <button onClick={removeTask}>Remove</button>
        <div>{JSON.stringify(state)}</div>
    </div>
}

export const updateTask = () => {
    const [state, setState] = useState<any>(null)
    const [taskId, setTaskId] = useState<string>('')
    const [todolistId, setTodolistId] = useState<string>('')

    const updateTask = async () => {
        const updatedTask = {
            title: 'Hellooooo',
            description: 'smth',
            status: 1,
            priority: 2,
            startDate: null,
            deadline: null,
        }
        const res = await todolistsAPI.updateTask(todolistId, taskId, updatedTask);
        setState(res.data);
    }

    return <div>
        <input placeholder='taskId' value={taskId} onChange={e => setTaskId(e.currentTarget.value)}/>
        <input placeholder='todolistId' value={todolistId} onChange={e => setTodolistId(e.currentTarget.value)}/>
        <button onClick={updateTask}>Update Task</button>
        <div>{JSON.stringify(state)}</div>
    </div>
}