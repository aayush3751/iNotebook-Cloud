const express=require('express');
const router=express.Router();
const { body,validationResult } = require('express-validator');
const User=require('../models/User')
const bcrypt = require('bcryptjs');



//create a user using: post "/api/auth/createuser" Doesn't require auth
router.post('/createuser',[
  body('name','enter a valid name').isLength({min:3}),   // adding validations 
  body('email','enter a valid mail').isEmail(),          //to check if something error is happening then return a message
  body('password','password length should be atleast 6').isLength({ min: 6 }) // like here password length should be 6
],async (req,res)=>{
  // if there are errors return bad request
      const result = validationResult(req);
      if (!result.isEmpty()) {
        return res.status(400).json({ errors: result.array() });
      }

try{
        // Generate salt and hash password
      const salt = await bcrypt.genSalt(10);
      const secPassword = await bcrypt.hash(req.body.password, salt);


      // check duplicate emails by finding if it already exists
      let user=await User.findOne({email:req.body.email})
      if(user)
      {
       return  res.status(400).json({error:"user already exist"})
      }
      // creating a new user 
      user=await User.create({
        name: req.body.name,
        email: req.body.email,
        password: secPassword // saving hash of password
      })
      // sending response 
      res.json(user);
    }
    //if some error is occured 
    catch(err)
    {
      console.log(err.message)
      res.status(500).send("some error occured");
    }
      
})
module.exports=router