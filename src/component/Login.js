import React ,{useState,useContext}from 'react'
import noteContext from '../context/notes/noteContext';
import {useNavigate} from 'react-router-dom';
const Login = () => {
  const[credentials,setcred]=useState({email:"",password:""})
  const context=useContext(noteContext)
   let navigate=useNavigate();
  const handlesubmit=async(e)=>{
      context.showAlert();
      e.preventDefault();
      const response =await fetch("http://localhost:5000/api/auth/login",{
        method:"POST",
        headers: {
        "Content-Type": "application/json",
      },
      body:JSON.stringify({
        email:credentials.email,
        password:credentials.password
      })
      });
      const json=await response.json();
      if(json.success) {
        console.log(json);
        localStorage.setItem("token",json.authtoken);
        navigate("/")
      }
      else{
        alert("invalid  credentials");
      }
    }
    
      const onChange=(e)=>{
        setcred({...credentials,[e.target.name]:e.target.value})


    }
  return (
    <>
    
    <form onSubmit={handlesubmit}>
  <div className="mb-3">
    <label htmlFor="exampleInputEmail1" className="form-label" >Email address</label>
    <input type="email" className="form-control" id="email" aria-describedby="emailHelp" name="email" value={credentials.email} onChange={onChange}/>
    <div id="eamil" className="form-text">We'll never share your email with anyone else.</div>
  </div>
  <div className="mb-3">
    <label htmlFor="exampleInputPassword1" className="form-label" >Password</label>
    <input type="password" className="form-control" name="password" value={credentials.password} onChange={onChange}/>
  </div>
  <button type="submit" className="btn btn-primary" >Submit</button>
</form>
</>
  )
}

export default Login;