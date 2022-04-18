import {v1} from "uuid";
import {tasksStateType} from "../../App";
import {addTodolistAC, removeTodolistAC, todolistReducer, TodolistType} from "../todolistReducer";
import {taskReducer} from "../taskReducer";
import {TaskPriorities, TaskStatuses} from "../../api/todolists-api";


const testTaskId = v1();
const todolistId1 = v1();
const todolistId2 = v1();
const todolists: Array<TodolistType> = [
    {id: todolistId1, title: "What to learn", filter: "all", order: 0, addedDate: ''},
    {id: todolistId2, title: "What to buy", filter: "all", order: 0, addedDate: ''},
];

const tasks: tasksStateType = {
    [todolistId1]: [
        {
            id: v1(), title: "JS", status: TaskStatuses.Completed,
            addedDate: '',
            deadline: '',
            description: '',
            order: 0,
            priority: TaskPriorities.Low,
            startDate: '',
            todoListId: 'tl1'
        },
        {
            id: testTaskId, title: "React", status: TaskStatuses.New,
            addedDate: '',
            deadline: '',
            description: '',
            order: 0,
            priority: TaskPriorities.Low,
            startDate: '',
            todoListId: 'tl1'
        },
        {
            id: v1(), title: "Git", status: TaskStatuses.Completed,
            addedDate: '',
            deadline: '',
            description: '',
            order: 0,
            priority: TaskPriorities.Low,
            startDate: '',
            todoListId: 'tl1'
        }
    ],
    [todolistId2]: [
        {
            id: v1(), title: "Bread", status: TaskStatuses.New,
            addedDate: '',
            deadline: '',
            description: '',
            order: 0,
            priority: TaskPriorities.Low,
            startDate: '',
            todoListId: 'tl2'
        },
        {
            id: v1(), title: "Milk", status: TaskStatuses.New,
            addedDate: '',
            deadline: '',
            description: '',
            order: 0,
            priority: TaskPriorities.Low,
            startDate: '',
            todoListId: 'tl2'
        },
        {
            id: v1(), title: "Fish", status: TaskStatuses.Completed,
            addedDate: '',
            deadline: '',
            description: '',
            order: 0,
            priority: TaskPriorities.Low,
            startDate: '',
            todoListId: 'tl2'
        }
    ]
}


test("todolist and empty array of tasks should exist", () => {
    const action = addTodolistAC("What");
    const endTListsState = todolistReducer(todolists, action);
    const endTasksState = taskReducer(tasks, action);
    const keys = Object.keys(endTasksState);

    expect(endTListsState[2].title).toBe("What");
    expect(endTListsState[2].filter).toBe("all");
    expect(endTasksState[action.payload.id].length).toBe(0);
    expect(endTasksState[todolistId2].length).toBe(3);
    expect(keys[2]).toBe(action.payload.id);
})

test("array of tasks should be removed after deleting todolist", () => {
    const action = removeTodolistAC(todolistId1);
    const endTListsState = todolistReducer(todolists, action);
    const endTasksState = taskReducer(tasks, action);
    const keys = Object.keys(endTasksState);

    expect(endTListsState[0].title).toBe("What to buy");
    expect(endTListsState.length).toBe(1);
    expect(keys.length).toBe(1);
    expect(endTasksState[todolistId2].length).toBe(3);
})