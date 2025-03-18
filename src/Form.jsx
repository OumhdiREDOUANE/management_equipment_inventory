import React, { useEffect, useState } from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import "./form.css"; // ملف CSS خارجي للتأثيرات
import {Link} from "react-router"
import axios from "axios"
import Mammoth from "mammoth";

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
 const handelSubmit =(e) => {
  e.preventDefault();
  console.log(inventaire);
  axios.post("http://localhost/php_inventaire/controller/controller.php", inventaire, {
    params: { statut: "not export" }
  })
  .then((response) => {
    console.log(response.data);
    setMessage(response.data);
    setInventaire({
      id: "", inventaire: "", Désignation: "", Unité: "", Quantité: "", Affectation: "",
      Réaffectation: "", État: "bon", Emplacement: "salle d'exposition", Responsable: ""
    });
  });
};
const upload =()=>{
  axios.post("http://localhost/php_inventaire/controller/controller.php",inventaire,{params:{statut:"export"}})
  .then((response)=>{console.log(response.data);setMessage(response.data);setInventaire({ id:"", inventaire: "", Désignation: "", Unité: "", Quantité: "", Affectation: "", Réaffectation: "", État: "bon", Emplacement: "salle d'exposition", Responsable: "" },
  )})
}
  useEffect(() => {
    if (message) {
      setTimeout(() => setMessage(""), 4000); // Hide message after 3 seconds
    }
  }, [message]);
  
  const [data, setData] = useState([]);

  const handleFileChange = (e) => {
    const file = e.target.files[0];

    if (file) {
      const reader = new FileReader();

      reader.onload = (event) => {
        const arrayBuffer = event.target.result;

        Mammoth.convertToHtml({ arrayBuffer })
          .then((result) => {
            const html = result.value;
            extractTableData(html);
          })
          .catch((error) => {
            console.error("Error extracting table:", error);
          });
      };

      reader.readAsArrayBuffer(file);
    }
  };

  const extractTableData = (html) => {
    const parser = new DOMParser();
    const doc = parser.parseFromString(html, "text/html");
    const tables = doc.querySelectorAll("table");
    const extractedData = [];

    tables.forEach((table) => {
      const rows = table.querySelectorAll("tr");
      const headers = Array.from(rows[0].querySelectorAll("th, td")).map((th) =>
        th.textContent.trim()
      );

      const tableData = Array.from(rows)
        .slice(1)
        .map((row) => {
          const cells = row.querySelectorAll("td");
          const rowData = {};
          headers.forEach((header, index) => {
            rowData[header] = cells[index] ? cells[index].textContent.trim() : "";
          });
          return rowData;
        });

      extractedData.push(...tableData);
    });

    setData(extractedData);
    setInventaire(extractedData)
  };
  console.log(inventaire)

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
<div className= 'card w-[fit-content] mb-4 p-3 '>
        <input type="file" onChange={handleFileChange} accept=".doc,.docx" />
        <button onClick={upload} className='mt-3' >upload</button>
      </div>

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
