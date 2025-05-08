import React, { useState, useEffect } from 'react';
import NavBar from './NavBar';
import axios from 'axios';
import { useNavigate } from "react-router";
import "./login.css";

/**
 * Composant Login - Gère l'authentification des utilisateurs
 * Login Component - Handles user authentication
 */
export default function Login() {
  const navigate = useNavigate();

  // États initiaux / Initial states
  const initialFormState = {
    nom: "",
    phone: "",
    password: "",
    confirmPassword: "",
    verify: "yes"
  };

  const [formData, setFormData] = useState(initialFormState);
  const [message, setMessage] = useState({});

  // Configuration des messages / Message configuration
  const MESSAGES = {
    MISSING_FIELDS: "mot de passe ou numéro de téléphone n'est pas correct ",
    LOGIN_ERROR: "Erreur de connexion",
    SERVER_ERROR: "Erreur du serveur"
  };

  /**
   * Gère les changements dans le formulaire
   * Handles form input changes
   */
  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  /**
   * Gère la soumission du formulaire
   * Handles form submission
   */
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "http://localhost/php_inventaire/controller/controllerUser.php",
        formData
      );

      setMessage(response.data);
      
      if (response.data.success) {
        // Stockage des informations de session / Store session information
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("nomUser", response.data.nom);
        
        // Redirection vers le tableau de bord / Redirect to dashboard
        navigate("/List_inventory/List_inventory");
      }

      // Réinitialisation du formulaire / Reset form
      setFormData(initialFormState);

    } catch (error) {
 
      console.error("Erreur lors de la connexion:", error);
      setMessage({ message: MESSAGES.LOGIN_ERROR });
    }
  };

  /**
   * Effet pour gérer les messages temporaires
   * Effect for handling temporary messages
   */
  useEffect(() => {
    if (message) {
      const timer = setTimeout(() => setMessage(""), 3000);
      return () => clearTimeout(timer);
    }
  }, [message]);

  /**
   * Rendu des messages d'erreur
   * Render error messages
   */
  const renderErrorMessage = () => {
    if (message.message === "Missing fields") {
    
      localStorage.removeItem('token');
      localStorage.removeItem('nomUser');
      
      return (
        <div className="alert alert-danger h-[25px] flex items-center justify-center">
          <p>{MESSAGES.MISSING_FIELDS}</p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="login-container" id="body">
      <div className="wrapper w-[40%]">
        {/* Affichage des messages d'erreur / Display error messages */}
        {renderErrorMessage()}

        <form onSubmit={handleSubmit} className="login-form">
          {/* Logo / Logo section */}
          <div className="logo-container flex justify-center">
            <img 
              className="logo w-[73px] h-[73px]" 
              src={`${process.env.PUBLIC_URL}/R-removebg-preview.png`} 
              alt="Logo" 
            />
          </div>
          {/* Champ téléphone / Phone field */}
          <div className="input-box relative w-full h-[50px] my-[30px]">
<label>numero du  téléphone :</label>
            <input 
              type="text"
              name="phone"
              placeholder="Téléphone"
              onChange={handleChange}
              required
            />
            <i className="bx bxs-user"></i>
          </div>
          {/* Champ mot de passe / Password field */}
          <div className="input-box relative w-full h-[50px] my-[30px]">
          <label>mot de passe :</label>
            <input 
              type="password"
              name="password"
              placeholder="Mot de passe"
              onChange={handleChange}
              required
            />
            <i className="bx bxs-lock-alt"></i>
          </div>

          {/* Bouton de connexion / Login button */}
          <button 
            type="submit"
            className="btn login-btn"
          >
            Connexion
          </button>
        </form>
      </div>
    </div>
  );
}

// Styles CSS suggérés / Suggested CSS styles
const styles = `
.login-container {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #f5f5f5;
}

.wrapper {
  background: white;
  padding: 2rem;
  border-radius: 10px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.login-form {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.input-box {
  position: relative;
}

.input-box input {
  width: 100%;
  height: 100%;
  padding: 0 1rem;
  border: 1px solid #ddd;
  border-radius: 5px;
  transition: border-color 0.3s;
}

.input-box input:focus {
  border-color: #4a90e2;
  outline: none;
}

.input-box i {
  position: absolute;
  right: 1rem;
  top: 50%;
  transform: translateY(-50%);
  color: #666;
}

.login-btn {
  background: #4a90e2;
  color: white;
  padding: 0.75rem;
  border-radius: 5px;
  border: none;
  cursor: pointer;
  transition: background 0.3s;
}

.login-btn:hover {
  background: #357abd;
}

.alert {
  padding: 0.75rem;
  border-radius: 5px;
  margin-bottom: 1rem;
}

.alert-danger {
  background: #fee2e2;
  color: #dc2626;
  border: 1px solid #fecaca;
}

@media (max-width: 768px) {
  .wrapper {
    width: 90% !important;
    margin: 1rem;
  }
}
`;

// Injection des styles / Inject styles
const styleSheet = document.createElement("style");
styleSheet.innerText = styles;
document.head.appendChild(styleSheet);

