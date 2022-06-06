const jwt=require('jsonwebtoken')

module.exports=function(req,res,next){
    try{
        let token=req.header('x-token')
        if(!token){
            return res.status(400).send(' Token  not found')
        }
        let decrypt=jwt.verify(token,'jwtsecret')
        req.user=decrypt.user
        next()
    }
    catch(err){
        console.log(err)
        res.status(500).send('Token is not valid...')

    }
}