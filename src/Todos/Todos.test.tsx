import React from 'react'
import {
    render,
    screen,
    within,
    waitForElementToBeRemoved,
} from '@testing-library/react'
import { Todos } from './Todos'
import userEvent from '@testing-library/user-event'

describe('TODOS', () => {
    async function waitForSpinnerToHide(component: any) {
        await waitForElementToBeRemoved(() => {
            component.queryByText('Loading items')
        })
    }

    test('different methods to get used to RTL ', async () => {
        const component = render(<Todos />)
        component.debug() //Always use RTL debug function to see the html structure (if you're not sure of it)
        expect(
            await component.findByRole('button', { name: /Add/i })
        ).toBeInTheDocument() // si tenemos 2 button o mas debemos usar el getAllByRole
        expect(component.getByDisplayValue('')).toBeInTheDocument() // input value
        component.debug() //Always use RTL debug function to see the html structure (if you're not sure of it)

        //expect(screen.getByText(/Searches for JavaScript/)).toBeNull() //esto no funciona porque o devuelve un valor
        // o devuelve error. Solucion: queryByText
        //Notas: todos los que sean getByAny no devuelven promise
    })

    test('checks default item is loaded asynchronously', async () => {
        render(<Todos />)

        expect(screen.getByText('Loading items')).toBeInTheDocument()
        expect(await screen.findByText('default item')).toBeInTheDocument()
    })

    test('checks user adds new item to the list', async () => {
        render(<Todos />)
        await userEvent.type(await screen.findByRole('textbox'), 'milk')
        userEvent.click(screen.getByRole('button', { name: /add/i }))
        expect(screen.getByRole('textbox')).toHaveValue('')
        let todoList = screen.getAllByRole('listitem')
        expect(todoList[1]).toHaveTextContent('milk')
        // expect(todoList).toHaveLength(2)
    })
})
