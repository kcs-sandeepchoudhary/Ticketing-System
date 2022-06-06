var express = require('express')
var router = express.Router()



const signUp = require('../Schemas/registerSchema')

router.post('/reg_user', async (req, res) => {


    try {
        const { uname, email, password } = req.body
        let exist = await signUp.findOne({ email })
        if (exist) {
            return res.status(400).send('this credential exist')
        }
        const newData = new signUp({
            uname, email, password
        })
        await newData.save()
        res.send('Registered sucessfully')
    }
    catch (err) {
        console.log(err)
        res.status(500).send('internal server problem')
    }


})


module.exports = router