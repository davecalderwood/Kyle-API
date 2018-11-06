const express = require('express')
const app = express()
const port = 3001
const mongoose = require('mongoose')
require('dotenv').config()

app.get('/', (req, res) => res.send('Hello world'))

app.listen(port, () => console.log(`Example app listening on port ${port}`))

// Connect to mLab 
mongoose.connect(process.env.DB_URL, { useNewUrlParser: true })
mongoose.connection.once('open', () => {
    console.log('Connected to database')
})