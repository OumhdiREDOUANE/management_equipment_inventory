import React, { useEffect, useState } from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import "./form.css"; // ملف CSS خارجي للتأثيرات
import {Link,useParams} from "react-router"
import NavBar from './NavBar';
import { useNavigate } from "react-router"
import axios from "axios"
const Edit_user = () => {
  const navigate=useNavigate()
  const [step, setStep] = useState(1);
  
  const [inventaireUpdate,setInventaireUpdate] = useState({})
const [message,setMessage] = useState({})  // حالة لتخزين حالة التقديم
const {id} = useParams();
  const [data, setData] = useState();
  const  fetchData = async () => {
        
           await axios.get("http://localhost/php_inventaire/controller/controller.php", {
            params: { id: id },
          }).then((response) => {
            setData(response.data);
            setInventaireUpdate(response.data[0])
              
            }).catch((error) => console.error("Error fetching tasks:", error));
         
        } 
    
      
      
      useEffect(() => {
        fetchData();
      }, [JSON.stringify(data)]);
      
  const nextStep = () => {
    setStep(prev => Math.min(prev + 1, 3));
  };

  const prevStep = () => {
    setStep(prev => Math.max(prev - 1, 1));
  };

  

 
  
  const handelChange = (event)=>{

    const name = event.target.name;
    const value = event.target.value;
    
    setInventaireUpdate(prevState=>({...prevState,[name]:value}) )
     }
const update=()=>{

      axios.put("http://localhost/php_inventaire/controller/controller.php",{idInventaireUpdate:id,"newInventoryUpdate":inventaireUpdate})
      .then((response) => {
     console.log(response.data) 
   setMessage(response.data)
        console.log(inventaireUpdate);
      })
      navigate("/List_inventory/List_inventory");
    }

  useEffect(() => {
    if (message) {
      setTimeout(() => setMessage(""), 4000); // Hide message after 3 seconds
    }
  }, [message]);
  

  return (
      <>
      <NavBar/>
      <h1 className='font-bold text-lg text-center'>Edit inventory</h1>
    {data?.map(item=>
      <div className="container mt-4 mb-4">
      {message.message === "update succesfuly"&& <div className="alert alert-success h-[25px] flex items-center justify-center">
    {message.message}
  </div>
}
{message.message === "update incorrect" &&<div className="alert alert-danger h-[25px] flex items-center justify-center">
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
                <input type="number" className="form-control" name='inventaire' defaultValue={item.inventaire} onChange={handelChange} placeholder="N°" />
              </div>
              <div className="mb-3">
                <label className="form-label">Unité</label>
                <input type="number" className="form-control" name='Unité' defaultValue={item.Unité} onChange={handelChange} placeholder="Unité" />
              </div>
              <div className="mb-3">
                <label className="form-label">Quantité</label>
                <input type="number" className="form-control" name='Quantité' defaultValue={item.Quantité} onChange={handelChange} placeholder="Quantité" />
              </div>
            </>
          )}

          {step === 2 && (
            <>
              <h5 className="card-title">Affectation et État</h5>
              <div className="mb-3">
                <label className="form-label">Affectation</label>
                <input type="text" className="form-control"  name='Affectation' defaultValue={item.Affectation} onChange={handelChange}  placeholder="Affectation" />
              </div>
              <div className="mb-3">
                <label className="form-label">Réaffectation</label>
                <input type="text" className="form-control"  name='Réaffectation' defaultValue={item.Réaffectation} onChange={handelChange}  placeholder="Réaffectation" />
              </div>
              <div className="mb-3">
                <label className="form-label">État</label>
                <select className="form-select form-control" name='État' defaultValue={item.État} onChange={handelChange}  >
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
                <select className="form-select form-control" name='Emplacement' defaultValue={item.Emplacement} onChange={handelChange}  >
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
                <input type="text" className="form-control " name='Responsable' defaultValue={item.Responsable}  onChange={handelChange}  placeholder="Responsable" />
              </div>
            
              <div className="mb-3">
                <label className="form-label">Désignation</label>
                <textarea className="form-control"  name='Désignation' onChange={handelChange} defaultValue={item.Désignation}  placeholder="Désignation"></textarea>
              </div>
            </>
          )}
        </div>
      </div>

      {/* أزرار التنقل */}
      <div className="d-flex justify-content-between ">
        {step > 1 && <button onClick={prevStep} className="bg-[#686767]">Précédent</button>}
        {step < 3 ? <button onClick={nextStep} className="">Suivant</button> : 
         <button  onClick={(e)=>{
            update()
              setStep(1)
            }} className="bg-colorBG">Soumettre</button> }
      </div>
    </div>
            )}  </>
  );
};

export default Edit_user;
