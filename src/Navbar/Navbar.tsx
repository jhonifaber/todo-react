import React, { useContext } from 'react'
import { Cart } from '../Cart/Cart'
import { CartContext } from '../Todos/Todos'

export function Navbar(props: any) {
    // no puedo tipar a ITodo[]
    return (
        <nav>
            <Cart />
        </nav>
    )
}
