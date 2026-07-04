import React from "react";
import { useContext} from "react";
import noteContext from "../context/notes/noteContext";
const Alert = () => {
    const context=useContext(noteContext);
    const{alert}=context;
  return (
       <div style={{height:'60px'}}>
    {alert &&<div className={`alert alert-${alert.type==="error"?"danger":"success"}`} role="alert">
      <strong>{alert.type}</strong>- {alert.msg}
    </div>}
    </div>
  );
};

export default Alert;
