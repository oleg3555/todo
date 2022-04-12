import {v1} from "uuid";
import {tasksStateType, todolistType} from "../../App";
import {addTodolistAC, removeTodolistAC, todolistReducer} from "../todolistReducer";
import {taskReducer} from "../taskReducer";

test("todolist and empty array of tasks should exist", () => {
    const todolistId1 = v1();
    const todolistId2 = v1();
    const todolists: Array<todolistType> = [
        {id: todolistId1, title: "What to learn", filter: "all"},
        {id: todolistId2, title: "What to buy", filter: "all"}
    ];
    const tasks: tasksStateType = {
        [todolistId1]: [
            {id: v1(), title: "JS", isDone: true},
            {id: v1(), title: "React", isDone: false},
            {id: v1(), title: "Git", isDone: true}
        ],
        [todolistId2]: [
            {id: v1(), title: "Bread", isDone: false},
            {id: v1(), title: "Milk", isDone: false},
            {id: v1(), title: "Fish", isDone: true}
        ]
    }
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
    const todolistId1 = v1();
    const todolistId2 = v1();
    const todolists: Array<todolistType> = [
        {id: todolistId1, title: "What to learn", filter: "all"},
        {id: todolistId2, title: "What to buy", filter: "all"}
    ];
    const tasks: tasksStateType = {
        [todolistId1]: [
            {id: v1(), title: "JS", isDone: true},
            {id: v1(), title: "React", isDone: false},
            {id: v1(), title: "Git", isDone: true}
        ],
        [todolistId2]: [
            {id: v1(), title: "Bread", isDone: false},
            {id: v1(), title: "Milk", isDone: false},
            {id: v1(), title: "Fish", isDone: true}
        ]
    }
    const action = removeTodolistAC(todolistId1);
    const endTListsState = todolistReducer(todolists, action);
    const endTasksState = taskReducer(tasks, action);
    const keys = Object.keys(endTasksState);

    expect(endTListsState[0].title).toBe("What to buy");
    expect(endTListsState.length).toBe(1);
    expect(keys.length).toBe(1);
    expect(endTasksState[todolistId2].length).toBe(3);
})