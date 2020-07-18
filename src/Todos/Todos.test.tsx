import React from 'react'
import { render, screen } from '@testing-library/react'
import { Todos } from './Todos'

describe('TODOS', () => {
    test('tests different methods to get used to RTL ', () => {
        render(<Todos />)
        screen.debug() //Always use RTL debug function to see the html structure (if you're not sure of it)
        expect(screen.getByRole('button')).toBeInTheDocument()
        expect(screen.getByText('Add')).toBeInTheDocument()
        expect(screen.getByDisplayValue('')).toBeInTheDocument() // input value

        //expect(screen.getByText(/Searches for JavaScript/)).toBeNull() //esto no funciona porque o devuelve un valor
        // o devuelve error. Solucion: queryByText
    })
})
