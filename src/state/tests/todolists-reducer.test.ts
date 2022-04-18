import {v1} from "uuid";
import {
    addTodolistAC,
    changeTodolistFilterAC,
    changeTodolistTitleAC,
    removeTodolistAC, setTodolistsAC,
    todolistReducer, TodolistType
} from "../todolistReducer";
import {apiTodolistType} from "../../api/todolists-api";

test("new todolist should be added", () => {
    const todolistId1 = v1();
    const todolistId2 = v1();
    const startState: Array<TodolistType> = [
        {id: todolistId1, title: "What to learn", filter: "all", addedDate: '', order: 0},
        {id: todolistId2, title: "What to buy", filter: "all", addedDate: '', order: 0}
    ];
    const endState = todolistReducer(startState, addTodolistAC("WHAT TO COOK"));
    expect(endState.length).toBe(3);
    expect(endState[2].title).toBe("WHAT TO COOK");
    expect(endState[0].filter).toBe("all");
})

test("correct todolist should be removed", () => {
    const todolistId1 = v1();
    const todolistId2 = v1();
    const startState: Array<TodolistType> = [
        {id: todolistId1, title: "What to learn", filter: "all", order: 0, addedDate: ''},
        {id: todolistId2, title: "What to buy", filter: "all", order: 0, addedDate: ''}
    ];
    const endState = todolistReducer(startState, removeTodolistAC(todolistId2));
    expect(endState.length).toBe(1);
    expect(endState[0].title).toBe("What to learn");
    expect(endState[0].filter).toBe("all");
})

test("correct todolist title should be changed", () => {
    const todolistId1 = v1();
    const todolistId2 = v1();
    const startState: Array<TodolistType> = [
        {id: todolistId1, title: "What to learn", filter: "all", order: 0, addedDate: ''},
        {id: todolistId2, title: "What to buy", filter: "all", order: 0, addedDate: ''}
    ];
    const endState = todolistReducer(startState, changeTodolistTitleAC(todolistId1, "WHAT TO COOK"));
    expect(endState.length).toBe(2);
    expect(endState[0].title).toBe("WHAT TO COOK");
    expect(endState[1].filter).toBe("all");
})

test("correct todolist should change filter", () => {
    const todolistId1 = v1();
    const todolistId2 = v1();
    const startState: Array<TodolistType> = [
        {id: todolistId1, title: "What to learn", filter: "all", order: 0, addedDate: ''},
        {id: todolistId2, title: "What to buy", filter: "all", order: 0, addedDate: ''}
    ];
    const endState = todolistReducer(startState, changeTodolistFilterAC(todolistId1, "completed"));
    expect(endState.length).toBe(2);
    expect(endState[1].title).toBe("What to buy");
    expect(endState[0].filter).toBe("completed");

})

test('todolists should set to store', () => {
    const todolists: Array<apiTodolistType> = [
        {id: v1(), title: "What to learn", order: 0, addedDate: ''},
        {id: v1(), title: "What to buy", order: 0, addedDate: ''}
    ];
    const endState=todolistReducer([],setTodolistsAC(todolists));
    expect((endState.length)).toBe(2);
    expect(endState[0].filter).toBeDefined();
})