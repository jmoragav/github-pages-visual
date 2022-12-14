import {BrowserRouter , Routes, Route} from 'react-router-dom'
import { AuthProvider } from './context/AuthProvider'
import { MaquinasProvider } from './context/MaquinasProvider'
import AuthLayout from './layouts/AuthLayout'
import RutaProtegida from './layouts/RutaProtegida'
import Login from './paginas/Login'
import Maquinas from './paginas/Maquinas'
import Resumen from './paginas/Resumen'
import Sensores from './paginas/Sensores'
import VisualComputing from './paginas/VisualComputing'
 
import {Buffer} from 'buffer';

 
function App() {

  return (
    <BrowserRouter>
    <AuthProvider>
    <MaquinasProvider>
    <Routes>
        <Route path = "/" element = {<AuthLayout/>} >
            <Route index element = {<Login/>}/>
        </Route>
        <Route path ="/dashboard/" element = {<RutaProtegida/>}>
            <Route index element = {<Resumen/>}/>
            <Route path = 'maquinas' element = {<Maquinas/>} />
            <Route path = 'sensores' element = {<Sensores/>} />
            <Route path = 'visual-computing' element = {<VisualComputing/>}/>
            
        </Route>
      </Routes>
    </MaquinasProvider>
    </AuthProvider>
    </BrowserRouter>
  )
}

export default App
