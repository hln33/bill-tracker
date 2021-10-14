import React, { useContext } from 'react' 
import { PieChart, Pie, Cell, Legend, ResponsiveContainer } from 'recharts'

import { GlobalContext } from '../../context/GlobalState'

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#DE340F', '#990FDE', '#D7D618', '#D718CE', '#8ED9F7', '#F7A88E'];

const RADIAN = Math.PI / 180;
const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, index}) => {
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  return (
    <text x={x} y={y} fill="black" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central">
      {`${(percent * 100).toFixed(0)}%`}
    </text>
  )
}

// tally up totals for each type of expense
function sortByType(expenseList) {
    var types = []

    for (let i = 0; i < expenseList.length; ++i) {
        let expense = expenseList[i]
        let index = types.map(e => e.type).indexOf(expense.type)
        
        if (index !== -1) {
            types[index].amount += expense.amount
        }
        else {
            types.push({
                type: expense.type,
                amount: expense.amount
            })
        }
    }

    return types
}

// converts each expense amount to positive value
function absAmount(expenses) {
    for (let i = 0; i < expenses.length; ++i) {
        expenses[i].amount = Math.abs(expenses[i].amount)
    }
}

function PieChartGraph() {
    const { expenses } = useContext(GlobalContext)

    // get totals for each type of expensea
    let expenseTypeTotals = sortByType(expenses)
    absAmount(expenseTypeTotals)
    
    // conditonal rendering
    return expenseTypeTotals.length === 0 ? (<div></div>) : (
        <div>
            <h3>Expense Ratio</h3>
            <ResponsiveContainer width="100%" height={200}>
                <PieChart width={300} height={500}>
                    <Pie
                        data={expenseTypeTotals}
                        dataKey="amount"
                        fill="green"
                        labelLine={false}
                        label={renderCustomizedLabel}
                        outerRadius={60}
                    >
                        {expenseTypeTotals.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                    </Pie>
                    <Legend formatter={value => expenseTypeTotals[value].type}/>
                </PieChart>
            </ResponsiveContainer>
        </div>
    )
}

export default PieChartGraph