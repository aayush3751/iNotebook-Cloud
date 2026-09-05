import React, { useContext } from 'react'
import noteContext from '../context/notes/noteContext';


const NoteItem = (props) => {
    const{note,updateNote}=props;
    const context=useContext(noteContext);
    const{handleDelete}=context;
    const handleClick=()=>{
    handleDelete(props.noteId);
    
    }


  return (
     <div  className="col-md-3">
    <div className="card my-3" >
 <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
    {note.tag}
    <span className="visually-hidden">unread messages</span>
  </span>
  <div className="card-body">
    <h5 className="card-title"> {note.title}</h5>
    <p className="card-text">{note.description}</p>
    <div  >
  <button className="btn btn-primary mx-3" onClick={()=>{updateNote(note)}}>Edit Note </button>
  <button className="btn btn-primary mx-3" onClick={handleClick}>Delete Note </button>
  </div>
  </div>
  
</div>
</div>
  )
}

export default NoteItem