import React, {useEffect} from "react";
import { useContext,useState,useRef} from "react";
import noteContext from "../context/notes/noteContext";
import NoteItem from "./NoteItem";
const Notes = () => {
  const context = useContext(noteContext);
  const { notes, fetchnotes,editnote} = context;
  const [note,setNote]=useState({id:"",etitle:"" ,edescription:"",etag:""})
  const ref=useRef(null);
  //update notes
  const updateNote =(currentnote)=>{
    ref.current.click();
    setNote({id:currentnote._id, etitle:currentnote.title,edescription:currentnote.description,etag:currentnote.tag})
  }
  // handle click 
  const handleClick=(e)=>{
    e.preventDefault();
    console.log(note.id);
    editnote(note.id,note.etitle,note.edescription,note.etag);

  }
  //change function
  const onChange =(e)=>{
        setNote({...note,[e.target.name]:e.target.value})
        console.log(note);
    }
// fetching notes before displaying 
  useEffect(() => {
    fetchnotes();
   // eslint-disable-next-line
  }, []);
  return (
    <>
      <button type="button" className="btn btn-primary d-none" ref={ref} data-bs-toggle="modal" data-bs-target="#exampleModal">
        Launch demo modal
      </button>

      <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="exampleModalLabel">Modal title</h1>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
                    <form className="my-3">
                          <div className="mb-3">
                            <label htmlFor="title" className="form-label">Title</label>
                            <input type="text" className="form-control" id="etitle" name="etitle" value={note.etitle} aria-describedby="emailHelp" onChange={onChange}/> 
                          </div>
                          <div className="mb-3">
                            <label htmlFor="description" className="form-label">Description</label>
                            <input type="text" className="form-control" id="edescription" value={note.edescription} onChange={onChange} name="edescription"/>
                          </div>
                          <div className="mb-3">
                            <label htmlFor="description" className="form-label">Tag</label>
                            <input type="text" className="form-control" id="etag" value={note.etag} onChange={onChange} name="etag"/>
                          </div>
                          
                          
                  </form>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
              <button type="button" className="btn btn-primary" data-bs-dismiss="modal" onClick={handleClick}>Save changes</button>
            </div>
          </div>
        </div>
      </div>
    <div className="my-3 row">
      <h2 className="my-5">Your notes</h2>
      {notes.map((note) => (
        <NoteItem noteId={note._id} updateNote={updateNote} key={note._id} note={note} />
      ))}
    </div>
    </>
  );
};

export default Notes;
