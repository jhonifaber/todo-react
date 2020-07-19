import React from 'react'

export function Cart(props: any) {
    // por que no puedo tipar a ITodo[]
    return (
        <div>
            Cart: <span>{props.todos.length}</span>
        </div>
    )
}
