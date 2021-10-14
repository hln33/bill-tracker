import React from 'react'
import './App.css';

import Header from './components/display/Header'
import BarGraph from './components/graphs/BarGraph'
import PieChartGraph from './components/graphs/PieChart';
import Balance from './components/display/Balance'
import IncomeExpense from './components/display/IncomeExpense'
import IncomeList from './components/display/IncomeList'
import ExpenseList from './components/display/ExpenseList'
import AddTransaction from './components/transactions/AddTransaction';

import { GlobalProvider } from './context/GlobalState';

function App() {

  return (
    <GlobalProvider>
      <Header />
      <BarGraph />
      <PieChartGraph />
      <div className="container"> 
        <Balance />
        <IncomeExpense />
        <IncomeList />
        <ExpenseList />
        <AddTransaction />
      </div>
    </GlobalProvider>
  );
}

export default App;
