import React, { createContext, useReducer } from 'react'
import AppReducer from './AppReducer'

// Initial State
const initialState = {
    expenses: [],
    incomes: []
}

// Create Context
export const GlobalContext = createContext(initialState)

// Provider Component
export const GlobalProvider = ({ children }) => {
    const [state, dispatch] = useReducer(AppReducer, initialState)

    // Actions
    function deleteTransaction(id, amount) {
        if (amount < 0) {
            dispatch({
                type: 'DELETE_EXPENSE',
                payload: id
            })
        }
        else {
            dispatch({
                type: 'DELETE_INCOME',
                payload: id
            })
        }
    }

    function addTransaction(transaction) {
        if (transaction.amount < 0) {
            dispatch({
                type: 'ADD_EXPENSE',
                payload: transaction
            })
        }
        else {
            dispatch({
                type: 'ADD_INCOME',
                payload: transaction
            })
        }
    }

    return (
        <GlobalContext.Provider value={ { expenses: state.expenses, incomes: state.incomes, deleteTransaction, addTransaction } }>
            {children}
        </GlobalContext.Provider>
    )
}