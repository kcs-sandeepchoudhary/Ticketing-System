const express = require('express')
const router = express.Router()
const middleware = require('../middleware')


const getTicket = require('../Schemas/ticketSchema')

router.post('/insert_ticket', async (req, res) => {

    console.log("req.body", req.body)


    try {
        const newTicket = new getTicket({
            ticket_desc: req.body.ticketDesc
        })
        await newTicket.save()
        res.send('Booked Ticket sucessfully')

    }
    catch (err) {
        console.log(err)
        res.status(500).send('Internal server error')
    }

})

router.get('/get_tickets', (req, res) => {

    try {
        getTicket.find((err, data) => {
            if (err) {
                res.send(err)
            } else {
                res.send(data)
            }
        })

    }
    catch (err) {
        console.log(err)
        res.send('Internal server problem')
    }
})
router.delete('/del_ticket/:id', (req, res) => {
    try {
        getTicket.findByIdAndDelete(req.params.id, (err, data) => {
            if (err) {
                console.log(err)
                res.send('ticket can not get...')
            } else {
                res.send(data)
                console.log('ticket deleted...')
            }
        })
    } catch (err) {
        console.log(err)
        res.send('Internal server problem')
    }
})



module.exports = router