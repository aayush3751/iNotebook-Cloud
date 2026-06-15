const express=require('express');
const router=express.Router();
const { body,validationResult } = require('express-validator');
const Notes=require('../models/Notes')
const fetchuser=require('../middleware/fetchuser')

// Route 1: get all notes : post "/api/auth/getallnotes" 


router.get('/fetchallnotes',fetchuser,async (req,res)=>{
    try {
    
    const notes= await Notes.find({user:req.user.id})
    res.json(notes);
    } catch (error) {
        res.status(500).json({error:"some error occured try again"})
    }
})


// Route 2: add notes : post "/api/auth/addnotes" 

router.post('/addnotes',fetchuser,[
    body('title','enter a valid name').isLength({min:3}),   // adding validations 
  body('description','description length should be atleast 3').isLength({min:3})
],async (req,res)=>{
     const result = validationResult(req);
      if (!result.isEmpty()) {
        return res.status(400).json({ errors: result.array() });
      }
try{
     const note=await  Notes.create({
        user:req.user.id,
        title:req.body.title,
        description:req.body.description,
        tag:req.body.tag,
    })
    note.save()

    res.json(note);
}
catch(error){
    res.status(500).json({error:"some error occured try again"})
}
   
})

// Route 3: delete notes : post "/api/auth/deletenotes"
// Route 4: update notes : post "/api/auth/updatenotes"  
module.exports=router