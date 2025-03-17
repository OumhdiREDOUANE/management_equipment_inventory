import React , { useState,useEffect } from 'react'
import NavBar from './NavBar'
import axios from 'axios';
import { useNavigate } from "react-router"
import "./login.css"
export default function Login() {
const navigate=useNavigate()
  const [formData, setFormData] = useState({
    nom: "",
    phone: "",
    password: "",
    confirmPassword: "",
    verify:"yes"
  });
  const [message,setMessage] = useState({})  // حالة لتخزين حالة التقديم
  
  
  const handelChange = (event)=>{
    const name = event.target.name;
    const value = event.target.value;
    
    setFormData(prevState=>({...prevState,[name]:value}) )
     }
     const handelSubmit = (e) => {
      e.preventDefault();
      axios
        .post("http://localhost/php_inventaire/controller/controllerUser.php", formData)
        .then((response) => {
  
          setMessage(response.data);
          setFormData({
            nom: "",
            phone: "",
            password: "",
            confirmPassword: "",
            verify: "yes"
          });
    
          // Directly use the response to check for success
          if (response.data.success) {
            console.log(response.data)
            navigate("/List_inventory/List_inventory");
            localStorage.setItem("token",response.data.token);
            localStorage.setItem("nomUser",response.data.nom) // Save token
             // Redirect to dashboard
          }
        })
        .catch((error) => {
          console.error("Error occurred during login:", error);
        });
    };
    
      useEffect(() => {
        if (message) {
          setTimeout(() => setMessage(""), 3000); // Hide message after 3 seconds
        }
      }, [message]);

 
 

  return (
    <div id="body">

      <div class="wrapper w-[40%]">
     
{message.message === "Missing fields" &&<div className="alert alert-danger h-[25px] flex items-center justify-center">
    <p>{message.message}</p>
  </div>
}
<form onSubmit={handelSubmit}>
      <div className='flex justify-center'>
        <img className='w-[73px] h-[73px]' src="/R-removebg-preview.png" alt="" srcset=""/>
      </div>
      <div class="input-box relative w-full h-[50px] my-[30px]">
        <input type="text" placeholder="phone" onChange={handelChange}  name="phone" required/>
        <i class='bx bxs-user'></i>
      </div>
      <div class="input-box relative w-full h-[50px] my-[30px]">
        <input type="password" placeholder="Password"  name="password"   onChange={handelChange} required/>
        <i class='bx bxs-lock-alt' ></i>
      </div>
      <div class="remember-forgot">
        <label><input type="checkbox"/>Remember Me</label>
        <a href="#">Forgot Password</a>
      </div>
<button type="submit"  onClick={handelSubmit} class="btn">Login</button> 
      
    </form>
  </div>
    </div>
    
)
}
