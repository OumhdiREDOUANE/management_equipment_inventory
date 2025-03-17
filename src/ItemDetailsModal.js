
import { useState } from 'react';

const DetailsCard = ({ selectedRow, setSelectedRow, downloadCardPDF }) => (
  <div className="overlay">
    <div className="card animate-card">
      <div className="card-header bg-colorBG text-white">
        Détails de l'inventaire #{selectedRow.id}
      </div>
      <div className="card-body">
        {Object.entries(selectedRow).map(([key, value]) => (
          <p key={key}><strong>{key} :</strong> {value !== null ? value : "N/A"}</p>
        ))}
        <button className="btn btn-secondary" onClick={() => setSelectedRow(null)}>Fermer</button>
        <button className=" mt-3" onClick={downloadCardPDF}>Télécharger PDF</button>
      </div>
    </div>
  </div>
);
export default DetailsCard