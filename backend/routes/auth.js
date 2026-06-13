const express=require('express');
const router=express.Router();

const User=require('../models/User')




//create a user using: post "/api/auth" Doesn't require auth
router.get('/',(req,res)=>{
     console.log(req.body);
    const a={
        name:'thanos',

        age:45
    }
    res.send(a);
    const user=User(req.body);
    user.save();
    res.send(req.body);
   
})
module.exports=router