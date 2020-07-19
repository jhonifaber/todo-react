import React from 'react'
import { Cart } from '../Cart/Cart'

export function Navbar(props: any) {
    // no puedo tipar a ITodo[]
    return (
        <nav>
            <Cart todos={props.todos} />
        </nav>
    )
}
