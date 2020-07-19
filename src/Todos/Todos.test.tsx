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
        const { queryByText, findByText, debug } = render(<Todos />)

        expect(queryByText('default item')).toBeNull()
        expect(await findByText('Loading items')).toBeInTheDocument() // por que await aqui?
        debug()
        expect(await findByText('default item')).toBeInTheDocument()
        debug()
    })

    test('checks user adds new item to the list', async () => {
        const component = render(<Todos />)
        await component.findByText('Loading items')
        userEvent.type(await component.findByRole('textbox'), 'milk')
        expect(component.getByRole('textbox')).toHaveAttribute('value', 'milk')
        userEvent.click(component.getByText('Add'))
        expect(component.getByRole('textbox')).toHaveAttribute('value', '')

        let todoList = component.getAllByRole('listitem')
        expect(todoList).toHaveLength(2)
        component.debug()
    })
})
