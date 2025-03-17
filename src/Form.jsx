import React, { useEffect, useState } from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import "./form.css"; // ملف CSS خارجي للتأثيرات
import {Link} from "react-router"
import axios from "axios"
const MultiStepForm = () => {
  const [step, setStep] = useState(1);
  const [submitted, setSubmitted] = useState(false);
  const [inventaire,setInventaire] = useState( { id:"", inventaire: "", Désignation: "", Unité: "", Quantité: "", Affectation: "", Réaffectation: "", État: "bon", Emplacement: "salle d'exposition", Responsable: "" },
  )
const [message,setMessage] = useState({})  // حالة لتخزين حالة التقديم

  const nextStep = () => {
    setStep(prev => Math.min(prev + 1, 3));
  };

  const prevStep = () => {
    setStep(prev => Math.max(prev - 1, 1));
  };

  

 
  
 const handelChange = (event)=>{
const name = event.target.name;
const value = event.target.value;

setInventaire(prevState=>({...prevState,[name]:value}) )
 }
const handelSubmit =(e)=>{
  console.log(inventaire)
 e.preventDefault()
    axios.post("http://localhost/php_inventaire/controller/controller.php",inventaire)
    .then((response)=>{console.log(response.data);setMessage(response.data);setInventaire({ id:"", inventaire: "", Désignation: "", Unité: "", Quantité: "", Affectation: "", Réaffectation: "", État: "bon", Emplacement: "salle d'exposition", Responsable: "" },
    )})
   
  // لمنع إعادة تحميل الصفحة
    // تغيير حالة التقديم إلى true عند الضغط على Submit
}

  useEffect(() => {
    if (message) {
      setTimeout(() => setMessage(""), 4000); // Hide message after 3 seconds
    }
  }, [message]);
  

  return (
    <div className="container mt-4 mb-4">
      {message.message === "insert succesfuly"&& <div className="alert alert-success h-[25px] flex items-center justify-center">
    {message.message}
  </div>
}
{message.message === "insert incorrect" &&<div className="alert alert-danger h-[25px] flex items-center justify-center">
    <p>{message.message}</p>
  </div>
}
      <div className="d-flex justify-content-between mb-4">
        {[1, 2, 3].map((s, index) => (
          <div key={index} className={`progress-step ${step >= s ? 'active' : ''}`}></div>
        ))}
      </div>

      <div key={step} className="card mb-4 step-card animate">
        <div className="card-body">
          {step === 1 && (
            <>
              <h5 className="card-title">Informations Générales</h5>
              <div className="mb-3">
                <label className="form-label">N° Inventaire</label>
                <input type="number" className="form-control" name='inventaire' defaultValue={""} onChange={handelChange} placeholder="N°" />
              </div>
              <div className="mb-3">
                <label className="form-label">Unité</label>
                <input type="number" className="form-control" name='Unité'     onChange={handelChange} placeholder="Unité" />
              </div>
              <div className="mb-3">
                <label className="form-label">Quantité</label>
                <input type="number" className="form-control" name='Quantité'    onChange={handelChange} placeholder="Quantité" />
              </div>
            </>
          )}

          {step === 2 && (
            <>
              <h5 className="card-title">Affectation et État</h5>
              <div className="mb-3">
                <label className="form-label">Affectation</label>
                <input type="text" className="form-control"  name='Affectation'     onChange={handelChange}  placeholder="Affectation" />
              </div>
              <div className="mb-3">
                <label className="form-label">Réaffectation</label>
                <input type="text" className="form-control"  name='Réaffectation'   onChange={handelChange}  placeholder="Réaffectation" />
              </div>
              <div className="mb-3">
                <label className="form-label">État</label>
                <select className="form-select form-control" name='État'  onChange={handelChange}  >
                  <option disabled>---------Choisir État---------</option>
                  <option value="bon">Bon</option>
                  <option value="très bon">Très Bon</option>
                  <option value="fuyant">Fuyant</option>
                  <option value="mauvais">Mauvais</option>
                </select>
              </div>
            </>
          )}

          {step === 3 && (
            <>
              <h5 className="card-title">Emplacement et Responsable</h5>
              <div className="mb-3">
                <label className="form-label">Emplacement</label>
                <select className="form-select form-control" name='Emplacement'  defaultValue={""} onChange={handelChange}  >
                  <option disabled>---------Choisir Emplacement---------</option>
                  <option value="salle d'exposition">Salle d'exposition</option>
                  <option value="salle de séminaire">Salle de séminaire</option>
                  <option value="salle multimédia">Salle multimédia</option>
                  <option value="espace enfants">Espace enfants</option>
                  <option value="espace adultes">Espace adultes</option>
                  <option value="Bibliothèque">Bibliothèque</option>
                  <option value="salle de théâtre">Salle de théâtre</option>
                </select>
              </div>
              <div className="mb-3">
                <label className="form-label">Responsable</label>
                <input type="text" className="form-control " name='Responsable'  defaultValue={""} onChange={handelChange}  placeholder="Responsable" />
              </div>
            
              <div className="mb-3">
                <label className="form-label">Désignation</label>
                <textarea className="form-control"  name='Désignation' defaultValue={""} onChange={handelChange}  placeholder="Désignation"></textarea>
              </div>
            </>
          )}
        </div>
      </div>

      {/* أزرار التنقل */}
      <div className="d-flex justify-content-between ">
        {step > 1 && <button onClick={prevStep} className="bg-[#686767]">Précédent</button>}
        {step < 3 ? <button onClick={nextStep} className="">Suivant</button> : 
          <button onClick={(e)=>{
            handelSubmit(e)
            setStep(1)
            }} className="bg-colorBG">Soumettre</button>}
      </div>
    </div>
  );
};

export default MultiStepForm;
