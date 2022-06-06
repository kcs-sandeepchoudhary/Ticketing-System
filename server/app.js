var express = require('express')
var cors = require('cors')
const connectDB = require('./config/db')
const middleware = require('./middleware')

const registerUser = require('./Schemas/registerSchema')

require("dotenv").config();



var app = express();

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: false }))


app.use('/', require('./Router/index'));
app.use('/reg', require('./Router/register'))
app.use('/login', require('./Router/login'))
app.use('/ticket',require('./Router/ticket'))


app.get('/dashboard', middleware, async (req, res) => {
    try {
        let exist = await registerUser.findById(req.user.id)
        if (!exist) {
            return res.status(400).send('user not found')
        }
        res.json(exist)
    }
    catch (err) {
        console.log(err)
        return res.status(500).send('Server Error')

    }
})


const port = process.env.PORT;

app.listen(port, () => {
    console.log(`Server is starte at: ${port}`);
})

module.exports = app;