import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import FiltersEtat from "./filterEtat"
import { FETCH_DATA_REQUEST, FETCH_DATA_SUCCESS, FETCH_DATA_FAILURE } from "./redux/actions"
import axios from "axios"
import {Link} from "react-router"



export default function Table({setSelectedRow}) {
  const { loading, filterData, error ,tableData,isHistory} = useSelector((state) => state);
  const paginatedData = useSelector(state => state.paginatedData)
  
  const dispatch = useDispatch()

const  visibleColumns = useSelector(state=>state.visibleColumns)
const SelectedRows = useSelector(state=>state.SelectedRows)

  console.log(isHistory)
const recovery = async (item) => {
  

    console.log(item)
      const response = await axios.post("http://localhost/php_inventaire/controller/contoller2.php",item);
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
        <>{SelectedRows.length > 0 && <div className="flex md:w-[90%] items-center ">
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
                {visibleColumns.Affectation&&<td>{item.Affectation}</td>}
                {visibleColumns.Réaffectation&&<td>{item.Réaffectation}</td>}
                {visibleColumns.État&&<td>{item.État}</td>}
                {visibleColumns.Emplacement&&<td>{item.Emplacement}</td>}
                {visibleColumns.Responsable&&<td>{item.Responsable}</td>}
                <td className='flex  max-lg:w-[200px]'>
                {isHistory=="list"?<><Link className=' ' to={`/Edit/${item.id}/${item.inventaire}`}> <button className="btn btn-primary btn-sm mx-1 w-[50px] h-[50px] "><img src="/edit.png" className=' w-[30px] h-[25px]' /></button> </Link>
                <Link to ="/List_inventory/List_inventory">  <button className="btn btn-danger btn-sm mx-1 w-[50px] h-[50px] "onClick={()=>deletRowList(item.id)}><img src="/bin.png" className='w-[25px] h-[25px]' /></button></Link>
                </>
                :<><button className="btn btn-primary btn-sm mx-1 w-[90px] h-[50px]" 
                onClick={()=>recovery(item)}
                ><img src="/icons8-recovery-64.png" className=' w-[50px] h-[40px]' /></button>
                <Link to ="/history/history">  <button className="btn btn-danger btn-sm mx-1 w-[50px] h-[50px] "onClick={()=>deletRowHistory(item.id)}><img src="/bin.png" className='w-[25px] h-[25px]' /></button></Link></>}
                  <button className="btn btn-info btn-sm mx-1"onClick={() => setSelectedRow(item)} ><img src="/search-file.png" className='w-[25px] h-[25px]' /></button>
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
