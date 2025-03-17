// Filters Component

import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux'
function FiltersEmplacement (){
    const typeFilter = useSelector(state=>state.typeFilter)
   
    const selectedEmplacement =useSelector(state=>state.selectedEmplacement)
    const dispatch = useDispatch()
     const HandlSetSelectEmplacement =(emplacement)=>{
      
        dispatch({type:"setSelectedEmplacement",payload:
            selectedEmplacement.includes(emplacement) ? selectedEmplacement.filter(item => item !== emplacement) : [...selectedEmplacement, emplacement]}
        )
       
    } 
    useEffect(()=>{
        dispatch({type:'Filter',payload:""})
    },[selectedEmplacement])
   
    
return(
    <>
    {typeFilter.emplacement&&<div className="card relative mb-3 w-[fit-content] mb-3">
      
      <div className='card-body flex flex-wrap '>
        {["salle de théâtre", "salle d'exposition", "salle de séminaire", "salle multimédia", "espace enfants", "Bibliothèque", "espace adultes"].map((emplacement) => (
            <div key={emplacement} className="form-check form-check-inline">
            <input
              type="checkbox"
              className="form-check-input"
              value={emplacement}
              checked={selectedEmplacement.includes(emplacement)}
              onChange={()=>HandlSetSelectEmplacement(emplacement)}
            />
            <label className="form-check-label">{emplacement}</label>
          </div>
        ))}
      </div>
      <div className='flex justify-end pr-2'>
<div className='close absolute bottom-0' onClick={()=>dispatch({ type: 'setTypeFilter', payload: 'close' })}>
      </div>
      </div>
    </div>}
  </>
)

}
export default FiltersEmplacement