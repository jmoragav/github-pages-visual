import React from 'react'
import { Icon } from '@iconify/react';
import { useNavigate } from 'react-router-dom';
import useAuth from '../hooks/useAuth'
const TopBar = ({subseccion}) => {
    const navigate = useNavigate()
    const {cerrarSesion,auth} = useAuth()
    let path_length = window.location.href.split('/').length
    console.log(window.location.href.split('/'))
    let path = window.location.href.split('/')[path_length-1]
    if (path === ''){
        path = window.location.href.split('/')[path_length-2]
        
    }
    // console.log("🚀 ~ file: TopBar.jsx ~ line 12 ~ TopBar ~ path", path)
    return (
    <div className='min-h-[7em]  bg-[#123042] mb-5 flex flex-col rounded-md '>
        <div className='flex w-full gap-8 justify-end'>
            <div className='bg-[#272732] h-12 text-white flex-grow-0 flex-shrink-0  ml-4 rounded-b-md flex items-center'>
                <Icon icon="carbon:user-avatar" color="#3cdfff" width="40" height="40" className='ml-4 mr-4'/>
                <div className='flex-col mr-4'>
                    <p className='font-bold'>{auth.nombre} {auth.apellido_paterno} {auth.apellido_materno}</p>
                    <p>Administrador</p>
                </div>
            </div>
            <button className='bg-[#272732] flex h-12 text-white flex-grow-0 flex-shrink-0 basis-[13%] rounded-b-md  justify-center items-center' onClick={cerrarSesion}>
                <Icon icon="ri:shut-down-line" color="#3cdfff" width="40" height="40" className='ml-4'/>
                <p className='font-bold ml-4 text-lg'>Cerrar sesión</p>
            </button>
        </div>
        <div className='w-full'>
            <p className='ml-4 mt-4 text-white text-xl font-semibold'><span className='text-[#a0ffff] font-bold text-3xl'>Dashboard General</span> /{path}</p>
        </div>
    </div>
    )
}

export default TopBar