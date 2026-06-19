import { useState } from "react";
import NoteContext from "./noteContext";

const NoteState = (props) => {
  const notesinitial= [
  {
    "_id": "6a2fcfecf7b5441345278a21",
    "user": "6a2fb45ddaf406d94bb34dae",
    "title": "food purchase updated like it ",
    "description": "i have purchase food for dinner woth rupees500",
    "tag": "food",
    "date": "2026-06-15T10:11:56.248Z",
    "__v": 0
  },
  {
    "_id": "6a2fd00ff49c0a63d03a16b9",
    "user": "6a2fb45ddaf406d94bb34dae",
    "title": "food purchase",
    "description": "i have purchase food for dinner woth rupees500",
    "tag": "food",
    "date": "2026-06-15T10:12:31.473Z",
    "__v": 0
  },
  {
    "_id": "6a2fd06906d9bbbb8b2d96ca",
    "user": "6a2fb45ddaf406d94bb34dae",
    "title": "food purchase",
    "description": "i have purchase food for dinner woth rupees500",
    "tag": "food",
    "date": "2026-06-15T10:14:01.017Z",
    "__v": 0
  },
  {
    "_id": "6a2fd1c1198011b11cd467ae",
    "user": "6a2fb45ddaf406d94bb34dae",
    "title": "food purchase",
    "description": "i have purchase food for dinner woth rupees500",
    "tag": "food",
    "date": "2026-06-15T10:19:45.858Z",
    "__v": 0
  },
  {
    "_id": "6a2fd255afb699b81a536211",
    "user": "6a2fb45ddaf406d94bb34dae",
    "title": "food purchase",
    "description": "i have purchase food for dinner woth rupees500",
    "tag": "food",
    "date": "2026-06-15T10:22:13.294Z",
    "__v": 0
  },
  {
    "_id": "6a2fd277afb699b81a536212",
    "user": "6a2fb45ddaf406d94bb34dae",
    "title": "mobile purchase",
    "description": "i have purchase mobile phone",
    "tag": "electronics",
    "date": "2026-06-15T10:22:47.303Z",
    "__v": 0
  },
  {
    "_id": "6a2fd341332bfd645f90a905",
    "user": "6a2fb45ddaf406d94bb34dae",
    "title": "car purchase",
    "description": "i have purchase car",
    "tag": "car",
    "date": "2026-06-15T10:26:09.612Z",
    "__v": 0
  },
  {
    "_id": "6a30d41b34c151c27790b9cc",
    "user": "6a2fb45ddaf406d94bb34dae",
    "title": "car purchase",
    "description": "i have purchase car",
    "tag": "car",
    "date": "2026-06-16T04:42:03.703Z",
    "__v": 0
  }
]
  const [notes,setNotes]=useState(notesinitial);
  return (
    <NoteContext.Provider value={{notes,setNotes}}>
      {props.children}
    </NoteContext.Provider>
  );
};
export default NoteState;
