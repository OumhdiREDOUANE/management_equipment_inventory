import React, { useEffect } from 'react'
import { BrowserRouter,Route,Routes } from 'react-router'
import Login from "./Login"
import List_inventory from './List_inventory'
import Add_Inventory from "./Add_Inventory"
import Add_user from "./Add_user"
import History from "./History"
import Edit_inventory from './Edit_inventory'
import List_user from './List_user'
import Edit_user from './Edit_user'
import ProtectedRoute from "./ProtectedRoute"

export default function App() {

 
  

  return (
   <BrowserRouter>
   <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/List_inventory/:file" element={<ProtectedRoute><List_inventory/>
          </ProtectedRoute>} />
        <Route path="/List_inventory/:file" element={<ProtectedRoute><List_inventory/></ProtectedRoute>} />
        <Route path="/Add_Inventory/:file" element={<ProtectedRoute><Add_Inventory/></ProtectedRoute>} />
        <Route path="/Add_user/:file" element={<ProtectedRoute><Add_user/></ProtectedRoute>} />
        <Route path="/List_user/:file" element={<ProtectedRoute><List_user/></ProtectedRoute>} />

      
        <Route path="/history/:file" element={<ProtectedRoute><History/></ProtectedRoute>} />
<Route path='/Edit/:id/:nom'element={<ProtectedRoute><Edit_inventory/></ProtectedRoute>}/>
<Route path='/Edit_user/:id/:nom'element={<ProtectedRoute><Edit_user/></ProtectedRoute>}/>





      </Routes>
   </BrowserRouter>
  )
}
