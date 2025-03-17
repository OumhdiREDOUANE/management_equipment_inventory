import axios from 'axios';
export const FETCH_DATA_REQUEST = "FETCH_DATA_REQUEST";
export const FETCH_DATA_SUCCESS = "FETCH_DATA_SUCCESS";
export const FETCH_DATA_FAILURE = "FETCH_DATA_FAILURE";

// Action creators
export const fetchDataRequest = () => ({ type: FETCH_DATA_REQUEST });
export const fetchDataSuccess = (data) => ({
  type: FETCH_DATA_SUCCESS,
  payload: data,
});
export const fetchDataFailure = (error) => ({
  type: FETCH_DATA_FAILURE,
  payload: error,
});

// Async action using `redux-thunk`
export const fetchData = () => {
  return async (dispatch) => {
    
    try {
   const response = await axios.get("http://localhost/php_inventaire/controller/controller.php",{params: {id:""}})
      
      const data = await response.data;
      dispatch(fetchDataSuccess(data));
    } catch (error) {
      dispatch(fetchDataFailure(error.message));
    }
  };
};
