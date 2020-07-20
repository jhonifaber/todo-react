import React, { useContext } from 'react'
import { CartContext } from '../Todos/Todos'

export function Cart(props: any) {
    const todos = useContext(CartContext)
    return (
        <div>
            Cart: <span>{todos.length}</span>
        </div>
    )
}
