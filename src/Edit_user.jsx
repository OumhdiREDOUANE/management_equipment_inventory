import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./form.css"; 
import { Link, useParams } from "react-router"; // ✅ Correct import
import NavBar from "./NavBar";
import axios from "axios";
import { useNavigate } from "react-router"

function Edit_user (){
  const navigate=useNavigate()
  const [userUpdate, setUserUpdate] = useState({});
  const { id } = useParams();
  const [data, setData] = useState([]);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  const  fetchData = async () => {
      
    await axios.get("http://localhost/php_inventaire/controller/controllerUser.php", {
     params: { id: id },
   }).then((response) => {
     setData(response.data);
     setUserUpdate(response.data[0])
       
     }).catch((error) => console.error("Error fetching tasks:", error));
  
 } 



useEffect(() => {
  
 fetchData();
}, [JSON.stringify(data)]);
  const handleChange = (event) => {
    const { name, value } = event.target;
    setUserUpdate((prevState) => ({ ...prevState, [name]: value }));
  };

  const update = (event) => {
    event.preventDefault(); // ✅ Prevent form refresh

    axios
      .put("http://localhost/php_inventaire/controller/controllerUser.php", {
        idUsereUpdate: id,
        newUserUpdate: userUpdate,
      })
      .then((response) => {
        console.log(response.data);
        setMessage(response.data);
         navigate('/List_user/List_user')
      }
     )
      .catch((error) => console.error("Update error:", error));
  };

  useEffect(() => {
    if (message) {
      const timer = setTimeout(() => setMessage(""), 4000);
      return () => clearTimeout(timer); // ✅ Cleanup
    }
  }, [message]);

  return (
    <>
      <NavBar />
      <h1 className="font-bold text-lg text-center">Edit User</h1>

        {data?.map((item) => (
      <div className="container mt-4 mb-4">
        {message.message === "update succesfuly" && (
          <div className="alert alert-success">User updated successfully</div>
        )}
        {message.message === "update incorrect" && (
          <div className="alert alert-danger">Update failed</div>
        )}

          <form onSubmit={update} className="form-container card-body md:w-[60%]" key={item.id}>
            {error && <div className="alert alert-danger">{error}</div>}

            <div className="form-group">
              <label>Full Name</label>
              <input
                className="form-control"
                type="text"
                name="nom"
                defaultValue={item.nom} // ✅ Fixed typo
                onChange={handleChange}
                placeholder="Enter your name"
                required
              />
            </div>

            <div className="form-group">
              <label>Phone Number</label>
              <input
                className="form-control"
                type="tel"
                name="phone"
                defaultValue={item.phone}
                onChange={handleChange}
                placeholder="Enter your phone number"
                required
              />
            </div>

            <div className="form-group">
              <label>Password</label>
              <input
                className="form-control"
                type="password"
                name="password"
                onChange={handleChange}
                placeholder="Enter password"
                required
              />
            </div>

            <div className="form-group">
              <label>Repeat Password</label>
              <input
                className="form-control"
                type="password"
                name="confirmPassword"
                onChange={handleChange}
                placeholder="Repeat password"
                required
              />
            </div>

          <div className="flex justify-center">
                <button className="md:w-[40%] mt-3" type="submit">
                Update
              </button>
            </div>
          </form>
        
      </div>))}
    </>
  );
};

export default Edit_user;
