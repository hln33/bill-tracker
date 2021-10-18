import React, { useContext } from 'react' 

import { GlobalContext } from '../../context/GlobalState'
import Axios from 'axios'

function Transaction({ transaction }) {
    const { deleteTransaction } = useContext(GlobalContext)

    const sign = transaction.amount >= 0 ? '+' : '-'
    const date = transaction.date
    const month = date.getMonth() + 1
    const day = date.getDate()
    const year = date.getFullYear()

    const deleteTransaction2 = (id, amount) => {
        Axios.delete(`http://localhost:3001/api/delete/${id}`)
        deleteTransaction(id, amount)
    }

    return (
        <div>
            <li className={transaction.amount < 0 ? 'minus' : 'plus'}>
                <div className="column"> {transaction.text} </div>
                <div className="column"> <span>{sign}${Math.abs(transaction.amount)}</span> </div>
                <div className="column"> {month < 10 ? "0" + month : month }/{day < 10 ? "0" + day : day}/{year} </div>
                <button className="delete-butn" onClick={() => { deleteTransaction2(transaction.id, transaction.amount) }}>x</button>
            </li>
        </div>
    )
}

export default Transaction