const express = require('express')
const router = express.Router()

router.get('/', (req, res)=> {
    res.send('u are in banckend area...')
})


module.exports = router