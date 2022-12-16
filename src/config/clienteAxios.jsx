import axios from "axios";

const clienteAxios = axios.create({
    // baseURL:`${import.meta.env.VITE_BACKEND_URL}/api`
    baseUrl:"test/api"
})

export default clienteAxios;