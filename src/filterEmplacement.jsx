import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import PropTypes from 'prop-types'; // ✅ Ajout de PropTypes pour la validation des props

// Constantes / Constants
const LOCATIONS = [
  "salle de théâtre",
  "salle d'exposition",
  "salle de séminaire",
  "salle multimédia",
  "espace enfants",
  "Bibliothèque",
  "espace adultes"
];

/**
 * Composant de filtrage par emplacement
 * Location filter component
 */
function FiltersEmplacement() {
  // Récupération des états Redux / Get Redux states
  const typeFilter = useSelector(state => state.typeFilter);
  const selectedEmplacement = useSelector(state => state.selectedEmplacement);
  const dispatch = useDispatch();

  /**
   * Gère la sélection/désélection d'un emplacement
   * Handles location selection/deselection
   * @param {string} emplacement - L'emplacement à gérer / Location to handle
   */
  const handleSetSelectEmplacement = (emplacement) => {
    dispatch({
      type: "setSelectedEmplacement",
      payload: selectedEmplacement.includes(emplacement)
        ? selectedEmplacement.filter(item => item !== emplacement)
        : [...selectedEmplacement, emplacement]
    });
  };

  // Effet pour déclencher le filtrage / Effect to trigger filtering
  useEffect(() => {
    dispatch({ type: 'Filter', payload: "" });
  }, [selectedEmplacement, dispatch]);

  // Si le filtre n'est pas actif, ne rien afficher / If filter is not active, don't display anything
  if (!typeFilter.emplacement) return null;

  return (
    <div className="card relative mb-3 w-fit">
      {/* Corps de la carte / Card body */}
      <div className="card-body flex flex-wrap gap-2">
        {LOCATIONS.map((emplacement) => (
          <LocationCheckbox
            key={emplacement}
            location={emplacement}
            isChecked={selectedEmplacement.includes(emplacement)}
            onChange={() => handleSetSelectEmplacement(emplacement)}
          />
        ))}
      </div>

      {/* Bouton de fermeture / Close button */}
      <div className="absolute bottom-2  right-2 ml-5">
        <button
          className="close-button p-2 rounded-full hover:bg-gray-200"
          onClick={() => dispatch({ type: 'setTypeFilter', payload: 'close' })}
          aria-label="Fermer le filtre"
        >
          <span className="close-icon" >×</span>
        </button>
      </div>
    </div>
  );
}

/**
 * Composant de case à cocher pour un emplacement
 * Location checkbox component
 */
const LocationCheckbox = ({ location, isChecked, onChange }) => {
  return (
    <div className="form-check form-check-inline flex items-center gap-2">
      <input
        type="checkbox"
        className="form-check-input cursor-pointer"
        id={`location-${location}`}
        value={location}
        checked={isChecked}
        onChange={onChange}
      />
      <label 
        className="form-check-label cursor-pointer"
        htmlFor={`location-${location}`}
      >
        {location}
      </label>
    </div>
  );
};

// Validation des props / Props validation
LocationCheckbox.propTypes = {
  location: PropTypes.string.isRequired,
  isChecked: PropTypes.bool.isRequired,
  onChange: PropTypes.func.isRequired
};

export default FiltersEmplacement;

// Styles CSS personnalisés / Custom CSS styles
const styles = `
.close-button {
  transition: background-color 0.2s ease;
}

.close-icon {
  font-size: 1.5rem;
  line-height: 1;
}

.form-check-input:checked {
  background-color: #4CAF50;
  border-color: #4CAF50;
}

.card {
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
  border-radius: 8px;
}
`;

// Injection des styles / Inject styles
const styleSheet = document.createElement("style");
styleSheet.innerText = styles;
document.head.appendChild(styleSheet);
