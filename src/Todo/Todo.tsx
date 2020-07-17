import React from 'react'
import './Todo.css'
import { ITodo } from '../Todos/Todos'

interface Props {
    todo: ITodo
    onRemove: (id: string) => void
    onSelected: (id: string) => void
}

export function Todo(props: Props) {
    const onRemove = () => {
        props.onRemove(props.todo.id)
    }

    const handleChange = () => {
        props.onSelected(props.todo.id)
    }

    return (
        <>
            <input
                type="checkbox"
                checked={props.todo.selected}
                onChange={handleChange}
            />
            <span className={props.todo.selected ? 'selected' : undefined}>
                {props.todo.name}
            </span>
            <button onClick={onRemove}>Remove</button>
        </>
    )
}
