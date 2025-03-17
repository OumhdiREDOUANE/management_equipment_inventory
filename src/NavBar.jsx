import React from "react";
import { useMediaQuery } from "react-responsive";
import { useState } from "react";
import {Link} from 'react-router'
import { useDispatch, useSelector} from 'react-redux'
import "./NavBar.css";
import { useNavigate } from "react-router";
import axios from "axios";
export default function NavBar() {
  const navigate = useNavigate();
  const isMobile = useMediaQuery({ maxWidth: 767 });
  const dispatch =useDispatch()
  const [isOpen, setIsOpen] = useState(false);
  const handleClick = () => {
    setIsOpen(!isOpen);
  };
  const setIsHistory =(list)=>{
    dispatch({type:"isHistory",payload:list})
  }
  const handleLogout = async () => {
    try {
      // Appel à l'API de déconnexion PHP
      await axios.get("http://localhost/php_inventaire/controller/logout.php")
      localStorage.removeItem("token");
      navigate("/");
    } catch (error) {
      console.error("Erreur lors de la déconnexion", error);
    }
  };
  return (
    <nav
      className={`bg-colorBG text-white ${
        isOpen ? "navOpen" : "h-[72px] flex"
      }`}
    >
      <div className={`flex  justify-between h-[100%]  w-full ${isOpen&&isMobile&&"flex-col "} `}>
      
        
        {isMobile ? <>
        <div className="flex justify-between w-full  ">
         
          <img
          className="w-[60px] h-[60px] "
          src="/R-removebg-preview.png"
          alt=""
          srcset=""
          />
          
            <div
              
              className={isOpen ? "Close relative top-[23px]" : "button"}
              onClick={handleClick}
              >
              <div id="icon">
                <span className="lines"></span>
              </div>
            </div>
        </div>
            {isOpen && (
              <div className="absolut top-[30px] flex flex-col items-center">
                <ul className={`${isOpen ? "ul" : "hidden"}`}>
                <Link to="/List_inventory/List_inventory" onClick={()=>setIsHistory("list")} ><li>list inventory</li></Link>
                 <Link to='/Add_Inventory/Add_Inventory'> <li>Add inventory</li></Link>
                 <Link to='/Add_user/Add_user'><li>Add user</li></Link>
                 <Link to='/List_user/List_user'onClick={()=>setIsHistory("users")}><li>list user</li></Link>
                 <Link to='/history/history' onClick={()=>setIsHistory("history")}> <li>history</li></Link>

                </ul>
                <button className="w-[35%]  mt-[22px]">deconécter</button>
                
              </div>
            )}
          
       </> :  <>
          <img
          className="w-[60px] h-[60px]"
          src="/R-removebg-preview.png"
          alt=""
          srcset=""
          />
         
            <ul className="flex justify-center h-[100%] gap-x-[100px] items-center ">
            <Link to="/List_inventory/List_inventory" onClick={()=>setIsHistory("list")} ><li>list inventory</li></Link>
                 <Link to='/Add_Inventory/Add_Inventory'> <li>Add inventory</li></Link>
                 <Link to='/Add_user/Add_user'><li>Add user</li></Link>
                 <Link to='/List_user/List_user' onClick={()=>setIsHistory("users")}><li>list user</li></Link>

                 <Link to='/history/history' onClick={()=>setIsHistory("history")}> <li>history</li></Link>

            </ul>
            <button className="w-[15%]  mt-[12px] " onClick={handleLogout}>deconécter</button>
          </>
        }
      </div>
    </nav>
  );
}
