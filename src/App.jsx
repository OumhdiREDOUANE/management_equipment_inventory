import React from 'react'
import { BrowserRouter,Route,Routes } from 'react-router'
import Login from "./Login"
import List_inventory from './List_inventory'
export default function App() {
  return (
   <BrowserRouter>
   <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/List_inventory" element={<List_inventory/>} />
      </Routes>
   </BrowserRouter>
  )
}
