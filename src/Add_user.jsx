import React , { useState,useEffect } from 'react'
import NavBar from './NavBar'
import axios from 'axios';
export default function Add_user() {
    



  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    password: "",
    confirmPassword: "",
    verify:"no"
  });
  const [message,setMessage] = useState({})  // حالة لتخزين حالة التقديم
  
  const [error,setError] =useState('')
  const handelChange = (event)=>{
    const name = event.target.name;
    const value = event.target.value;
    
    setFormData(prevState=>({...prevState,[name]:value}) )
     }
    const handelSubmit =(e)=>{
     
     e.preventDefault()
        axios.post("http://localhost/php_inventaire/controller/controllerUser.php",formData)
        .then((response)=>{console.log(response.data);setMessage(response.data);setFormData({
          nom: "",
          phone: "",
          password: "",
          confirmPassword: "",
          verify:"no"
        })
    })
       
      // لمنع إعادة تحميل الصفحة
        // تغيير حالة التقديم إلى true عند الضغط على Submit
    }
    
      useEffect(() => {
        if (message) {
          setTimeout(() => setMessage(""), 3000); // Hide message after 3 seconds
        }
      }, [message]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError(""); // Clear error when typing
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match!");
      return;
    }

    // Handle registration logic (API call, state update, etc.)
    console.log("User Registered:", formData);
    alert("Registration Successful!");
  };

  return (
    <>    <NavBar/>
     
      
  
    <div className=" card container mt-5 flex flex-col items-center">
    {message.message === "Insert successfully"&& <div className="alert alert-success h-[25px] flex items-center justify-center">
    {message.message}
  </div>
}
{message.message === "Insert failed" &&<div className="alert alert-danger h-[25px] flex items-center justify-center">
    <p>{message.message}</p>
  </div>
}
    
    <h1 className='font-bold text-lg text-center'>Add user</h1>
      
      <form onSubmit={handleSubmit} className="form-container card-body  md:w-[60%]">
        {error && <div variant="danger">{error}</div>}

        <div className='form-group' id="name">
          <label>Full Name</label>
          <input className='form-control'
            type="text"
            name="nom"
            
            onChange={handleChange}
            placeholder="Enter your name"
            required
          />
        </div>

        <div className='form-group' id="phone">
          <label>Phone Number</label>
          <input className='form-control'
            type="tel"
            name="phone"
            
            onChange={handelChange}
            placeholder="Enter your phone number"
            required
          />
        </div>

        <div className='form-group' id="password">
          <label>Password</label>
          <input className='form-control'
            type="password"
            name="password"
          
            onChange={handelChange}
            placeholder="Enter password"
            required
          />
        </div>

        <div className='form-group' id="confirmPassword">
          <label>Repeat Password</label>
          <input className='form-control'
            type="password"
            name="confirmPassword"
           
            onChange={handelChange}
            placeholder="Repeat password"
            required
          />
        </div>
<div className='flex justify-center'>
    <button className="md:w-[40%] mt-3"  type="submit" onClick={handelSubmit} >
          Register
        </button>
</div>
        
      </form>
    </div>
  

    </>
)
}
