import React from 'react'
import { Outlet } from 'react-router-dom'
const AuthLayout = () => {
  return (
    <div className='w-full min-h-screen flex flex-col justify-center'>
      <Outlet/>
    </div>
  )
}

export default AuthLayout