import React,{useState,useEffect} from 'react'
import {useNavigate} from "react-router-dom"
import clienteAxios from '../config/clienteAxios'
import useAuth from '../hooks/useAuth'
import Alerta from '../components/Alerta'
const Login = () => {
  const [rut,setRut] = useState('')
  const [password,setPassword] = useState('')
  const {setAuth} = useAuth();
  const [alerta,setAlerta] = useState('')
  const navigate = useNavigate()
  const handleSubmit = async e => {
    e.preventDefault();
    // if([rut,password].includes('')){
    //   setAlerta({
    //     msg:'Todos los campos son obligatorios',
    //     error:true
    //   })
    //   return
    // }
    try{
      //  const {data} = await clienteAxios.post('/usuarios/login',{rut,password})
      //  setAuth(data)
      //  localStorage.setItem('token',data.token)
      //  setAlerta('')
       navigate('/dashboard/')
    }catch(error){
      setRut('')
      setPassword('')
      setAlerta({
        msg:'Usuario o contraseña incorrecto',
        error:true
      })
    }
  }
  const {msg} = alerta
  return (
    <div className='w-96  bg-[#123042] m-auto p-8 rounded-md'>
      {msg && <Alerta alerta={alerta}/>}
      <form className='mt-10' onSubmit={handleSubmit}>
        <div className='w-full mb-8'>
          <label className='block text-white'>Usuario</label>
          <input className='rounded-sm w-full h-10' value = {rut} onChange={e => setRut(e.target.value)}/>
        </div>
        <div className='w-full mb-8'>
          <label className='block text-white'>Contraseña</label>
          <input className='rounded-sm w-full h-10' type='password' value={password} onChange={e => setPassword(e.target.value)}/>
        </div>
          <input type='submit' className='p-4 bg-white w-full hover:bg-sky-100 mt-20 rounded-md' value="Ingresar"/>
      </form>
    </div>
  )
}

export default Login