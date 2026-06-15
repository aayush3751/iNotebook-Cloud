const jwt = require('jsonwebtoken');
const User=require('../models/User')
const JWT_SECRET='process.env.JWT';
const fetchuser=async (req,res,next)=>{
    try{
    const token=req.header('auth-token');
    const decode=jwt.verify(token,JWT_SECRET)
    const user=await User.findById(decode.id);
    if(!user)return res.status(401).json({error:"user not exists"})
        req.user=user;
        next();
    }
    catch(error)
    {
        res.status(401).json({error:"user Does not exists"})
    }
   

}
module.exports=fetchuser