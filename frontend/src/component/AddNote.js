import React ,{useContext,useState}from 'react'
import Notes from './Notes'
import noteContext from '../context/notes/noteContext'
const AddNote = () => {
    const context=useContext(noteContext);
    const{addNote,showAlert}=context;
    const [note,setNote]=useState({title:"" ,description:"",tag:"general"})
    const handleclick=(e)=>{
          e.preventDefault();
          // preventing empty note adding 
          if(note.title.length<3 ||note.description.length<3){
            showAlert("something is wrong","length should at least be 3 ")
            return;
          }
          addNote(note);
           // Clear the inputs
            setNote({
                title: "",
                description: "",
                tag:""
            });
    }
    const onChange =(e)=>{
        setNote({...note,[e.target.name]:e.target.value})
    }
  return (
     <div className="my-5" >
    <h2>Your Notes</h2>
    <div className="container">
    <form className="my-3">
  <div className="mb-3">
    <label htmlFor="title" className="form-label">Title</label>
    <input type="text" className="form-control" id="title" name="title" value={note.title} aria-describedby="emailHelp" onChange={onChange}/> 
  </div>
  <div className="mb-3">
    <label htmlFor="description" className="form-label">Description</label>
    <input type="text" className="form-control" id="description" value={note.description} onChange={onChange} name="description"/>
  </div>
  <div className="mb-3">
    <label htmlFor="description" className="form-label">Tag</label>
    <input type="text" className="form-control" id="tag" value={note.tag} onChange={onChange} name="tag"/>
  </div>
 
  <button type="submit" className="btn btn-primary" onClick={handleclick} >Submit</button>
</form>
</div>
<Notes/>
</div>
  )
}

export default AddNote