import React, { useContext } from 'react' 
import { BarChart, Bar, CartesianGrid, XAxis, YAxis, ResponsiveContainer, Tooltip, Legend } from 'recharts'

import { GlobalContext } from '../../context/GlobalState'

const months = {
    0: "Jan",
    1: "Feb",
    2: "Mar",
    3: "Apr",
    4: "May",
    5: "Jun",
    6: "Jul",
    7: "Aug",
    8: "Sep",
    9: "Oct",
    10: "Nov",
    11: "Dec"
}

// get all unique Months which income or expense occured
function getMonths(incomes, expenses) {
    let months = new Set()
    let incomeExpense = [incomes, expenses]

    for (var i = 0; i < 2; ++i) {
        for (var j = 0; j < incomeExpense[i].length; ++j) {
            if (!months.has(incomeExpense[i][j].date.getMonth())) {
                months.add(incomeExpense[i][j].date.getMonth())
            }
        }
    }
    return months
}

function getAmounts(amounts, months) {
    let type = (typeof amounts[0] === "object" && amounts[0].amount < 0) ? "expense" : "income"

    for (let a of amounts) {
        for (let month of months) {
            if (month.date === a.date.getMonth()) {
                if (type === "income") {
                    month.income += a.amount    
                }
                else {
                    month.expense += Math.abs(a.amount)
                }
            }
        }
    }
}

// returns an array of objects that describe what expense and/or 
// income occured on a given day
function convertToByMonth(incomes, expenses) {
    let monthIncomeExpense = []

    // get months
    let months = getMonths(incomes, expenses) 
    for (let month of months) {
        monthIncomeExpense.push( {date: month, income: 0, expense: 0} )
    }

    getAmounts(incomes, monthIncomeExpense)
    getAmounts(expenses, monthIncomeExpense)

    console.log(monthIncomeExpense)
    return monthIncomeExpense
}


const CustomToolTip = ({ active, payload }) => {
    let income = payload[0]
    let expense = payload[1]

    if (active && payload && payload.length) {
        return (
            <div className="custom-tooltip">
                <p className="label" style={{color: "green"}}>{`Income: ${income ? income.value : 0}`}</p>
                <p className="label" style={{color: "red"}}>{`Expenses: ${expense ? expense.value : 0}`}</p>
            </div>
        )
    }

    return null
}

function BarGraph() {
    const { incomes, expenses} = useContext(GlobalContext)

    // Catagorize each day into months
    let incomeExpenseDay = convertToByMonth(incomes, expenses)
    incomeExpenseDay.sort((a,b) => new Date(a.date) - new Date(b.date))
    console.log(incomeExpenseDay)

    // conditional rendering
    return incomeExpenseDay.length === 0 ? (<div></div>) : 
    (
        <ResponsiveContainer width="85%" height={400}>
            <BarChart width={500} height={300} data={incomeExpenseDay}>
                <Bar dataKey="income" type="monotone" fill="green"/>
                <Bar dataKey="expense" type="monotone" fill="red"/>

                <CartesianGrid stroke="#ccc" strokeDasharray="3 3"/>
                <XAxis 
                    dataKey="date" 
                    tickFormatter={ (t) => t ? months[t] : "" }
                    height={40}
                />
                <YAxis 
                    domain={[0, dataMax => (dataMax * 1.25)]}
                    allowDataOverflow={true}
                />

                <Legend />
                <Tooltip content={<CustomToolTip />}/>
            </BarChart>
        </ ResponsiveContainer>
    ) 
}

export default BarGraph