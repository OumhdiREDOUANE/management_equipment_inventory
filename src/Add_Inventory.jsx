import React from 'react'
import NavBar from './NavBar'
import MultiStepForm from './Form'

export default function Add_Inventory() {
  return (
    <>
        <NavBar/>
   <h1 className='font-bold text-lg text-center'>Add inventory</h1>
  
    <MultiStepForm/>
    </>
  )
}
