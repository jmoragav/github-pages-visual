import React from 'react'
import { createContext,useState,useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import clienteAxios from '../config/clienteAxios'

const AuthContext = createContext()
const AuthProvider = ({children}) => {
    const [auth,setAuth] = useState(true)
    const [cargado,setCargado] = useState(true)
    const navigate = useNavigate()
    useEffect(() =>{
        const autenticarUsuario = async () => {
            const token = localStorage.getItem('token');
            if(!token){
                setCargado(false)
                return
            }
            const config = {
                headers:{
                    "Content-type":"application/json",
                    Authorization:`Bearer ${token}`
                }
            }
            try{
                const {data} = await clienteAxios('/usuarios/login-token',config)
                setAuth(data)
                console.log(auth)
                navigate('/dashboard/')
            }catch(error){
                setAuth({})
            }finally{
                setCargado(false)
            }
        }
        autenticarUsuario()
    },[])
    const cerrarSesion = async () => {
        localStorage.removeItem('token')
        navigate('/')
    }
    return (
        <AuthContext.Provider
            value = {{
                auth,
                cargado,
                setAuth,
                cerrarSesion
            }}
        >
            {children}
        </AuthContext.Provider>
    )
}

export {
    AuthProvider
}

export default AuthContext;