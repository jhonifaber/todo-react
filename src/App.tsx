import React from 'react'
import './App.css'
import { Todos } from './Todos/Todos'
import { Provider } from 'react-redux'
import store from './store/store'

export function App() {
    return (
        <Provider store={store}>
            <Todos />
        </Provider>
    )
}
