import {v1} from "uuid";
import {todolistType} from "../../App";
import {
    addTodolistAC,
    changeTodolistFilterAC,
    changeTodolistTitleAC,
    removeTodolistAC,
    todolistReducer
} from "../todolistReducer";

test("new todolist should be added", () => {
    const todolistId1 = v1();
    const todolistId2 = v1();
    const startState: Array<todolistType> = [
        {id: todolistId1, title: "What to learn", filter: "all"},
        {id: todolistId2, title: "What to buy", filter: "all"}
    ];
    const endState = todolistReducer(startState, addTodolistAC("WHAT TO COOK"));
    expect(endState.length).toBe(3);
    expect(endState[2].title).toBe("WHAT TO COOK");
    expect(endState[0].filter).toBe("all");
})

test("correct todolist should be removed", () => {
    const todolistId1 = v1();
    const todolistId2 = v1();
    const startState: Array<todolistType> = [
        {id: todolistId1, title: "What to learn", filter: "all"},
        {id: todolistId2, title: "What to buy", filter: "all"}
    ];
    const endState = todolistReducer(startState, removeTodolistAC(todolistId2));
    expect(endState.length).toBe(1);
    expect(endState[0].title).toBe("What to learn");
    expect(endState[0].filter).toBe("all");
})

test("correct todolist title should be changed", () => {
    const todolistId1 = v1();
    const todolistId2 = v1();
    const startState: Array<todolistType> = [
        {id: todolistId1, title: "What to learn", filter: "all"},
        {id: todolistId2, title: "What to buy", filter: "all"}
    ];
    const endState = todolistReducer(startState, changeTodolistTitleAC(todolistId1, "WHAT TO COOK"));
    expect(endState.length).toBe(2);
    expect(endState[0].title).toBe("WHAT TO COOK");
    expect(endState[1].filter).toBe("all");
})

test("correct todolist should change filter", () => {
    const todolistId1 = v1();
    const todolistId2 = v1();
    const startState: Array<todolistType> = [
        {id: todolistId1, title: "What to learn", filter: "all"},
        {id: todolistId2, title: "What to buy", filter: "all"}
    ];
    const endState = todolistReducer(startState, changeTodolistFilterAC(todolistId1, "completed"));
    expect(endState.length).toBe(2);
    expect(endState[1].title).toBe("What to buy");
    expect(endState[0].filter).toBe("completed");

})