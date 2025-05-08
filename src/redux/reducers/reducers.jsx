// Importation des types d'actions / Import action types
import { FETCH_DATA_REQUEST, FETCH_DATA_SUCCESS, FETCH_DATA_FAILURE } from "../actions"

// État initial de l'application / Initial application state
const initialState = {
  // Données principales / Main data
  tableData: [],
  filterData: [],
  paginatedData: [],

  // Configuration du tri / Sort configuration
  sortConfig: { 
    key: null, 
    direction: "asc" 
  },

  // Filtres / Filters
  selectedÉtat: [],
  selectedEmplacement: [],
  typeFilter: {
    etat: false,
    emplacement: false
  },

  // Configuration d'affichage / Display configuration
  visibleColumns: {
    inventaire: true,
    Désignation: true,
    Unité: true,
    Quantité: true,
    Affectation: true,
    Réaffectation: true,
    État: true,
    Emplacement: true,
    Responsable: true,
    id: true,
    phone: true,
    nom: true
  },

  // Sélection et état / Selection and state
  SelectedRows: [],
  isHistory: "list",
  loading: true,
  error: ""
}

// Réducteur principal / Main reducer
const Reducer = (state = initialState, action) => {
  switch (action.type) {
    // Gestion des requêtes de données / Data fetching handling
    case FETCH_DATA_REQUEST:
      return { 
        ...state, 
        loading: true 
      }

    case FETCH_DATA_SUCCESS:
      return { 
        ...state, 
        loading: false, 
        tableData: action.payload,
        filterData: [...action.payload],
        error: "" 
      }

    case FETCH_DATA_FAILURE:
      return { 
        ...state, 
        loading: false, 
        error: action.payload 
      }

    // Gestion de l'historique / History handling
    case "isHistory":
      return { 
        ...state, 
        isHistory: action.payload 
      }

    // Gestion des filtres / Filter handling
    case "setSelectedÉtat":
      return { 
        ...state, 
        selectedÉtat: action.payload 
      }

    case "setSelectedEmplacement":
      return { 
        ...state, 
        selectedEmplacement: action.payload 
      }

    // Filtrage des données / Data filtering
    case "Filter": {
      const filterData = (data) => {
        return data.filter((item) => {
          const searchTerm = action.payload.toLowerCase()
          
          // Filtre selon le type d'historique / Filter based on history type
          const matchesSearch = state.isHistory === "users"
            ? item.nom?.toString().toLowerCase().includes(searchTerm)
            : item.Désignation?.toString().toLowerCase().includes(searchTerm)

          // Application des filtres additionnels / Apply additional filters
          const matchesEtat = state.selectedÉtat.length === 0 || 
            state.selectedÉtat.includes(item.État)
          const matchesEmplacement = state.selectedEmplacement.length === 0 || 
            state.selectedEmplacement.includes(item.Emplacement)

          return matchesSearch && matchesEtat && matchesEmplacement
        })
      }

      return { 
        ...state, 
        filterData: filterData(state.tableData) 
      }
    }

    // Pagination / Pagination handling
    case "pagination":
      return {
        ...state,
        paginatedData: state.filterData.slice(
          (action.payload - 1) * 5,
          action.payload * 5
        )
      }

    // Tri des données / Data sorting
    case "sort": {
      const key = action.payload
      const direction = state.sortConfig?.key === key
        ? state.sortConfig.direction === "asc" ? "desc" : "asc"
        : "asc"

      const sortedData = [...state.filterData].sort((a, b) => {
        const valA = a[key] ?? ""
        const valB = b[key] ?? ""
        return direction === "asc"
          ? valA.toString().localeCompare(valB.toString(), undefined, { numeric: true })
          : valB.toString().localeCompare(valA.toString(), undefined, { numeric: true })
      })

      return {
        ...state,
        sortConfig: { key, direction },
        filterData: sortedData,
        paginatedData: sortedData.slice(0, 5)
      }
    }

    // Gestion des filtres de type / Type filter handling
    case "setTypeFilter": {
      if (action.payload === "etat") {
        return {
          ...state,
          typeFilter: {
            ...state.typeFilter,
            etat: !state.typeFilter.etat
          }
        }
      } else if (action.payload === "close") {
        return {
          ...state,
          typeFilter: {
            etat: false,
            emplacement: false
          }
        }
      } else {
        return {
          ...state,
          typeFilter: {
            ...state.typeFilter,
            emplacement: !state.typeFilter.emplacement
          }
        }
      }
    }

    // Gestion des colonnes visibles / Visible columns handling
    case "setVisibleColumns":
      return {
        ...state,
        visibleColumns: {
          ...state.visibleColumns,
          [action.payload]: !state.visibleColumns[action.payload]
        }
      }

    // Gestion de la sélection / Selection handling
    case "toggleSelectAll": {
      const allIds = state.filterData.map((row) => row.id)
      return {
        ...state,
        SelectedRows: state.SelectedRows.length === allIds.length ? [] : allIds
      }
    }

    case "toggleRowSelection":
      return {
        ...state,
        SelectedRows: state.SelectedRows.includes(action.payload)
          ? state.SelectedRows.filter((id) => id !== action.payload)
          : [...state.SelectedRows, action.payload]
      }

    case "defaultSelectedRows":
      return {
        ...state,
        SelectedRows: []
      }

    default:
      return state
  }
}

export default Reducer
