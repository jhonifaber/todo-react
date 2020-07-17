import React from "react";
import "./Todo.css"

export function Todo(props) {
    const onRemove = () => {
        props.onRemove(props.todo.id)
    };

    const handleChange = () => {
        props.onSelected(props.todo.id)
    };

    return (
        <>
            <input type="checkbox"
                   checked={props.todo.selected} onChange={handleChange}/>
            <span className={props.todo.selected ? "selected" : undefined}> {props.todo.name}</span>
            <button onClick={onRemove}>
                Remove
            </button>
        </>
    )
}