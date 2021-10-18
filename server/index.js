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

app.get('/api/get', (req, res) => {
    const sqlSelect = "SELECT * FROM transactions"

    db.query(sqlSelect, (err, result) => {
        if (err) console.log(err)
        res.send(result)
    })
})

// insert new entry into database
app.post('/api/insert', (req, res) => {
    const transaction = req.body
    const id = transaction.id
    const amount = transaction.amount
    const type = transaction.type
    const text = transaction.text
    const date = transaction.date
    console.log(transaction)

    const sqlInsert = "INSERT INTO transactions (id, amount, type, text, date) VALUES (?,?,?,?,?)"
    db.query(sqlInsert, [id, amount, type, text, date], (err, result) => {
        if (err) console.log(err)
        console.log(result)
    })
})

// delete entry in database
app.delete('/api/delete/:id', (req, res) => {
    const id = req.params.id
    const sqlDelete = "DELETE FROM transactions WHERE id = ?"

    db.query(sqlDelete, id, (err, result) => {
        if (err) console.log(err)
        console.log(result)
    })
})

app.listen(3001, () => {
    console.log("running on port 3001")
})