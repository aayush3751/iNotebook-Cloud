import { useContext } from "react"
import noteContext from "../context/notes/noteContext";
import React from 'react'
const Home = () => {
  const context=useContext(noteContext);
  const {notes,setNotes}=context;
  return (
    <div className="my-5" >
    <h2>Your Notes</h2>
    <div className="container">
    <form className="my-3">
  <div className="mb-3">
    <label for="exampleInputEmail1" className="form-label">Title</label>
    <input type="text" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp"/>
    <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
  </div>
  <div className="mb-3">
    <label for="exampleInputPassword1" className="form-label">Description</label>
    <input type="text" className="form-control" id="exampleInputPassword1"/>
  </div>
  <div className="mb-3 form-check">
    <input type="checkbox" className="form-check-input" id="exampleCheck1"/>
    <label className="form-check-label" for="exampleCheck1">Check me out</label>
  </div>
  <button type="submit" className="btn btn-primary" >Submit</button>
</form>
</div>
<div className="my-6">
<h2 className="my-5">Your notes</h2>
{notes.map((note)=>(

  <div key={note.id}>
  <h2>{note.title}</h2>
  <p>{note.description}</p>
  </div>
)
)}
</div>
</div>

  )
}

export default Home