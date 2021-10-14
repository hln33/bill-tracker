import React, { useContext } from 'react' 
import Transaction from '../transactions/Transaction'

import { GlobalContext } from '../../context/GlobalState'

function IncomeList() {
    const { incomes } = useContext(GlobalContext)

    return (
        <div>
            <h3>Income History</h3>
            <ul className="list">
                {incomes.map( income => <Transaction key={income.incomes_id} transaction={income}/> )}
            </ul>
        </div>
    )
}

export default IncomeList