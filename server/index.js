const express = require('express')
const cors = require('cors')
const mysql = require('mysql')
const app = express()
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended: true}))

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'password',
    database: 'CRUDDataBase'
})

// get expenses from database
app.get('/api/get/expenses', (req, res) => {
    const sqlSelect = "SELECT * FROM expenses"
 
    db.query(sqlSelect, (err, result) => {
        res.send(result)
    })
})
// get incomes from database
app.get('/api/get/incomes', (req, res) => {
    const sqlSelect = "SELECT * FROM incomes"

    db.query(sqlSelect, (err, result) => {
        res.send(result)
    })
})

// insert new entry into database
app.post('/api/insert', (req, res) => {
    const transaction = req.body
    const amount = transaction.amount
    const type = transaction.type
    const text = transaction.text
    const date = transaction.date

    console.log(transaction)

    const sqlInsert = amount < 0 ? 
        "INSERT INTO expenses (amount, type, text, date) VALUES (?,?,?,?)" :
        "INSERT INTO incomes (amount, text, date) VALUES (?,?,?)"

    if (type) {
        db.query(sqlInsert, [amount, type, text, date], (err, result) => {
            console.log(result)
        })
    }
    else {
        db.query(sqlInsert, [amount, text, date], (err, result) => {
            console.log(result)
        })
    }
})

app.listen(3001, () => {
    console.log("running on port 3001")
})