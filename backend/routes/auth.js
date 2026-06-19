const express=require('express');
const router=express.Router();
const { body,validationResult } = require('express-validator');
const User=require('../models/User')
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const fetchuser=require('../middleware/fetchuser')
const JWT_SECRET='process.env.JWT';

// Route 1:create a user using: post "/api/auth/createuser" Doesn't require auth
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

      //jwt authentication 
      const data={
        id:user.id,
      }
      var token = jwt.sign(data, JWT_SECRET);
      console.log(token)
      // sending response 
      res.json({
        info:user,
        authtoken:token
      });
    }
    //if some error is occured 
    catch(err)
    {
      console.log(err.message)
      res.status(500).send("some error occured");
    }
      
})


 // Route 2:authenticate the user using post :"/api/auth/login"

router.post('/login',[  
  body('email','enter a valid mail').isEmail(),          
  body('password','password cannot be blank').exists() //  check for empty pasword
],async (req,res)=>{
  // if there are errors return bad request
      const result = validationResult(req);
      if (!result.isEmpty()) {
        return res.status(400).json({ errors: result.array() });
      }

       const{email,password}=req.body

      try {
        //check if user exists
       let user=await User.findOne({email:email})
        if(!user)
        {
          return res.status(400).json({error:"enter correct credentials"});
        }
        //check password is correct or not
        const passwordCompare=await bcrypt.compare(password,user.password)
        if(!passwordCompare)return res.status(400).json({error:"invalid credentials"})
        // const authtoken=jwt.sign({userid:user.id},JWT_SECRET)
      res.send(user)
        
      } catch (error) {
        return res.status(400).json({error:"some error occured"})
      }

    })


   // Route 3:get user data using auth token :Post:"/api/auth/details"

    router.post('/details',fetchuser,async (req,res)=>{
  // if there are errors return bad request
      const result = validationResult(req);
      if (!result.isEmpty()) {
        return res.status(401).json({ errors: result.array() });
      }
      const user=await User.findById(req.user.id).select("-password")
      res.send(user)
    })
module.exports=router