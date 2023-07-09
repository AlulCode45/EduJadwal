const express = require('express')
const connectDb = require('./config/db')
const app = express()

//router
const authRouter = require('./routes/authentication')
const bodyParser = require('body-parser')

app.use(express.static('database'))

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.use(connectDb.checkConnection)

app.get('/', (req, res) => {
    res.json({
        status: true,
        massage: "Api all ready!"
    })
})

// Authentication
app.use('/auth', authRouter)


app.listen(4000, (err) => {
    if (err) {
        console.log(err);
    }
    console.log("Application running in port 4000 => http://localhost:4000");
})