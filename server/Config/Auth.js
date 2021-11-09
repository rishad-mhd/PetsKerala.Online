module.exports.isAuthenticateduser=(req,res,next)=>{
    if(req.user){
        next()
    }else{
        res.status(401).send('You have must login!')
    }
}