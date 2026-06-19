const express=require('express');
const router=express.Router();
const { body,validationResult } = require('express-validator');
const Notes=require('../models/Notes')
const fetchuser=require('../middleware/fetchuser')

// Route 1: get all notes : post "/api/notes/getallnotes" 

router.get('/fetchallnotes',fetchuser,async (req,res)=>{
    try {
    
    const notes= await Notes.find({user:req.user.id})
    res.json(notes);
    } catch (error) {
        res.status(500).json({error:"some error occured try again"})
    }
})

// Route 2: add notes : post "/api/notes/addnotes" 

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

// Route 3: delete notes : post "/api/notes/deletenotes"

router.post('/deletenote/:noteId',fetchuser,async (req,res)=>{
     const result = validationResult(req);
      if (!result.isEmpty()) {
        return res.status(400).json({ errors: result.array() });
      }
try{
    console.log("noteId:", req.body.noteId);
console.log("userId:", req.user.id);
    const note=await Notes.findOneAndDelete({
        user:req.user.id,
       _id: req.params.noteId
    })
    if(!note) res.status(404).send("not found")
        res.status(200).json({
            success: true,
            message: "Note deleted successfully",
            note
        });
}
catch(error)
{
     res.status(500).json({error:"some error occured try again"})
}
})

// Route 4: update notes : put "/api/notes/updatenotes"  

router.put('/updatenotes/:noteId',fetchuser,async (req,res)=>{
     const result = validationResult(req);
      if (!result.isEmpty()) {
        return res.status(400).json({ errors: result.array() });
      }
try{
    const {title,description,tag}=req.body;
    // creat a newNote object 
    const newNote={};
    if(title) newNote.title=title;
    if(description) newNote.description=description;
    if(tag) newNote.tag=tag;

    let  note=await Notes.findById(req.params.noteId);
    if(!note) res.status(404).send("Not found");
    if(note.user.toString()!==req.user.id) res.status(401).send("Not Alowed");

    note =await Notes.findByIdAndUpdate(req.params.noteId,{$set:newNote},{new:true});
    res.status(200).json({
            success: true,
            message: "Note updated successfully",
            note
    });
}
catch(error)
{
     res.status(500).json({error:"some error occured try again"})
}
})
module.exports=router