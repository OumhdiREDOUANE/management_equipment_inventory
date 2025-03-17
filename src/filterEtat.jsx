// Filters Component

import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux'
function FiltersEtat (){
    const typeFilter = useSelector(state=>state.typeFilter)
    const selectedÉtat = useSelector(state=>state.selectedÉtat)
 
    const dispatch = useDispatch()
    const HandlSetSelectedÉtat =(etat)=>{
      
        dispatch({type:"setSelectedÉtat",payload:
            selectedÉtat.includes(etat) ? selectedÉtat.filter(item => item !== etat) : [...selectedÉtat, etat]}
        )
       
    } 
    useEffect(()=>{
        dispatch({type:'Filter',payload:""})
    },[selectedÉtat])
    
    
return(
    <>
      
    {typeFilter.etat&&<div id="cardFilterEtat" className="card mb-3">
      <div className='card-body flex flex-col ' >
        {["bon", "mauvais", "très bon", "fuyant"].map((etat) => (
            <div key={etat} className="form-check form-check-inline">
            <input
              type="checkbox"
              className="form-check-input"
              value={etat}
              checked={selectedÉtat.includes(etat)}
              onChange={() =>HandlSetSelectedÉtat(etat) }
            />
            <label className="form-check-label">{etat}</label>
          </div>
        ))}
      
      

      </div>
      <div className='flex justify-end pr-2'>
<div className='close' onClick={()=>dispatch({ type: 'setTypeFilter', payload: 'close' })}>
      </div>
      </div>
    </div>}
   
  </>
)

}
export default FiltersEtat