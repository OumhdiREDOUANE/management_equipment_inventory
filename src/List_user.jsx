import React from 'react'
import NavBar from './NavBar'
import IndexTabelUser from './indexTabelUser'
export default function List_user() {
  return (
    <>
    
        <NavBar/>
       <h1 className='font-bold text-lg text-center'>List users</h1>
          <IndexTabelUser />
        
        
      </>
  )
}
