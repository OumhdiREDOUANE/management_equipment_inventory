// src/redux/reducers.js
import { FETCH_DATA_REQUEST, FETCH_DATA_SUCCESS, FETCH_DATA_FAILURE } from "../actions"


const initialState = {
  
  tableData: [] ,

  filterData:[],
  paginatedData:[],
  sortConfig:{ key: null, direction: "asc" },
  selectedÉtat:[],
  selectedEmplacement:[],
  typeFilter:{etat:false,emplacement:false},
  visibleColumns:{
    inventaire: true,
    Désignation: true,
    Unité: true,
    Quantité: true,
    Affectation: true,
    Réaffectation: true,
    État: true,
    Emplacement: true,
    Responsable: true,
    id:true,
    phone:true,
    nom:true
  },
  SelectedRows:[],
  isHistory:"list",
  loading: true,
  
  error: "",
};


const Reducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_DATA_REQUEST:
      

        console.log("1")
        return { ...state, loading: true };
      
    case FETCH_DATA_SUCCESS:
      
console.log("2")
      return { ...state, loading: false, tableData:action.payload,filterData:[...state.tableData], error: "" };
    case FETCH_DATA_FAILURE:
      console.log(state.tableData)
      console.log("3")

      return { ...state, loading: false, error: action.payload };
    // case "setTableData":
     
    //   return {...state,tableData:action.payload,filterData:state.isHistory=="list"?[...state.tableData]:[...state.historyData]}
     case "isHistory":
      console.log(action.payload)

        return {...state,isHistory:action.payload}
        
        case "setSelectedÉtat":
          console.log("5")

          return {...state,selectedÉtat:action.payload}
        case "setSelectedEmplacement":
          console.log("6")

            return {...state,selectedEmplacement:action.payload}
        case "Filter":
  console.log(state.tableData)
  const filterData = (data) => {
    return data.filter((item) => {
      const searchTerm = action.payload.toLowerCase();
  
      // Determine which property to use for filtering based on state.isHistory
      const matchesSearch = state.isHistory === "users"
        ? item.nom?.toString().toLowerCase().includes(searchTerm)
        : item.Désignation?.toString().toLowerCase().includes(searchTerm);
  
      // Ensure other filters are applied correctly
      const matchesEtat = state.selectedÉtat.length === 0 || state.selectedÉtat.includes(item.État);
      const matchesEmplacement = state.selectedEmplacement.length === 0 || state.selectedEmplacement.includes(item.Emplacement);
  
      return matchesSearch && matchesEtat && matchesEmplacement;
    });
  };
  
       
        
          
          
          return { ...state, filterData: filterData(state.tableData) };
        
        
          case "pagination":
            console.log(state.filterData);
          
            return {
              ...state,
              paginatedData: state.filterData.slice((action.payload - 1) * 5, action.payload * 5),
            };
            case "sort":
              console.log("Sorting triggered");
            
              const key = action.payload;
              let direction = "asc";
            
              if (state.sortConfig?.key === key) {
                direction = state.sortConfig.direction === "asc" ? "desc" : "asc";
              }
            
              const sortedData = [...state.filterData].sort((a, b) => {
                const valA = a[key] ?? "";
                const valB = b[key] ?? "";
                return direction === "asc"
                  ? valA.toString().localeCompare(valB.toString(), undefined, { numeric: true })
                  : valB.toString().localeCompare(valA.toString(), undefined, { numeric: true });
              });
            
              return {
                ...state,
                sortConfig: { key, direction },
                filterData: sortedData, // Store sorted data in filterData
                paginatedData: sortedData.slice(0, 5), // Reset pagination to first page
              };
            
    case "setTypeFilter":
      console.log("10")

      if(action.payload=="etat"){
        
         return {...state,typeFilter:{...state.typeFilter,etat:!state.typeFilter.etat}}
      }else if (action.payload=="close") {    
        

        return {...state,typeFilter:{etat:false,emplacement:false}}
      }else{
     
        return {...state,typeFilter:{...state.typeFilter,emplacement:!state.typeFilter.emplacement}}

      }
     case "setVisibleColumns":
      console.log("11")

      return {
        ...state, visibleColumns:{...state.visibleColumns,[action.payload]: !state.visibleColumns[action.payload]},
      }
      case "toggleSelectAll":
        console.log("12")

      const allIds = state.filterData.map((row) => row.id);
      if(state.SelectedRows.length === allIds.length){
return {...state,SelectedRows:[]}
      }else{
        return {...state,SelectedRows:allIds}
      }
      case "toggleRowSelection":
        console.log("13")

        if(state.SelectedRows.includes(action.payload)){
          return {...state,SelectedRows:state.SelectedRows.filter((rowId) => rowId !== action.payload)}
        }else{
          return {...state,SelectedRows:[...state.SelectedRows,action.payload]}
        }
         
       case "defaultSelectedRows":
         return {...state,SelectedRows:[]}
       
    default:
      return state;
  }
};

export default Reducer;