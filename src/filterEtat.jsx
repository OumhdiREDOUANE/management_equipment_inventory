import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import PropTypes from 'prop-types';

/**
 * Constantes pour les états possibles
 * Constants for possible states
 */
const EQUIPMENT_STATES = [
  { value: "bon", label: "Bon état" },
  { value: "mauvais", label: "Mauvais état" },
  { value: "très bon", label: "Très bon état" },
  { value: "fuyant", label: "État fuyant" }
];

/**
 * Composant de filtrage par état du matériel
 * Equipment state filter component
 */
function FiltersEtat() {
  // Récupération des états Redux / Get Redux states
  const typeFilter = useSelector(state => state.typeFilter);
  const selectedEtat = useSelector(state => state.selectedÉtat);
  const dispatch = useDispatch();

  /**
   * Gère la sélection/désélection d'un état
   * Handles state selection/deselection
   * @param {string} etat - L'état à gérer / State to handle
   */
  const handleSetSelectedEtat = (etat) => {
    dispatch({
      type: "setSelectedÉtat",
      payload: selectedEtat.includes(etat)
        ? selectedEtat.filter(item => item !== etat)
        : [...selectedEtat, etat]
    });
  };

  // Effet pour déclencher le filtrage / Effect to trigger filtering
  useEffect(() => {
    dispatch({ type: 'Filter', payload: "" });
  }, [selectedEtat, dispatch]);

  // Si le filtre n'est pas actif, ne rien afficher / If filter is not active, don't display anything
  if (!typeFilter.etat) return null;

  return (
    <div className="filter-card card mb-3 shadow-sm">
      {/* En-tête du filtre / Filter header */}
      <div className="card-header bg-light">
        <h5 className="mb-0">État du matériel</h5>
      </div>

      {/* Corps du filtre / Filter body */}
      <div className="card-body">
        <div className="filter-options grid gap-2">
          {EQUIPMENT_STATES.map(({ value, label }) => (
            <StateCheckbox
              key={value}
              state={value}
              label={label}
              isChecked={selectedEtat.includes(value)}
              onChange={() => handleSetSelectedEtat(value)}
            />
          ))}
        </div>
      </div>

      {/* Pied de carte avec bouton de fermeture / Card footer with close button */}
      <div className="card-footer text-end bg-light">
        <button
          className="close-button btn btn-sm btn-outline-secondary"
          onClick={() => dispatch({ type: 'setTypeFilter', payload: 'close' })}
          aria-label="Fermer le filtre"
        >
          <i className="fas fa-times"></i> Fermer
        </button>
      </div>
    </div>
  );
}

/**
 * Composant de case à cocher pour un état
 * State checkbox component
 */
const StateCheckbox = ({ state, label, isChecked, onChange }) => {
  return (
    <div className="form-check">
      <input
        type="checkbox"
        className="form-check-input"
        id={`state-${state}`}
        value={state}
        checked={isChecked}
        onChange={onChange}
      />
      <label 
        className="form-check-label"
        htmlFor={`state-${state}`}
      >
        {label}
      </label>
    </div>
  );
};

// Validation des props / Props validation
StateCheckbox.propTypes = {
  state: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  isChecked: PropTypes.bool.isRequired,
  onChange: PropTypes.func.isRequired
};

// Styles CSS personnalisés / Custom CSS styles
const styles = `
.filter-card {
  border-radius: 8px;
  border: 1px solid rgba(0,0,0,0.1);
}

.filter-options {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(140px, 1fr));
}

.form-check-input:checked {
  background-color: #0d6efd;
  border-color: #0d6efd;
}

.form-check-label {
  cursor: pointer;
  user-select: none;
}

.close-button {
  transition: all 0.2s ease;
}

.close-button:hover {
  background-color: #dc3545;
  color: white;
  border-color: #dc3545;
}
`;

// Injection des styles / Inject styles
const styleSheet = document.createElement("style");
styleSheet.innerText = styles;
document.head.appendChild(styleSheet);

export default FiltersEtat;
