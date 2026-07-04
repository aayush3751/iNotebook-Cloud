import React,{useState,useContext} from 'react'
import {useNavigate} from 'react-router-dom'
import noteContext from '../context/notes/noteContext';
const Signup = () => {
  const[user,setuser]=useState({name:"",email:"",password:"",cpassword:""})
  const navigate=useNavigate();
  const context=useContext(noteContext);
    const handlesubmit = async (e) => {
        e.preventDefault();
        if(user.cpassword!==user.password) return context.showAlert("error","password must be same");
        const response=await fetch("http://localhost:5000/api/auth/createuser",{ 
          method:"POST",
          headers:{
          "Content-Type":"application/json"
        },
        body:JSON.stringify({
          "name":user.name,
          "email":user.email,
          "password":user.password
        })
      });
      const data=await response.json();
      if(data.success){
        console.log(data)
        localStorage.setItem("token",data.authtoken)
        context.showAlert("success","account created successfully");
        navigate("/login")
      }
      else{
          context.showAlert("error","fill the form correctly");
        }
    }
    const onChange=(e)=>{
     
      setuser({...user,[e.target.name]:e.target.value})
    }
  return (
    <form onSubmit={handlesubmit}>
  <div className="mb-3">
    <label htmlFor="name" className="form-label">Name</label>
    <input type="text" className="form-control" id="name" name="name" value={user.name} onChange={onChange}aria-describedby="emailHelp" />
  </div>
  <div className="mb-3">
    <label htmlFor="email" className="form-label">Email address</label>
    <input type="email" className="form-control" id="email" name="email" value={user.email} onChange={onChange}aria-describedby="emailHelp"  required/>
  </div>
  <div className="mb-3">
    <label htmlFor="password" className="form-label">Password</label>
    <input type="password" className="form-control" id="password" minLength={5} name="password" value={user.password} onChange={onChange} aria-describedby="emailHelp"   required/>
  </div>
  <div className="mb-3">
    <label htmlFor="cpassword" className="form-label">Password</label>
    <input type="password" className="form-control" id="cpassword" minLength={5} name="cpassword" value={user.cpassword} onChange={onChange} aria-describedby="emailHelp"  required/>
  </div>
  <button type="submit" className="btn btn-primary" >Sign up</button>
</form>
  )
}

export default Signup