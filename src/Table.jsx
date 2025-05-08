import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import FiltersEtat from "./filterEtat"
import { FETCH_DATA_REQUEST, FETCH_DATA_SUCCESS, FETCH_DATA_FAILURE } from "./redux/actions"
import axios from "axios"
import {Link} from "react-router"

export default function Table({setSelectedRow}) {
  const [file, setFile] = useState(null);

  const { loading, filterData, error ,tableData,isHistory} = useSelector((state) => state);
  const paginatedData = useSelector(state => state.paginatedData)
  
  const dispatch = useDispatch()
  
  const  visibleColumns = useSelector(state=>state.visibleColumns)
  const SelectedRows = useSelector(state=>state.SelectedRows)
  
  console.log(SelectedRows)
  
   useEffect(()=>{
    dispatch({type:"defaultSelectedRows"})
   },[filterData])
   const deletAllSelectHistory =()=>{
    axios.delete("http://localhost/php_inventaire/controller/contoller2.php",{params: {id:SelectedRows}}).then((response) => {

      console.log(response.data);
          fetchData(dispatch)
   })
   }
   const deletAllSelectList =()=>{
    axios.delete("http://localhost/php_inventaire/controller/controller.php",{params: {id:SelectedRows}}).then((response) => {

      console.log(response.data);
          fetchData(dispatch)
   })
   }
  const recovery = async (item) => {
  

   
      const response = await axios.post("http://localhost/php_inventaire/controller/contoller2.php",item,{
        params: { statut: "not export" }
      });
      console.log(response.data)
      fetchData(dispatch)
    
    }
const fetchData = async (dispatch) => {
  if(isHistory=="list"){
console.log("list")
    try {
      const response = await axios.get("http://localhost/php_inventaire/controller/controller.php", {
        params: { id: "" },
      });
      dispatch({
        type: FETCH_DATA_SUCCESS,
        payload: response.data,
      });
    } catch (error) {
      dispatch({
        type: FETCH_DATA_FAILURE,
        payload: error.message,
      });
    }
  }else if(isHistory=="history"){
console.log("history")

    try {
      const response = await axios.get("http://localhost/php_inventaire/controller/contoller2.php"); 
      dispatch({ type: FETCH_DATA_SUCCESS, payload: response.data });
  } catch (error) {
    
    dispatch({
      type: FETCH_DATA_FAILURE,
      payload: error.message,
    });
  }
  }
 
};

useEffect(() => {
  fetchData(dispatch);
}, [JSON.stringify(tableData)]);

const deletRowList =(idRowDelete)=>{


    axios.delete("http://localhost/php_inventaire/controller/controller.php",{params: {id:idRowDelete}}).then((response) => {
      console.log(idRowDelete)
      console.log(response.data);
          fetchData(dispatch)
    })
  
}

const deletRowHistory =(idRowDelete)=>{


  axios.delete("http://localhost/php_inventaire/controller/contoller2.php",{params: {id:idRowDelete}}).then((response) => {
    console.log(idRowDelete)
    console.log(response.data);
    fetchData(dispatch)

        console.log(isHistory)
  })

}





// useEffect(()=>{
//   axios.delete("http://localhost/php_inventaire/controller/contoller2.php",{params: {id:"all"}})
//   fetchData(dispatch)
// },[JSON.stringify(tableData)])


 const handlClickSort = (key) => {

    dispatch({ type: 'sort', payload: key })
  }
useEffect(()=>{
  handlClickSort("inventaire")
},[])
 
  const handlClickSetTypeFilter = (typeFilte) => {
    dispatch({ type: 'setTypeFilter', payload: typeFilte })

  }
  const toggleColumnVisibility =(column)=>{
dispatch({type:"setVisibleColumns",payload:column})
}
  const toggleSelectAll = () => {
 dispatch({type:"toggleSelectAll"})
};
  const toggleRowSelection = (id) => {
    dispatch({type:"toggleRowSelection",payload:id})
  };
  return (
        <>
        {SelectedRows.length > 0 && <div className="flex md:w-[90%] items-center ">
          <div className="alert alert-info col h-[25px] flex items-center justify-center">
          {`${SelectedRows.length} ligne(s) sélectionnée(s)`}
         
          </div>
        </div>}
        <div className='relative'>

              <FiltersEtat />
    <div className="table-responsive ">
 
  <table className="table table-striped z-1" >
        <thead>
          <tr>
            <th>
            <input
              type="checkbox"
              onChange={toggleSelectAll}
              checked={SelectedRows.length === filterData.length && filterData.length > 0}
              />
              
            </th>
            {visibleColumns.inventaire&&<th className='relative ' >
              <div className='flex relative justify-end pr-2 '>
                <div className='close absolute top-0 mb-3  ' onClick={()=>toggleColumnVisibility('inventaire')}>
                </div>
              </div>
              <div className='flex items-center gap-2 mt-4' >
                d'inventaire
                <div className=' relative sort' onClick={() => handlClickSort("inventaire")}>

                </div>
              </div></th>}
             {visibleColumns.Désignation&&<th className='relative'>
              <div className='flex relative justify-end pr-2'>
                <div className='close absolute top-0 mb-3 ' onClick={()=>toggleColumnVisibility('Désignation')}>
                </div>
              </div>

              <div className='flex items-center gap-2 mt-4' >Désignation
                <div className='sort ' onClick={() => handlClickSort("Désignation")}></div></div></th>}
             {visibleColumns.Unité&&<th className='relative'><div className='flex relative justify-end pr-2'>
              <div className='close absolute top-0 mb-3 ' onClick={()=>toggleColumnVisibility('Unité')}>
              </div>
            </div><div className='flex items-center gap-2 mt-4' >Unité <div className='sort' onClick={() => handlClickSort("Unité")}></div></div></th>}
             {visibleColumns.Quantité&&<th className='relative'><div className='flex relative justify-end pr-2'>
              <div className='close absolute top-0 mb-3 ' onClick={()=>toggleColumnVisibility('Quantité')}>
              </div>
            </div><div className='flex items-center gap-2 mt-4' >Quantité <div className='sort' onClick={() => handlClickSort("Quantité")}></div></div></th>}
             {visibleColumns.Affectation&&<th className='relative'><div className='flex relative justify-end pr-2'>
              <div className='close absolute top-0 mb-3 ' onClick={()=>toggleColumnVisibility('Affectation')}>
              </div>
            </div><div className='flex items-center gap-2 mt-4' >Affectation <div className='sort' onClick={() => handlClickSort("Affectation")}></div></div></th>}
             {visibleColumns.Réaffectation&&<th className='relative'><div className='flex relative justify-end pr-2'>
              <div className='close absolute top-0 mb-3 ' onClick={()=>toggleColumnVisibility('Réaffectation')}>
              </div>
            </div><div className='flex items-center gap-2 mt-4' >Réaffectation <div className='sort' onClick={() => handlClickSort("Réaffectation")}></div></div></th>}
             {visibleColumns.État&&<th className='relative'><div className='flex relative justify-end pr-2'>
              <div className='close absolute top-0 mb-3 ' onClick={()=>toggleColumnVisibility('État')}>
              </div>
            </div><div className='flex items-center gap-2 mt-4' >Etat
                <div className='relative ' >
                  <div className='filter' onClick={() => handlClickSetTypeFilter("etat")}></div>
                </div>
              </div></th>}
             {visibleColumns.Emplacement&&<th className='relative'><div className='flex relative justify-end pr-2'>
              <div className='close absolute top-0 mb-3 ' onClick={()=>toggleColumnVisibility('Emplacement')}>
              </div>
            </div><div className='flex items-center gap-2 mt-4' >Emplacement
                <div className='filter' onClick={() => handlClickSetTypeFilter("emplacement")}>
                </div></div></th>}
             {visibleColumns.Responsable&&<th className=''><div className='flex relative  justify-end pr-2'>
              <div className='close  absolute top-0 mb-3 ' onClick={()=>toggleColumnVisibility('Responsable')}>
              </div>
            </div><div className='flex items-center gap-2 relative mt-4 ' >Responsable <div className='sort' onClick={() => handlClickSort("Responsable")}></div></div></th>}
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {paginatedData.length > 0 ? (
            paginatedData.map(item =>
              <tr key={item.id}>
                <td>
                  <input
                    type="checkbox"
                    checked={SelectedRows.includes(item.id)}
                    
                    onChange={() => toggleRowSelection(item.id)}
                    />
                </td>
                {visibleColumns.inventaire&&<td>{item.inventaire}</td>}
                {visibleColumns.Désignation&&<td><div className="truncated-text" title={item.Désignation}>{item.Désignation}</div></td>}
                {visibleColumns.Unité&&<td>{item.Unité}</td>}
                {visibleColumns.Quantité&&<td>
                  <div
                    className="editable-cell"
                    
                    >
                    {item.Quantité !== null ? item.Quantité : "N/A"}
                  </div>
                </td>}
                {visibleColumns.Affectation&&<td><div className='truncated-text'>{item.Affectation}</div></td>}
                {visibleColumns.Réaffectation&&<td><div className='truncated-text'>{item.Réaffectation}</div></td>}
                {visibleColumns.État&&<td>{item.État}</td>}
                {visibleColumns.Emplacement&&<td>{item.Emplacement}</td>}
                {visibleColumns.Responsable&&<td><div className='truncated-text'>{item.Responsable}</div></td>}
                <td className="flex items-center space-x-2 w-auto">
  {isHistory === "list" ? (
    <>
      {/* Edit Button */}
      <Link to={`/Edit/${item.id}`}>
        <button className="btn btn-primary btn-sm w-[45px] h-[45px] flex items-center justify-center">
          <img src={`${process.env.PUBLIC_URL}/edit.png`} className="w-[22px] h-[22px]" alt="Edit" />
        </button>
      </Link>

      <Link to="/List_inventory/List_inventory">
      {SelectedRows.length > 0?<button
          className="btn btn-danger btn-sm w-[50px] h-[50px] flex items-center justify-center"
          onClick={() => deletAllSelectList()}
        >
          <img src={`${process.env.PUBLIC_URL}/bin.png`} className="w-[20px] h-[20px]" alt="Delete" />
        </button>:<button
          className="btn btn-danger btn-sm w-[50px] h-[50px] flex items-center justify-center"
          onClick={() => deletRowList(item.id)}
        >
          <img src={`${process.env.PUBLIC_URL}/bin.png`}className="w-[20px] h-[20px]" alt="Delete" />
        </button>}
        
      </Link>
    </>
  ) : (
    <>
      {/* Recovery Button */}
      <button
        className="btn btn-primary btn-sm w-[80px] h-[45px] flex items-center justify-center"
        onClick={()=>recovery(item)}
      >
        <img
          src={`${process.env.PUBLIC_URL}/icons8-recovery-64.png`}
          className="w-[40px] h-[30px]"
          alt="Recovery"
        />
      </button>

      {/* Delete Button for History */}
      <Link to="/history/history">
       {SelectedRows.length > 0?<button
          className="btn btn-danger btn-sm w-[50px] h-[50px] flex items-center justify-center"
          onClick={() => deletAllSelectHistory()}
        >
          <img src={`${process.env.PUBLIC_URL}/bin.png`} className="w-[20px] h-[20px]" alt="Delete" />
        </button>:<button
          className="btn btn-danger btn-sm w-[50px] h-[50px] flex items-center justify-center"
          onClick={() => deletRowHistory(item.id)}
        >
          <img src={`${process.env.PUBLIC_URL}/bin.png`} className="w-[20px] h-[20px]" alt="Delete" />
        </button>}
      </Link>
    </>
  )}

  {/* View Details Button */}
  <button
    className="btn btn-info btn-sm w-[50px] h-[45px] flex items-center justify-center"
    onClick={() => setSelectedRow(item)}
  >
    <img src={`${process.env.PUBLIC_URL}/search-file.png`} className="w-[22px] h-[22px]" alt="View" />
  </button>
</td>

              </tr>
            )
          ) : (
            <tr>
              {
                loading?<td colSpan="11" className="text-center text-warning">loading</td>:
                <td colSpan="11" className="text-center text-danger">Aucun résultat trouvé</td>
               
              }
            </tr>
          )
        }


        </tbody>
      </table>
     
    </div>
                    </div>
        </>
  )
}

