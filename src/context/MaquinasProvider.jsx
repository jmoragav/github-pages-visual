import React from 'react'
import { createContext,useState,useEffect } from 'react'
import clienteAxios from '../config/clienteAxios'

const MaquinasContext = createContext()
const MaquinasProvider = ({children}) => {
    const [maquinas,setMaquinas] = useState([])
    useEffect(() =>{
        const getDataMaquinas = async () => {
            // const token = localStorage.getItem('token');
            // if(!token){
            //     return
            // }
            // const config = {
            //     headers:{
            //         "Content-type":"application/json",
            //         Authorization:`Bearer ${token}`
            //     }
            // }
            try{
                const {data} = await clienteAxios('/maquinas/')
                setMaquinas(data)
                console.log(data)
            }catch(error){
                setAuth({})
            }
        }
        getDataMaquinas()
    },[])
    return (
        <MaquinasContext.Provider
            value = {{
                maquinas,
                setMaquinas       
            }}
        >
            {children}
        </MaquinasContext.Provider>
    )
}

export {
    MaquinasProvider
}

export default MaquinasContext;