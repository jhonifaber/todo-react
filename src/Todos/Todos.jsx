import React, { useState } from 'react'
import { Todo } from '../Todo/Todo'
import { nanoid } from 'nanoid'

export function Todos() {
    const [todos, setTodos] = useState([])
    const [text, setText] = useState('')

    function handleChange(event) {
        setText(event.target.value)
    }

    function addItem() {
        const newTodo = {
            id: nanoid(),
            selected: false,
            name: text,
        }
        setTodos((list) => [...list, newTodo])
        cleanInputField()
    }

    const handleFormSubmit = (event) => {
        event.preventDefault()
        addItem()
    }

    function cleanInputField() {
        setText('')
    }

    const handleRemove = (id) => {
        const newList = todos.filter((todo) => todo.id !== id)
        setTodos(newList)
    }

    const handleSelected = (id) => {
        const todosCopy = [...todos]
        const todoIndex = todosCopy.findIndex((todo) => todo.id === id)
        todosCopy[todoIndex].selected = !todosCopy[todoIndex].selected
        setTodos(todosCopy)
    }

    return (
        <>
            <form onSubmit={handleFormSubmit}>
                <input type="text" value={text} onChange={handleChange}/>
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
