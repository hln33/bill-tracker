import React, { useContext } from 'react' 
import Transaction from '../transactions/Transaction'

import { GlobalContext } from '../../context/GlobalState'

function ExpenseList() {
    const { expenses } = useContext(GlobalContext)
    
    return (
        <div>
            <h3>Expense History</h3>
            <ul className="list">
                { expenses.map( expense => <Transaction key={expense.expenses_id} transaction={expense}/> )}  
            </ul>
        </div>
    )
}

export default ExpenseList