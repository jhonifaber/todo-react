import React, { useState } from 'react'
import { Todo } from '../Todo/Todo'
import { nanoid } from 'nanoid'

export interface ITodo {
    id: string
    selected: boolean
    name: string
}

export function Todos() {
    const [todos, setTodos] = useState<ITodo[]>([])
    const [text, setText] = useState('')

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setText(event.target.value)
    }

    const addItem = () => {
        const newTodo = {
            id: nanoid(),
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
        <>
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
        </>
    )
}
