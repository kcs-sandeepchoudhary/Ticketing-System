const express = require('express')
const router = express.Router()
const jwt = require('jsonwebtoken')

const logIn = require('../Schemas/registerSchema')

router.post('/login_auth', async (req, res) => {
    try {
        const { email, password } = req.body
        // console.log("email","pass",req.body)
        let data = await logIn.findOne({ email })
        // console.log("data", data)
        if (data) {
            if (data.password !== password || data.email !== email) {
                res.send('Invalid Credentials')
            }
            let payload = {
                user: {
                    id: data.id
                }
            }


            jwt.sign(payload, 'jwtsecret', { expiresIn: 253600000 },
                (err, token) => {
                    if (err) throw err
                    res.json({ token })

                })


            // res.status(200).send("")
        }
        else {
            res.status(400).send('No data Found')
        }
       

    }
    catch (err) {
        console.log(err)
        return res.status(500).send('Server problem')
    }
})


module.exports = router