const express = require('express')
const path = require('path')
const clc = require('cli-color')

const app = express()
app.use(express.static('public'));

app.get('/', (req, res) => {
    res.sendFile(path.resolve(__dirname, './index.html'))
})

app.post('/upload', (req, res) => {
    res.sendFile(path.resolve(__dirname, './index.html'))
})

app.listen(3010, () => {
    console.log('server is running at ' + clc.bold.blue.underline('http://localhost:3010/'));
    console.log('server is running at ' + clc.bold.blue.underline('http://127.0.0.1:3010/'));
})