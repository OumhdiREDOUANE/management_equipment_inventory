import React, { useState, useEffect } from 'react';
import NavBar from './NavBar';
import axios from 'axios';

export default function Add_user() {
  // État initial du formulaire / Initial form state
  const initialFormState = {
    nom: "",
    phone: "",
    password: "",
    confirmPassword: "",
    verify: "no"
  };

  // États du composant / Component states
  const [formData, setFormData] = useState(initialFormState);
  const [message, setMessage] = useState("");

  // Gestion du message temporaire / Temporary message handling
  useEffect(() => {
    if (message) {
      const timer = setTimeout(() => setMessage(""), 3000);
      return () => clearTimeout(timer); // Nettoyage du timer / Timer cleanup
    }
  }, [message]);

  // Gestion des changements dans les champs du formulaire
  // Handling form field changes
  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  // Soumission du formulaire / Form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Vérification de la correspondance des mots de passe
    // Password match verification
    if (formData.password !== formData.confirmPassword) {
      setMessage("Les mots de passe ne correspondent pas!");
      return;
    }

    try {
      // Envoi des données au serveur / Sending data to server
      const response = await axios.post(
        "http://localhost/php_inventaire/controller/controllerUser.php",
        formData
      );
      
      // Gestion de la réponse / Response handling
      setMessage(response.data.message);
      setFormData(initialFormState); // Réinitialisation du formulaire / Form reset
    } catch (error) {
      console.error("Erreur d'inscription:", error);
      setMessage("Échec de l'inscription");
    }
  };

  // Affichage des messages de retour / Feedback message display
  const renderMessage = () => {
    if (!message) return null;

    const messageClasses = "alert h-[25px] flex items-center justify-center " + 
      (message === "Insert successfully" ? "alert-success" : "alert-danger");

    // Traduction des messages / Message translation
    const translatedMessage = message === "Insert successfully" 
      ? "Inscription réussie" 
      : message;

    return (
      <div className={messageClasses}>
        {translatedMessage}
      </div>
    );
  };

  // Validation des champs de formulaire / Form field validation
  const validateForm = () => {
    return formData.nom && 
           formData.phone && 
           formData.password && 
           formData.confirmPassword;
  };

  return (
    <>
      <NavBar />
      {/* Container principal / Main container */}
      <div className="card container mt-5 flex flex-col items-center">
        {renderMessage()}
        <h1 className='font-bold text-lg text-center'>Ajouter un utilisateur</h1>
        
        {/* Formulaire d'inscription / Registration form */}
        <form onSubmit={handleSubmit} className="form-container card-body md:w-[60%]">
          {/* Champ Nom / Name field */}
          <div className='form-group'>
            <label>Nom complet</label>
            <input
              className='form-control'
              type="text"
              name="nom"
              value={formData.nom}
              onChange={handleChange}
              placeholder="Entrez votre nom"
              required
            />
          </div>

          {/* Champ Téléphone / Phone field */}
          <div className='form-group'>
            <label>Numéro de téléphone</label>
            <input
              className='form-control'
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder="Entrez votre numéro de téléphone"
              pattern="[0-9]*"
              required
            />
          </div>

          {/* Champ Mot de passe / Password field */}
          <div className='form-group'>
            <label>Mot de passe</label>
            <input
              className='form-control'
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Entrez le mot de passe"
              minLength="6"
              required
            />
          </div>

          {/* Champ Confirmation mot de passe / Password confirmation field */}
          <div className='form-group'>
            <label>Confirmer le mot de passe</label>
            <input
              className='form-control'
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              placeholder="Répétez le mot de passe"
              minLength="6"
              required
            />
          </div>

          {/* Bouton de soumission / Submit button */}
          <div className='flex justify-center'>
            <button 
              className="md:w-[40%] mt-3 btn btn-primary"
              type="submit"
              disabled={!validateForm()}
            >
              S'inscrire
            </button>
          </div>
        </form>
      </div>
    </>
  );
}

