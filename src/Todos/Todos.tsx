import React, { useEffect, useState } from 'react'
import { Todo } from '../Todo/Todo'
import { nanoid } from 'nanoid'
import { Navbar } from '../Navbar/Navbar'
import store from '../store/store'
import { useDispatch, useSelector, useStore } from 'react-redux'
import {
    addTodo,
    removeTodo,
    changeSelectedState,
    selectTodos,
    fetchTodo,
} from './todosSlice'

export const CartContext = React.createContext([])

function CartProvider(props: any) {
    //suele tener un estado interno
    return (
        <CartContext.Provider value={props.todos}>
            {props.children}
        </CartContext.Provider>
    )
}

export interface ITodo {
    id: string
    selected: boolean
    name: string
}

function getDefaultItemsFromFakeAPI(): Promise<ITodo> {
    return new Promise((resolve) => {
        setTimeout(() => {
            const defaultItem = {
                id: 'asdfgtrd454',
                selected: false,
                name: 'default item',
            }
            resolve(defaultItem)
        }, 2000)
    })
}

export function Todos() {
    const todos = useSelector(selectTodos)
    const dispatch = useDispatch()

    const [text, setText] = useState('')
    const [isLoading, setIsLoading] = useState(false)

    const loadDefaultItems = async () => {
        const defaultItem = await getDefaultItemsFromFakeAPI()
        dispatch(addTodo(defaultItem))
        setIsLoading(false)
    }

    useEffect(() => {
        setIsLoading(true)
        loadDefaultItems()
    }, [])

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setText(event.target.value)
    }

    if (isLoading) {
        return <p> Loading items </p>
    }

    const addItem = () => {
        const newTodo = {
            id: '2345',
            selected: false,
            name: text,
        }
        dispatch(addTodo(newTodo))
        cleanInputField()
    }

    const handleFormSubmit = (event: React.FormEvent) => {
        event.preventDefault()
        addItem()
    }

    const cleanInputField = () => {
        setText('')
    }

    const handleRemove = (id: string) => {
        dispatch(removeTodo(id))
    }

    const handleSelected = (id: string) => {
        dispatch(changeSelectedState(id))
    }

    const handleAsyncEvent = async () => {
        const newVar = await dispatch(fetchTodo())
    }

    return (
        <CartProvider todos={todos}>
            <Navbar />
            <button onClick={handleAsyncEvent}>async button </button>
            <form onSubmit={handleFormSubmit}>
                <input type="text" value={text} onChange={handleChange} />
            </form>
            <button onClick={addItem}> Add</button>
            <ol>
                {todos.map((todo: any) => (
                    <li key={todo.id}>
                        <Todo
                            todo={todo}
                            onRemove={handleRemove}
                            onSelected={handleSelected}
                        />
                    </li>
                ))}
            </ol>
        </CartProvider>
    )
}
