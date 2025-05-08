import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./form.css"; 
import { Link, useParams } from "react-router"; 
import NavBar from "./NavBar";
import axios from "axios";
import { useNavigate } from "react-router";

function Edit_user() {
  // États de base / Basic states
  const navigate = useNavigate();
  const { id } = useParams();
  const [userUpdate, setUserUpdate] = useState({});
  const [data, setData] = useState([]);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  // Récupération des données utilisateur / Fetch user data
  const fetchData = async () => {
    try {
      const response = await axios.get(
        "http://localhost/php_inventaire/controller/controllerUser.php",
        { params: { id: id } }
      );
      setData(response.data);
      setUserUpdate(response.data[0]);
    } catch (error) {
      console.error("Erreur lors de la récupération:", error);
      setError("Erreur lors de la récupération des données");
    }
  };

  // Chargement initial des données / Initial data loading
  useEffect(() => {
    fetchData();
  }, [id]); // ✅ Dépendance correcte / Proper dependency

  // Gestion des changements de formulaire / Form change handling
  const handleChange = (event) => {
    const { name, value } = event.target;
    setUserUpdate((prevState) => ({ ...prevState, [name]: value }));
  };

  // Validation du formulaire / Form validation
  const validateForm = () => {
    const { nom, phone, password, confirmPassword } = userUpdate;
    
    if (!nom || !phone || !password || !confirmPassword) {
      setError("Tous les champs sont obligatoires");
      return false;
    }

    if (password !== confirmPassword) {
      setError("Les mots de passe ne correspondent pas");
      return false;
    }

    return true;
  };

  // Mise à jour de l'utilisateur / User update
  const update = async (event) => {
    event.preventDefault();

    if (!validateForm()) return;

    try {
      const response = await axios.put(
        "http://localhost/php_inventaire/controller/controllerUser.php",
        {
          idUsereUpdate: id,
          newUserUpdate: userUpdate,
        }
      );
      setMessage(response.data);
      navigate('/List_user/List_user');
    } catch (error) {
      console.error("Erreur de mise à jour:", error);
      setError("Erreur lors de la mise à jour");
    }
  };

  // Gestion du message temporaire / Temporary message handling
  useEffect(() => {
    if (message) {
      const timer = setTimeout(() => setMessage(""), 4000);
      return () => clearTimeout(timer);
    }
  }, [message]);

  // Traduction des messages / Message translation
  const translateMessage = (msg) => {
    const translations = {
      "update succesfuly": "Mise à jour réussie",
      "update incorrect": "Échec de la mise à jour"
    };
    return translations[msg] || msg;
  };

  return (
    <>
      <NavBar />
      <h1 className="font-bold text-lg text-center">Modifier l'utilisateur</h1>

      <div className="container mt-4 mb-4">
        {/* Messages de retour / Feedback messages */}
        {message && (
          <div className={`alert ${message.message === "update succesfuly" ? "alert-success" : "alert-danger"}`}>
            {translateMessage(message.message)}
          </div>
        )}
        {error && <div className="alert alert-danger">{error}</div>}

        {/* Formulaire de modification / Edit form */}
        {data?.map((item) => (
          <form 
            onSubmit={update} 
            className="form-container card-body md:w-[60%]" 
            key={item.id}
          >
            {/* Nom complet / Full name */}
            <div className="form-group">
              <label>Nom complet</label>
              <input
                className="form-control"
                type="text"
                name="nom"
                defaultValue={item.nom}
                onChange={handleChange}
                placeholder="Entrez votre nom"
                required
              />
            </div>

            {/* Numéro de téléphone / Phone number */}
            <div className="form-group">
              <label>Numéro de téléphone</label>
              <input
                className="form-control"
                type="tel"
                name="phone"
                defaultValue={item.phone}
                onChange={handleChange}
                placeholder="Entrez votre numéro"
                required
              />
            </div>

            {/* Mot de passe / Password */}
            <div className="form-group">
              <label>Mot de passe</label>
              <input
                className="form-control"
                type="password"
                name="password"
                onChange={handleChange}
                placeholder="Entrez le mot de passe"
                required
              />
            </div>

            {/* Confirmation du mot de passe / Password confirmation */}
            <div className="form-group">
              <label>Confirmer le mot de passe</label>
              <input
                className="form-control"
                type="password"
                name="confirmPassword"
                onChange={handleChange}
                placeholder="Répétez le mot de passe"
                required
              />
            </div>

            {/* Bouton de mise à jour / Update button */}
            <div className="flex justify-center">
              <button 
                className="md:w-[40%] mt-3" 
                type="submit"
              >
                Mettre à jour
              </button>
            </div>
          </form>
        ))}
      </div>
    </>
  );
}

export default Edit_user;

