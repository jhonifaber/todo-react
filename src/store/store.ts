import { configureStore } from '@reduxjs/toolkit'
import { todoSlice } from '../Todos/todosSlice'

export default configureStore({
    reducer: {
        todos: todoSlice.reducer,
    },
})
