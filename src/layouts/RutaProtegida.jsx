import React from 'react'
import { useEffect } from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import Sidebar from '../components/Sidebar'
import TopBar from '../components/TopBar'
import useAuth from '../hooks/useAuth'
const RutaProtegida = () => {
  const {auth} = useAuth()
  console.log("🚀 ~ file: RutaProtegida.jsx ~ line 9 ~ RutaProtegida ~ auth", auth)
  return (
    <>
    {!auth._id ?(
        <div>
            <div className='md:flex md:min-h-full'>
                <Sidebar/>
                <main className='flex-1 md:min-h-full flex flex-col'>
                    <TopBar/>
                    <Outlet/>
                </main>
            </div>
        </div>
    )
    : <Navigate to="/"/>
    }
    </>
  )
}

export default RutaProtegida