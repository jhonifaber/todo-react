import React, { useEffect, useState } from 'react'
import { Todo } from '../Todo/Todo'
import { nanoid } from 'nanoid'
import { Navbar } from '../Navbar/Navbar'

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
    const [todos, setTodos] = useState<ITodo[]>([])
    const [text, setText] = useState('')
    const [isLoading, setIsLoading] = useState(false)

    const loadDefaultItems = async () => {
        const defaultItem = await getDefaultItemsFromFakeAPI()
        setTodos((list) => [...list, defaultItem])
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
        setTodos((list) => [...list, newTodo])
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
        const newList = todos.filter((todo) => todo.id !== id)
        setTodos(newList)
    }

    const handleSelected = (id: string) => {
        const todosCopy = [...todos]
        const todoIndex = todosCopy.findIndex((todo) => todo.id === id)
        todosCopy[todoIndex].selected = !todosCopy[todoIndex].selected
        setTodos(todosCopy)
    }

    return (
        <CartProvider todos={todos}>
            <Navbar />
            <form onSubmit={handleFormSubmit}>
                <input type="text" value={text} onChange={handleChange} />
            </form>
            <button onClick={addItem}> Add</button>
            <ol>
                {todos.map((todo) => (
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
