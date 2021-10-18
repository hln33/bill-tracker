import React, { useContext, useEffect, useState } from 'react'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'

import { GlobalContext } from '../../context/GlobalState'
import Axios from 'axios'

function AddTransaction() {
    const fetchData = async () => {
        await Axios.get('http://localhost:3001/api/get').then(response => {
            for (let i = 0; i < response.data.length; ++i) {                
                response.data[i].date = new Date(Date.parse(response.data[i].date))
                addTransaction(response.data[i])
            }
        })
    }
    useEffect(() => {
        fetchData()
    }, [])

    const { addTransaction } = useContext(GlobalContext)
    const [text, setText] = useState("")
    const [amount, setAmount] = useState(0)
    const [date, setDate] = useState(new Date())
    const [type, setType] = useState("Food")

    const handleSubmit = (e) => {
        e.preventDefault()
        let transactionType = amount >= 0 ? null : type
        const newTransaction = {
            id: Math.floor(Math.random() * 100000),
            text,
            amount: parseInt(amount),
            date,
            type: transactionType
        }

        //send data to display components and back-end
        Axios.post('http://localhost:3001/api/insert', newTransaction).then(() => {
            alert("successful insert")
        })
        addTransaction(newTransaction)
    }
    return (
        <div>
        <h3>Add new transaction</h3>
            <form onSubmit={handleSubmit}>
                {/* Transaction Text */}
                <label htmlFor="text">Description</label>
                <input  
                    type="text"
                    placeholder="Enter text..." 
                    value={text}
                    onChange={ (e) => setText(e.target.value) }
                />

                {/* Transaction Amount */}
                <label htmlFor="amount"
                    >Amount <br />
                    (negative - expense, positive - income)
                </label>
                <input  
                    type="number"
                    placeholder="Enter amount..." 
                    value={amount}
                    onChange={ (e) => setAmount(e.target.value) }
                />
                
                {/* Expense Type */}
                { amount < 0 ? (
                    <div>
                        <label>Type of Expense</label><br />
                        <select value={type} onChange={ (e) => setType(e.target.value)}>
                            <option value="Clothing">Clothing</option>
                            <option value="Education">Education</option>
                            <option value="Food">Food</option>
                            <option value="Groceries">Groceries</option>
                            <option value="Rent">Rent</option>
                            <option value="Insurance">Insurance</option>
                            <option value="Leisure">Leisure</option>
                            <option value="Transportation">Transportation</option>
                            <option value="Utility">Utility</option>
                            <option value="Other">Other</option>
                        </select>
                        <br />
                    </div>
                    ) : null }

                {/* Transaction Date */}
                <label>Date of Transaction</label>
                <DatePicker dateFormat="MM/dd/yyyy" selected={date} onChange={ (date) => setDate(date)}/>

                <button className="btn">Add transaction</button>
            </form>
        </div>
    )
}

export default AddTransaction 