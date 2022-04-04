import React, {useState} from 'react';
import './App.css';
import {filterType, taskType, Todolist} from "./Todolist";
import {v1} from "uuid";
import {AddItemForm} from "./AddItemForm";

type todolistType = {
    id: string,
    title: string,
    filter: filterType,
}

type tasksStateType = {
    [key: string]: Array<taskType>,
}

function App() {
    const todolistId1 = v1();
    const todolistId2 = v1();

    const [todolists, setTodolists] = useState<Array<todolistType>>([
        {id: todolistId1, title: 'What to learn', filter: 'all'},
        {id: todolistId2, title: 'What to buy', filter: 'all'},
    ])

    const [tasks, setTasks] = useState<tasksStateType>({
        [todolistId1]: [
            {id: v1(), title: 'JS', isDone: true},
            {id: v1(), title: 'TypeScript', isDone: false},
            {id: v1(), title: 'React', isDone: true},
        ],
        [todolistId2]: [
            {id: v1(), title: 'Milk', isDone: true},
            {id: v1(), title: 'Pepsi', isDone: true},
            {id: v1(), title: 'Crisps', isDone: false},
        ]
    });

    const removeTask = (todolistId: string, taskId: string) => {
        const updatedTasks = tasks[todolistId].filter(task => task.id !== taskId);
        setTasks({...tasks, [todolistId]: updatedTasks})
    }

    const addTask = (todolistId: string, title: string) => {
        const newTask = {id: v1(), title, isDone: false};
        const updatedTasks = [newTask, ...tasks[todolistId]];
        setTasks({...tasks, [todolistId]: updatedTasks});
    }

    const changeFilter = (todolistId: string, value: filterType) => {
        const updatedTodolists = todolists.map(item => item.id === todolistId ? {...item, filter: value} : item);
        setTodolists(updatedTodolists);
    }

    const removeTodolist = (todolistId: string) => {
        const updatedTodolists = todolists.filter(item => item.id !== todolistId);
        setTodolists(updatedTodolists);
        delete tasks[todolistId];
    }

    const addTodolist = (title: string) => {
        const todolistId = v1();
        const newTodolist: todolistType = {id: todolistId, title, filter: 'all'};
        setTodolists([newTodolist, ...todolists]);
        setTasks({...tasks, [todolistId]: []});
    }

    const changeTaskTitle = (todolistId: string, taskId: string, title: string) => {
        const updatedTasks = tasks[todolistId].map(task => task.id === taskId ? {...task, title} : task);
        setTasks({...tasks, [todolistId]: updatedTasks});
    }


    return (
        <div className="App">
            <div>
                <AddItemForm addItem={addTodolist}/>
            </div>
            {todolists.map(todo => {
                let tasksForTodolist = tasks[todo.id];
                if (todo.filter === 'active') {
                    tasksForTodolist = tasks[todo.id].filter(task => !task.isDone);
                } else if (todo.filter === 'completed') {
                    tasksForTodolist = tasks[todo.id].filter(task => task.isDone);
                }

                return (<Todolist key={todo.id}
                                  id={todo.id}
                                  title={todo.title}
                                  filter={todo.filter}
                                  changeTaskTitle={changeTaskTitle}
                                  removeTodolist={removeTodolist}
                                  changeFilter={changeFilter}
                                  addTask={addTask}
                                  removeTask={removeTask}
                                  tasks={tasksForTodolist}/>)
            })}
        </div>
    );
}

export default App;
