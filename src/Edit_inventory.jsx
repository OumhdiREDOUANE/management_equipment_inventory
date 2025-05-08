import React, { useState, useEffect } from 'react';
import { useNavigate,useParams} from 'react-router';
import axios from 'axios';
import NavBar from './NavBar';

const Edit_inventory = () => {
  // États du composant / Component states
  const { id } = useParams();
  const [step, setStep] = useState(1);
  const [message, setMessage] = useState("");
  const [data, setData] = useState(null);
  const navigate = useNavigate();
  const INITIAL_FORM_STATE = {
    id: id,
    inventaire: "",
    Désignation: "",
    Unité: "",
    Quantité: "",
    Affectation: "",
    Réaffectation: "",
    État: "bon",
    Emplacement: "salle d'exposition",
    Responsable: ""
  };
  const [inventaireUpdate, setInventaireUpdate] = useState(INITIAL_FORM_STATE);
  // Récupération des données initiales / Fetch initial data
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `http://localhost/php_inventaire/controller/controller.php`,{ params: { id: id } }
        );
        setData(response.data);
        setInventaireUpdate(response.data[0]);
      } catch (error) {
        console.error("Erreur de récupération:", error);
        setMessage({ message: "Erreur lors de la récupération des données" });
      }
    };
    fetchData();
  }, [id]);
  
  // Gestion de la navigation entre les étapes / Step navigation handling
  const nextStep = () => setStep(prev => Math.min(prev + 1, 3));
  const prevStep = () => setStep(prev => Math.max(prev - 1, 1));
  
  // Gestion des changements de formulaire / Form changes handling
  const handleChange = (event) => {
    const { name, value } = event.target;
    setInventaireUpdate(prevState => ({
      ...prevState,
      [name]: value
    }));
  };
  
  console.log(inventaireUpdate)
  // Mise à jour de l'inventaire / Inventory update
  const update = async () => {
    try {
      const response = await axios.put(
        "http://localhost/php_inventaire/controller/controller.php",
        {
          
          newInventoryUpdate: inventaireUpdate
        }
      );
      setMessage(response.data);
      navigate("/List_inventory/List_inventory");
      
      
    } catch (error) {
      console.error("Erreur de mise à jour:", error);
      setMessage({ message: "Erreur lors de la mise à jour" });
    }
  };

  // Gestion du message temporaire / Temporary message handling
  useEffect(() => {
    if (message) {
      const timer = setTimeout(() => setMessage(""), 4000);
      return () => clearTimeout(timer);
    }
  }, [message]);

  // Options pour les listes déroulantes / Dropdown options
  const emplacementOptions = [
    "salle d'exposition",
    "salle de séminaire",
    "salle multimédia",
    "espace enfants",
    "espace adultes",
    "Bibliothèque",
    "salle de théâtre"
  ];

  const etatOptions = [
    "bon",
    "très bon",
    "fuyant",
    "mauvais"
  ];

  // Rendu des étapes du formulaire / Form steps rendering
  const renderStep = (item) => {
    switch (step) {
      case 1:
        return (
          // Étape 1: Informations Générales / Step 1: General Information
          <>
            <h5 className="card-title">Informations Générales</h5>
            <div className="mb-3">
              <label className="form-label">N° Inventaire</label>
              <input 
                type="text" 
                className="form-control" 
                name="inventaire" 
                defaultValue={item.inventaire} 
                onChange={handleChange} 
                placeholder="N°" 
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Unité</label>
              <input 
                type="number" 
                className="form-control" 
                name="Unité" 
                defaultValue={item.Unité} 
                onChange={handleChange} 
                placeholder="Unité" 
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Quantité</label>
              <input 
                type="number" 
                className="form-control" 
                name="Quantité" 
                defaultValue={item.Quantité} 
                onChange={handleChange} 
                placeholder="Quantité" 
              />
            </div>
          </>
        );

      case 2:
        return (
          // Étape 2: Affectation et État / Step 2: Assignment and State
          <>
            <h5 className="card-title">Affectation et État</h5>
            <div className="mb-3">
              <label className="form-label">Affectation</label>
              <input 
                type="text" 
                className="form-control" 
                name="Affectation" 
                defaultValue={item.Affectation} 
                onChange={handleChange} 
                placeholder="Affectation" 
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Réaffectation</label>
              <input 
                type="text" 
                className="form-control" 
                name="Réaffectation" 
                defaultValue={item.Réaffectation} 
                onChange={handleChange} 
                placeholder="Réaffectation" 
              />
            </div>
            <div className="mb-3">
              <label className="form-label">État</label>
              <select 
                className="form-select form-control" 
                name="État" 
                defaultValue={item.État?item.État:"bon"} 
                onChange={handleChange}
              >
                <option disabled>---------Choisir État---------</option>
                {etatOptions.map(etat => (
                  <option key={etat} value={etat}>{etat}</option>
                ))}
              </select>
            </div>
          </>
        );

      case 3:
        return (
          // Étape 3: Emplacement et Responsable / Step 3: Location and Responsible
          <>
            <h5 className="card-title">Emplacement et Responsable</h5>
            <div className="mb-3">
              <label className="form-label">Emplacement</label>
              <select 
                className="form-select form-control" 
                name="Emplacement" 
defaultValue={item.Emplacement}
                // defaultValue={item.Emplacement?item.Emplacement:"salle d'exposition"} 
                onChange={handleChange}
              >
                <option disabled>---------Choisir Emplacement---------</option>
                {emplacementOptions.map(emplacement => (
                  <option key={emplacement} value={emplacement}>{emplacement}</option>
                ))}
              </select>
            </div>
            <div className="mb-3">
              <label className="form-label">Responsable</label>
              <input 
                type="text" 
                className="form-control" 
                name="Responsable" 
                defaultValue={ item.Responsable} 
                onChange={handleChange} 
                placeholder="Responsable" 
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Désignation</label>
              <textarea 
                className="form-control" 
                name="Désignation" 
                onChange={handleChange} 
                defaultValue={item.Désignation} 
                placeholder="Désignation"
              ></textarea>
            </div>
          </>
        );

      default:
        return null;
    }
  };

  return (
    <>
      <NavBar />
      <h1 className='font-bold text-lg text-center'>Modifier l'inventaire</h1>
      {data?.map(item => (
        <div key={item.id} className="container mt-4 mb-4">
          {/* Messages de retour / Feedback messages */}
          {message.message === "update succesfuly" && (
            <div className="alert alert-success h-[25px] flex items-center justify-center">
              Mise à jour réussie
            </div>
          )}
          {message.message === "update incorrect" && (
            <div className="alert alert-danger h-[25px] flex items-center justify-center">
              Échec de la mise à jour
            </div>
          )}

          {/* Indicateur de progression / Progress indicator */}
          <div className="d-flex justify-content-between mb-4">
            {[1, 2, 3].map((s, index) => (
              <div 
                key={index} 
                className={`progress-step ${step >= s ? 'active' : ''}`}
              ></div>
            ))}
          </div>

          {/* Carte de l'étape actuelle / Current step card */}
          <div className="card mb-4 step-card animate">
            <div className="card-body">
              {renderStep(item)}
            </div>
          </div>

          {/* Boutons de navigation / Navigation buttons */}
          <div className="d-flex justify-content-between">
            {step > 1 && (
              <button onClick={prevStep} className="bg-[#686767]">
                Précédent
              </button>
            )}
            {step < 3 ? (
              <button onClick={nextStep} className="">
                Suivant
              </button>
            ) : (
              <button 
                onClick={() => {
                  update();
                  setStep(1);
                }} 
                className="bg-colorBG"
              >
                Soumettre
              </button>
            )}
          </div>
        </div>
      ))}
    </>
  );
};

export default Edit_inventory;

