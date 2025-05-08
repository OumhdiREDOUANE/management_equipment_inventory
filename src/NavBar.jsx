import React, { useState } from "react";
import { useMediaQuery } from "react-responsive";
import { Link } from "react-router";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import axios from "axios";

// Styles
import "./NavBar.css";

// Constants
const NAVIGATION_ITEMS = [
  { path: "/List_inventory/List_inventory", label: "Liste d'inventaire", historyType: "list" },
  { path: "/Add_Inventory/Add_Inventory", label: "Ajouter à l'inventaire", historyType: null },
  { path: "/Add_user/Add_user", label: "Ajouter un utilisateur", historyType: null },
  { path: "/List_user/List_user", label: "Liste des utilisateurs", historyType: "users" },
  { path: "/history/history", label: "Historique", historyType: "history" }
];

const NavBar = () => {
  // Hooks
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isMobile = useMediaQuery({ maxWidth: 767 });
  
  // State
  const [isOpen, setIsOpen] = useState(false);

  // Handlers
  const handleMenuToggle = () => {
    setIsOpen(!isOpen);
  };

  const setHistoryType = (type) => {
    if (type) {
      dispatch({ type: "isHistory", payload: type });
    }
  };

  const handleLogout = async () => {
    try {
      await axios.get("http://localhost/php_inventaire/controller/logout.php");
      localStorage.removeItem("token");
      navigate("/");
    } catch (error) {
      console.error("Erreur lors de la déconnexion:", error);
    }
  };

  // Render helpers
  const renderLogo = () => (
    <img
      className="w-[60px] h-[60px]"
      src={`${process.env.PUBLIC_URL}/R-removebg-preview.png`}
      alt="Logo"
    />
  );

  const renderMobileMenu = () => (
    <>
      <div className="flex justify-between w-full">
        {renderLogo()}
        <div
          className={isOpen ? "Close relative top-[23px]" : "button"}
          onClick={handleMenuToggle}
        >
          <div id="icon">
            <span className="lines"></span>
          </div>
        </div>
      </div>
      
      {isOpen && (
        <div className="absolut top-[30px] flex flex-col items-center">
          <ul className={isOpen ? "ul" : "hidden"}>
            {NAVIGATION_ITEMS.map((item) => (
              <Link 
                key={item.path}
                to={item.path}
                onClick={() => setHistoryType(item.historyType)}
              >
                <li>{item.label}</li>
              </Link>
            ))}
          </ul>
          <button 
            className="w-[35%] mt-[22px]"
            onClick={handleLogout}
          >
            Déconnexion
          </button>
        </div>
      )}
    </>
  );

  const renderDesktopMenu = () => (
    <>
      {renderLogo()}
      <ul className="flex justify-center h-[100%] gap-x-[100px] items-center">
        {NAVIGATION_ITEMS.map((item) => (
          <Link 
            key={item.path}
            to={item.path}
            onClick={() => setHistoryType(item.historyType)}
          >
            <li>{item.label}</li>
          </Link>
        ))}
      </ul>
      <button 
        className="w-[15%] mt-[12px]"
        onClick={handleLogout}
      >
        Déconnexion
      </button>
    </>
  );

  return (
    <nav className={`bg-colorBG text-white ${isOpen ? "navOpen" : "h-[72px] flex"}`}>
      <div className={`flex justify-between h-[100%] w-full ${isOpen && isMobile ? "flex-col" : ""}`}>
        {isMobile ? renderMobileMenu() : renderDesktopMenu()}
      </div>
    </nav>
  );
};

export default NavBar;

