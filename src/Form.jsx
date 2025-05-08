import React, { useEffect, useState } from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import "./form.css";
import { Link } from "react-router";
import axios from "axios";
import Mammoth from "mammoth";

const INITIAL_FORM_STATE = {
  id: "",
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

const STATES = [
  { value: "bon", label: "Bon" },
  { value: "très bon", label: "Très Bon" },
  { value: "mauvais", label: "Mauvais" },
  { value: "fuyant", label: "Fuyant" }
];

const MultiStepForm = () => {
  const [step, setStep] = useState(1);
  const [inventaire, setInventaire] = useState(INITIAL_FORM_STATE);
  const [message, setMessage] = useState({});
  const [data, setData] = useState([]);

  useEffect(() => {
    if (message) {
      const timer = setTimeout(() => setMessage(""), 4000);
      return () => clearTimeout(timer);
    }
  }, [message]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setInventaire(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost/php_inventaire/controller/controller.php",
        inventaire,
        { params: { statut: "not export" } }
      );
      setMessage(response.data);
      setInventaire(INITIAL_FORM_STATE);
    } catch (error) {
      console.error("Submit error:", error);
      setMessage({ message: "Error submitting form" });
    }
  };

  const handleUpload = async () => {
    try {
      const response = await axios.post(
        "http://localhost/php_inventaire/controller/controller.php",
        inventaire,
        { params: { statut: "export" } }
      );
      setMessage(response.data);
      setInventaire(INITIAL_FORM_STATE);
    } catch (error) {
      console.error("Upload error:", error);
      setMessage({ message: "Error uploading data" });
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = async (event) => {
      try {
        const result = await Mammoth.convertToHtml({ arrayBuffer: event.target.result });
        extractTableData(result.value);
      } catch (error) {
        console.error("File processing error:", error);
        setMessage({ message: "Error processing file" });
      }
    };
    reader.readAsArrayBuffer(file);
  };

  const extractTableData = (html) => {
    const parser = new DOMParser();
    const doc = parser.parseFromString(html, "text/html");
    const tables = doc.querySelectorAll("table");
    const extractedData = [];

    tables.forEach(table => {
      const rows = table.querySelectorAll("tr");
      const headers = Array.from(rows[0].querySelectorAll("th, td"))
        .map(th => th.textContent.trim());

      const tableData = Array.from(rows).slice(1).map(row => {
        const cells = row.querySelectorAll("td");
        return headers.reduce((acc, header, index) => ({
          ...acc,
          [header]: cells[index]?.textContent.trim() || ""
        }), {});
      });

      extractedData.push(...tableData);
    });

    setData(extractedData);
    setInventaire(extractedData);
  };

  const renderStepIndicators = () => (
    <div className="d-flex justify-content-between mb-4">
      {[1, 2, 3].map((s) => (
        <div key={s} className={`progress-step ${step >= s ? 'active' : ''}`} />
      ))}
    </div>
  );

  const renderMessage = () => (
    <>
      {message.message === "insert succesfuly" && (
        <div className="alert alert-success h-[25px] flex items-center justify-center">
          {message.message}
        </div>
      )}
      {message.message === "insert incorrect" && (
        <div className="alert alert-danger h-[25px] flex items-center justify-center">
          {message.message}
        </div>
      )}
    </>
  );

  const renderFileUpload = () => (
    <div className="card w-[fit-content] mb-4 p-3">
      <input type="file" onChange={handleFileChange} accept=".doc,.docx" />
      <button onClick={handleUpload} className="mt-3">Upload</button>
    </div>
  );

  const renderStep1 = () => (
    <>
      <h5 className="card-title">Informations Générales</h5>
      <div className="mb-3">
        <label className="form-label">N° Inventaire</label>
        <input
          type="text"
          className="form-control"
          name="inventaire"
          value={inventaire.inventaire}
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
          value={inventaire.Unité}
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
          value={inventaire.Quantité}
          onChange={handleChange}
          placeholder="Quantité"
        />
      </div>
    </>
  );

  const renderStep2 = () => (
    <>
      <h5 className="card-title">Affectation et État</h5>
      <div className="mb-3">
        <label className="form-label">Affectation</label>
        <input
          type="text"
          className="form-control"
          name="Affectation"
          value={inventaire.Affectation}
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
          value={inventaire.Réaffectation}
          onChange={handleChange}
          placeholder="Réaffectation"
        />
      </div>
      <div className="mb-3">
        <label className="form-label">État</label>
        <select
          className="form-select form-control"
          name="État"
          value={inventaire.État}
          onChange={handleChange}
        >
          <option disabled>---------Choisir État---------</option>
          {STATES.map(state => (
            <option key={state.value} value={state.value}>{state.label}</option>
          ))}
        </select>
      </div>
    </>
  );

  const renderStep3 = () => (
    <>
      <h5 className="card-title">Emplacement et Responsable</h5>
      <div className="mb-3">
        <label className="form-label">Emplacement</label>
        <select
          className="form-select form-control"
          name="Emplacement"
          value={inventaire.Emplacement}
          onChange={handleChange}
        >
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
        <input
          type="text"
          className="form-control"
          name="Responsable"
          value={inventaire.Responsable}
          onChange={handleChange}
          placeholder="Responsable"
        />
      </div>
      <div className="mb-3">
        <label className="form-label">Désignation</label>
        <textarea
          className="form-control"
          name="Désignation"
          value={inventaire.Désignation}
          onChange={handleChange}
          placeholder="Désignation"
        />
      </div>
    </>
  );

  const renderNavigationButtons = () => (
    <div className="d-flex justify-content-between">
      {step > 1 && <button onClick={() => setStep(step - 1)} className="bg-[#686767]">Précédent</button>}
      {step < 3 ? (
        <button onClick={() => setStep(step + 1)}>Suivant</button>
      ) : (
        <button onClick={handleSubmit} className="bg-colorBG">Soumettre</button>
      )}
    </div>
  );

  return (
    <div className="container mt-4 mb-4">
      {renderMessage()}
      {renderFileUpload()}
      {renderStepIndicators()}
      <div key={step} className="card mb-4 step-card animate">
        <div className="card-body">
          {step === 1 && renderStep1()}
          {step === 2 && renderStep2()}
          {step === 3 && renderStep3()}
        </div>
      </div>
      {renderNavigationButtons()}
    </div>
  );
};

export default MultiStepForm;

