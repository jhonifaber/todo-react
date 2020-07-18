import React from 'react'
import { render, screen, within } from '@testing-library/react'
import { Todos } from './Todos'
import userEvent from '@testing-library/user-event'

describe('TODOS', () => {
    test('different methods to get used to RTL ', () => {
        render(<Todos />)
        screen.debug() //Always use RTL debug function to see the html structure (if you're not sure of it)
        expect(screen.getByRole('button')).toBeInTheDocument() // si tenemos 2 button o mas debemos usar el getAllByRole
        expect(screen.getByText('Add')).toBeInTheDocument()
        expect(screen.getByDisplayValue('')).toBeInTheDocument() // input value

        //expect(screen.getByText(/Searches for JavaScript/)).toBeNull() //esto no funciona porque o devuelve un valor
        // o devuelve error. Solucion: queryByText
    })

    test('checks default item is loaded asynchronously', async () => {
        const { queryByText, findByText, debug } = render(<Todos />)
        expect(queryByText('default item')).toBeNull()
        debug()
        expect(await findByText('default item')).toBeInTheDocument()
        debug()
    })

    test('checks user adds new item to the list', () => {
        const { getAllByRole, getByRole, getByText, debug } = render(<Todos />)
        debug()

        userEvent.type(getByRole('textbox'), 'milk')
        expect(getByRole('textbox')).toHaveAttribute('value', 'milk')
        userEvent.click(getByText('Add'))
        expect(getByRole('textbox')).toHaveAttribute('value', '')

        let todoList = getAllByRole('listitem')
        expect(todoList).toHaveLength(1)
        debug()
    })
})
