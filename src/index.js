const express = require('express')
const connectDb = require('./config/db.config')
const app = express()

//router
const authRouter = require('./routes/authentication.route')
const bodyParser = require('body-parser')
const { checkAuthentication } = require('./middleware/authentication.middleware')
const classRoute = require('./routes/class.route')

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

// Class manage
app.use(checkAuthentication)
app.use('/class', classRoute)


app.listen(4000, (err) => {
    if (err) {
        console.log(err);
    }
    console.log("Application running in port 4000 => http://localhost:4000");
})