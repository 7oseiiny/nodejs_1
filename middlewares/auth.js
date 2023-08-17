var jwt = require('jsonwebtoken');
var {promisify}=require('util')
async function auth ( req,res,next){

    if (!req.headers.authorization) {
        return res.send({message:"you are not have access"})
    }
    else{
        try{
            var decoded= await promisify(jwt.verify) (req.headers.authorization,process.env.SECRET)
            req.userID=decoded.userID
            // console.log(decoded);

            next()
        }catch(err){
            return res.send({message:"error token"})
        }
    }

}

module.exports=auth