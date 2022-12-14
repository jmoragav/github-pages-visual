import React from 'react'
import Caja from '../components/Caja'
import DataTable from '../components/dataTable'
import useMaquinas from '../hooks/useMaquinas'

const columns = [
  { field: 'nombre_maquina', headerName: 'Nombre máquina' ,flex:1 },
  { field: 'tipo_maquina', headerName: 'Tipo de Maquina' ,flex:1},
  { field: 'codigo_falla', headerName: 'Tipo de falla' ,flex:1},
]


const Resumen = () => {
  const {maquinas} = useMaquinas();
  return (
    <div className='min-h-[80vh] bg-[#123042] mr-4 rounded-md'>
      <div className='ml-12 flex justify-between mt-[5%] mr-12'>
        <Caja titulo={'Maquinas Disponibles'} valor={maquinas.length}/>
        <Caja titulo={'Maquinas en Operación'} valor={maquinas.filter((e) => e.disponibilidad === 1 ).length}/>
        <Caja titulo={'Maquinas en Reparación'} valor={maquinas.filter((e) => e.disponibilidad === 0).length}/>
      </div>
      <DataTable columns = {columns} rows ={maquinas}/>
    </div>
  )
}

export default Resumen