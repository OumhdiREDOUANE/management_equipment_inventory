
import React from 'react';
import PropTypes from 'prop-types';

/**
 * Composant DetailsCard - Affiche les détails d'un élément dans une modal
 * DetailsCard Component - Displays item details in a modal
 */
const DetailsCard = ({ selectedRow, setSelectedRow, downloadCardPDF }) => {
  // Constantes pour les traductions / Constants for translations
  const TRANSLATIONS = {
    DETAILS_TITLE: "Détails de l'inventaire",
    CLOSE_BUTTON: "Fermer",
    DOWNLOAD_PDF: "Télécharger PDF",
    NOT_AVAILABLE: "N/A"
  };

  /**
   * Formate la valeur pour l'affichage
   * Formats the value for display
   */
  const formatValue = (value) => {
    return value !== null ? value : TRANSLATIONS.NOT_AVAILABLE;
  };

  /**
   * Formate la clé pour l'affichage
   * Formats the key for display
   */
  const formatKey = (key) => {
    // Mapping des clés en français / French key mapping
    const KEY_TRANSLATIONS = {
      id: "Identifiant",
      name: "Nom",
      description: "Description",
      quantity: "Quantité",
      location: "Emplacement",
      status: "Statut",
      date: "Date",
      // Ajoutez d'autres traductions selon besoin / Add other translations as needed
    };

    return KEY_TRANSLATIONS[key] || key;
  };

  return (
    <div className="details-modal-overlay">
      <div className="details-modal-card">
        {/* En-tête de la modal / Modal header */}
        <div className="details-modal-header">
          <h2>{`${TRANSLATIONS.DETAILS_TITLE} #${selectedRow.id}`}</h2>
        </div>

        {/* Corps de la modal / Modal body */}
        <div className="details-modal-body">
          {Object.entries(selectedRow).map(([key, value]) => (
            <div key={key} className="details-row">
              <strong className="details-label">{formatKey(key)} :</strong>
              <span className="details-value">{formatValue(value)}</span>
            </div>
          ))}
        </div>

        {/* Pied de la modal / Modal footer */}
        <div className="details-modal-footer">
          <button 
            className="btn btn-secondary close-button"
            onClick={() => setSelectedRow(null)}
          >
            {TRANSLATIONS.CLOSE_BUTTON}
          </button>
          <button 
            className="btn btn-primary download-button"
            onClick={downloadCardPDF}
          >
            {TRANSLATIONS.DOWNLOAD_PDF}
          </button>
        </div>
      </div>
    </div>
  );
};

// Validation des props / Props validation
DetailsCard.propTypes = {
  selectedRow: PropTypes.object.isRequired,
  setSelectedRow: PropTypes.func.isRequired,
  downloadCardPDF: PropTypes.func.isRequired
};

// Styles CSS / CSS Styles
const styles = `
.details-modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.details-modal-card {
  background: white;
  border-radius: 8px;
  width: 90%;
  max-width: 600px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  animation: slideIn 0.3s ease-out;
}

.details-modal-header {
  background-color: #2c3e50;
  color: white;
  padding: 1rem;
  border-radius: 8px 8px 0 0;
}

.details-modal-header h2 {
  margin: 0;
  font-size: 1.25rem;
}

.details-modal-body {
  padding: 1.5rem;
  max-height: 70vh;
  overflow-y: auto;
}

.details-row {
  display: flex;
  margin-bottom: 0.75rem;
  padding-bottom: 0.75rem;
  border-bottom: 1px solid #eee;
}

.details-label {
  min-width: 150px;
  color: #666;
}

.details-value {
  flex: 1;
}

.details-modal-footer {
  padding: 1rem;
  border-top: 1px solid #eee;
  display: flex;
  justify-content: flex-end;
  gap: 1rem;
}

.close-button {
  background-color: #6c757d;
  color: white;
}

.download-button {
  background-color: #007bff;
  color: white;
}

@keyframes slideIn {
  from {
    transform: translateY(-20px);
    opacity: 0;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
}

/* Responsive Design */
@media (max-width: 768px) {
  .details-modal-card {
    width: 95%;
    margin: 1rem;
  }

  .details-row {
    flex-direction: column;
  }

  .details-label {
    margin-bottom: 0.25rem;
  }
}
`;

// Injection des styles / Inject styles
const styleSheet = document.createElement("style");
styleSheet.innerText = styles;
document.head.appendChild(styleSheet);

export default DetailsCard;
