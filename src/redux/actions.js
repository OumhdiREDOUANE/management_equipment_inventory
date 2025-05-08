import axios from 'axios';

// Types d'actions pour la gestion des données / Action types for data management
export const FETCH_DATA_REQUEST = "FETCH_DATA_REQUEST";
export const FETCH_DATA_SUCCESS = "FETCH_DATA_SUCCESS";
export const FETCH_DATA_FAILURE = "FETCH_DATA_FAILURE";

// Créateurs d'actions synchrones / Synchronous action creators
/**
 * Action déclenchée au début de la requête / Action triggered at the start of the request
 */
export const fetchDataRequest = () => ({ 
  type: FETCH_DATA_REQUEST 
});

/**
 * Action déclenchée lors d'une requête réussie / Action triggered on successful request
 * @param {Array} data - Les données récupérées / Retrieved data
 */
export const fetchDataSuccess = (data) => ({
  type: FETCH_DATA_SUCCESS,
  payload: data,
});

/**
 * Action déclenchée en cas d'erreur / Action triggered on error
 * @param {string} error - Message d'erreur / Error message
 */
export const fetchDataFailure = (error) => ({
  type: FETCH_DATA_FAILURE,
  payload: error,
});

// Actions asynchrones avec redux-thunk / Async actions using redux-thunk
/**
 * Récupère les données depuis l'API / Fetches data from the API
 * @returns {Function} Thunk function
 */
export const fetchData = () => {
  return async (dispatch) => {
    // Indique le début du chargement / Indicate loading start
    dispatch(fetchDataRequest());
    
    try {
      // Configuration de la requête / Request configuration
      const apiEndpoint = "http://localhost/php_inventaire/controller/controller.php";
      const params = { id: "" };
      
      // Exécution de la requête / Execute request
      const response = await axios.get(apiEndpoint, { params });
      
      // Traitement de la réponse réussie / Handle successful response
      dispatch(fetchDataSuccess(response.data));
    } catch (error) {
      // Gestion des erreurs / Error handling
      const errorMessage = error.response?.data?.message || error.message;
      dispatch(fetchDataFailure(errorMessage));
      
      // Log de l'erreur pour le débogage / Log error for debugging
      console.error("Erreur lors de la récupération des données:", error);
    }
  };
};

// Actions pour la gestion des filtres / Actions for filter management
/**
 * Met à jour les filtres d'état / Updates status filters
 * @param {Array} selectedStates - États sélectionnés / Selected states
 */
export const updateStateFilters = (selectedStates) => ({
  type: "setSelectedÉtat",
  payload: selectedStates
});

/**
 * Met à jour les filtres d'emplacement / Updates location filters
 * @param {Array} selectedLocations - Emplacements sélectionnés / Selected locations
 */
export const updateLocationFilters = (selectedLocations) => ({
  type: "setSelectedEmplacement",
  payload: selectedLocations
});

// Actions pour la gestion du tri / Actions for sorting management
/**
 * Configure le tri des données / Configures data sorting
 * @param {string} key - Clé de tri / Sort key
 */
export const setSortConfig = (key) => ({
  type: "sort",
  payload: key
});

// Actions pour la gestion de la pagination / Actions for pagination management
/**
 * Met à jour la page courante / Updates current page
 * @param {number} page - Numéro de page / Page number
 */
export const setCurrentPage = (page) => ({
  type: "pagination",
  payload: page
});

// Actions pour la gestion de la recherche / Actions for search management
/**
 * Met à jour le terme de recherche / Updates search term
 * @param {string} searchTerm - Terme de recherche / Search term
 */
export const updateSearchTerm = (searchTerm) => ({
  type: "Filter",
  payload: searchTerm
});

// Actions pour la gestion de l'historique / Actions for history management
/**
 * Change le type d'historique affiché / Changes displayed history type
 * @param {string} historyType - Type d'historique / History type
 */
export const setHistoryType = (historyType) => ({
  type: "isHistory",
  payload: historyType
});

