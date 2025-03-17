
import { useEffect, useState,useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux'

// Pagination Component
function  Pagination (){
    const dispatch = useDispatch()
       const filterData = useSelector(state=>state.filterData)
    
    const [currentPage, setCurrentPage] = useState(1);
    const totalPages = Math.ceil(filterData.length / 5);
    const nextPage = () =>setCurrentPage((prev) => Math.min(prev + 1, totalPages))


    const prevPage = () => setCurrentPage((prev) => Math.max(prev - 1, 1));
    useEffect(()=>{
        dispatch({type:'pagination',payload:currentPage})

    },[totalPages,currentPage,filterData])
     const firstRender = useRef(true);
    useEffect(() => {
      if (firstRender.current) {
          firstRender.current = false;
          return; // Skip the first execution
      }
      dispatch({type:'pagination',payload:currentPage})
  }, [totalPages,currentPage,filterData]);
return (
     <div className="d-flex justify-content-between  align-items-center mt-3">
    <button className="btn btn-secondary  md:w-[10vw] w-[30vw]  " onClick={prevPage} disabled={currentPage === 1} > Précédent</button>
    <span>Page {currentPage} sur {totalPages}</span>
    <button className="btn btn-secondary  md:w-[10vw] w-[30vw]  "onClick={nextPage} disabled={currentPage === totalPages}>Suivant </button>
  </div>
)
 
}
export default Pagination