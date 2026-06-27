import { useState } from "react";
import NoteContext from "./noteContext";

const NoteState = (props) => {
  const host = "http://localhost:5000/";

  const [notes, setNotes] = useState([]);
  const [alert, setAlert] = useState(null);
  const showAlert = (type, message) => {
    setAlert({
      type: type,
      msg: message,
    });
    setTimeout(() => {
      setAlert(null);
    }, 1000);
  };

  ////// get all notes

  const fetchnotes = async () => {
    // API CALL FOR GET NOTES

    const response = await fetch(`${host}api/notes/fetchallnotes`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "auth-token":localStorage.getItem("token")
       }    
        });
    
    const data = await response.json();
    setNotes(data);
  };

  ///// add a note

  const addNote = async (props) => {
    //API CALL FOR ADD NOTES

    const response = await fetch(`${host}api/notes/addnotes`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "auth-token":localStorage.getItem("token")
      },
      body: JSON.stringify({
        title: props.title,
        description: props.description,
        tag:props.tag
      }),
    });
   
    const data = await response.json();
    setNotes(notes.concat(data));
  };

  ////// delete a note

  const handleDelete = async (userNote) => {
    console.log(userNote);
    const response = await fetch(`${host}api/notes/deletenote/${userNote}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "auth-token":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjZhMmZiNDVkZGFmNDA2ZDk0YmIzNGRhZSIsImlhdCI6MTc4MTUxMTI2MX0.bJO-63USUN4LVzUyMMaJTOmca-shyZU4va7oDw2yqiA",
      },
    });
    setNotes(notes.filter((note) => note._id !== userNote));
      showAlert("Done", "Note deleted successfully");
    
  };

  //edit a note 

  const editnote=async(id,title,description,tag)=>{
    //API CALL

    const response = await fetch(`${host}api/notes/updatenotes/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "auth-token":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjZhMmZiNDVkZGFmNDA2ZDk0YmIzNGRhZSIsImlhdCI6MTc4MTUxMTI2MX0.bJO-63USUN4LVzUyMMaJTOmca-shyZU4va7oDw2yqiA",
      },
      body:JSON.stringify({
        title,
        description,
        tag

      })
      
    });
    const newNotes=[...notes]
    for(let i=0;i<newNotes.length;i++){
      if(newNotes[i]._id===id){
        newNotes[i].title=title;
        newNotes[i].description=description;
        newNotes[i].tag=tag;
        break;
      }
    }
    setNotes(newNotes);
    
   
  }

  return (
    <NoteContext.Provider value={{ notes, handleDelete, addNote, showAlert, alert, fetchnotes,editnote }}>
      {props.children}
    </NoteContext.Provider>
  );
};
export default NoteState;
