import React from 'react'
import "./styles.css"
import {Link} from "react-router"
export default function Login() {
  return (
    <div id="body">

      <div class="wrapper w-[40%]">
    <form action="">
      <div className='flex justify-center'>
        <img className='w-[73px] h-[73px]' src="/R-removebg-preview.png" alt="" srcset=""/>
      </div>
      <div class="input-box relative w-full h-[50px] my-[30px]">
        <input type="text" placeholder="Username" required/>
        <i class='bx bxs-user'></i>
      </div>
      <div class="input-box relative w-full h-[50px] my-[30px]">
        <input type="password" placeholder="Password" required/>
        <i class='bx bxs-lock-alt' ></i>
      </div>
      <div class="remember-forgot">
        <label><input type="checkbox"/>Remember Me</label>
        <a href="#">Forgot Password</a>
      </div>
     <Link to="/List_inventory" > <button type="submit" class="btn">Login</button> </Link>
      
    </form>
  </div>
    </div>
       

  )
}
