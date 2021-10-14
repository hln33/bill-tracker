import React, { useContext } from 'react'

import { GlobalContext } from '../../context/GlobalState'

const mapAmounts = (arr) => arr.map(transaction => transaction.amount)
const totalAmount = (arr) => arr.reduce((total, amount) => (total += amount), 0)

function IncomeExpense() {
  const { incomes, expenses } = useContext(GlobalContext)

  const incomeAmounts = mapAmounts(incomes)
  const expenseAmounts = mapAmounts(expenses)
  
  const incomeTotal = totalAmount(incomeAmounts)
  const expenseTotal = totalAmount(expenseAmounts)

  return (
    <div className="inc-exp-container">
      <div>
        <h4>Income</h4>
        <p className="money plus">+${incomeTotal.toFixed(2)}</p>
      </div>
      <div>
        <h4>Expense</h4>
        <p className="money minus">-${Math.abs(expenseTotal).toFixed(2)}</p>
      </div>
    </div>
  )
}

export default IncomeExpense