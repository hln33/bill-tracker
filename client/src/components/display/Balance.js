import React, { useContext } from 'react'

import { GlobalContext } from '../../context/GlobalState'

const mapAmounts = (arr) => arr.map(transaction => transaction.amount)
const totalAmount = (arr) => arr.reduce((total, amount) => (total += amount), 0)

function Balance() {
    const { incomes, expenses } = useContext(GlobalContext)

    const incomeAmounts = mapAmounts(incomes)
    const expenseAmounts = mapAmounts(expenses)
    
    const totalIncome = totalAmount(incomeAmounts)
    const totalExpense = totalAmount(expenseAmounts)

    const total = (totalIncome + totalExpense).toFixed(2)
    return (
        <div>
            <h4>Balance:</h4>
            <h1>{total}</h1>
        </div>
    )
}

export default Balance