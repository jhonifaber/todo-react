import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { ITodo } from './Todos'

type TodoState = {
    todosList: ITodo[]
}

export const fetchTodo = createAsyncThunk('todos/fetchTodo', async () => {
    return new Promise((resolve) => {
        setTimeout(() => {
            const defaultItem = {
                id: 'xcvbnm',
                selected: false,
                name: 'async item',
            }
            // @ts-ignore
            resolve(defaultItem)
        }, 2000)
    })
})

export const todoSlice = createSlice({
    name: 'todos',
    initialState: {
        todosList: [],
    } as TodoState,
    reducers: {
        addTodo: (state, action) => {
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
    extraReducers: {
        // @ts-ignore
        [fetchTodo.fulfilled]: (state, action) => {
            state.todosList.push(action.payload)
        },
    },
})

export const selectTodos = (state: any) => state.todos.todosList

export const { addTodo, removeTodo, changeSelectedState } = todoSlice.actions
