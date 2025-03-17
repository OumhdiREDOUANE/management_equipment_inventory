import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import FiltersEtat from "./filterEtat"
import { FETCH_DATA_REQUEST, FETCH_DATA_SUCCESS, FETCH_DATA_FAILURE } from "./redux/actions"
import axios from "axios"
import {Link} from "react-router"



export default function TableUser({setSelectedRow}) {
  const { loading, filterData, error ,tableData,isHistory} = useSelector((state) => state);
  const paginatedData = useSelector(state => state.paginatedData)
  
  const dispatch = useDispatch()

const  visibleColumns = useSelector(state=>state.visibleColumns)
const SelectedRows = useSelector(state=>state.SelectedRows)

  
  
const fetchData = async (dispatch) => {
 

    
    
        try {
        const response = await axios.get("http://localhost/php_inventaire/controller/controllerUser.php", {
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
      }


useEffect(() => {
  fetchData(dispatch);
}, [JSON.stringify(tableData)]);

const deletRow =(idRowDelete)=>{
    axios.delete("http://localhost/php_inventaire/controller/controllerUser.php",{params: {id:idRowDelete}}).then((response) => {
      console.log(idRowDelete)
      console.log(response.data);
      fetchData(dispatch)
    })
  
}

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
                    {`${SelectedRows.length} ligne(s) sélectionnée(s)` }
                  </div>
                  </div>}
                  <div className='relative'>
          
                        
              <div className="table-responsive  ">
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
            {visibleColumns.id&&<th className='relative ' >
              <div className='flex relative justify-end pr-2 '>
                <div className='close absolute top-0 mb-3  ' onClick={()=>toggleColumnVisibility('id')}>
                </div>
              </div>
              <div className='flex items-center gap-2 mt-4' >
                id
                <div className=' relative sort' onClick={() => handlClickSort("id")}>

                </div>
              </div></th>}
             {visibleColumns.nom&&<th className='relative'>
              <div className='flex relative justify-end pr-2'>
                <div className='close absolute top-0 mb-3 ' onClick={()=>toggleColumnVisibility('nom')}>
                </div>
              </div>

              <div className='flex items-center gap-2 mt-4' >nom
                <div className='sort ' onClick={() => handlClickSort("nom")}></div></div></th>}
             {visibleColumns.phone&&<th className='relative'><div className='flex relative justify-end pr-2'>
              <div className='close absolute top-0 mb-3 ' onClick={()=>toggleColumnVisibility('phone')}>
              </div>
            </div><div className='flex items-center gap-2 mt-4' >phone <div className='sort' onClick={() => handlClickSort("phone")}></div></div></th>}
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
                {visibleColumns.id&&<td>{item.id}</td>}
                {visibleColumns.nom&&<td><div className="truncated-text" title={item.nom}>{item.nom}</div></td>}
                {visibleColumns.phone&&<td>{item.phone}</td>}
              
                <td className='flex  justify-center max-lg:w-[150px]'>
                <Link className=' ' to={`/Edit_user/${item.id}/${item.nom}`}> <button className="btn btn-primary btn-sm mx-1 w-[50px] h-[50px] "><img src="/edit.png" className=' w-[30px] h-[25px]' /></button> </Link>
                <Link to ="/List_user/List_user">  <button className="btn btn-danger btn-sm mx-1 w-[50px] h-[50px] "onClick={()=>deletRow(item.id)}><img src="/bin.png" className='w-[25px] h-[25px]' /></button></Link>
                  <button className="btn btn-info btn-sm mx-1 w-[50px] h-[50px]"onClick={() => setSelectedRow(item)} ><img src="/search-file.png" className='w-[25px] h-[25px]' /></button>
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
