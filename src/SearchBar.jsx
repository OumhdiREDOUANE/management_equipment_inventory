
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux'



function SearchBar (){
  
    
const dispatch = useDispatch();
const handleChange = (e) => {
  dispatch({ type: "Filter", payload: e.target.value });
};


return(
    <input
      type="text"
      className="form-control mb-3"
      placeholder="Rechercher..."
      onChange={
        handleChange      }
    />
)
}
  export default SearchBar 