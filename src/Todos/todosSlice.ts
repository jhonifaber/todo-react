import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { ITodo } from './Todos'

type TodoState = {
    todosList: ITodo[]
}

export const todoSlice = createSlice({
    name: 'todos',
    initialState: {
        todosList: [],
    } as TodoState,
    reducers: {
        addTodo: (state, action) => {
            // @ts-ignore
            state.todosList.push(action.payload)
        },
        removeTodo: (state, action: PayloadAction<string>) => {
            const ItemId = action.payload
            const itemToRemove = state.todosList.filter(
                (item) => item.id !== ItemId
            )
            state.todosList = itemToRemove
        },
        changeSelectedState: (state, action: PayloadAction<string>) => {
            const ItemId = action.payload
            const todosCopy = [...state.todosList]
            const todoIndex = todosCopy.findIndex(
                (todo: any) => todo.id === ItemId
            )
            todosCopy[todoIndex].selected = !todosCopy[todoIndex].selected
            state.todosList = todosCopy
        },
    },
})

export const selectTodos = (state: any) => state.todos.todosList

export const { addTodo, removeTodo, changeSelectedState } = todoSlice.actions
