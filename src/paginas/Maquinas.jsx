import React from 'react'
import Caja from '../components/Caja'
import DropDown from '../components/DropDown'
import useMaquinas from '../hooks/useMaquinas'
const Maquinas = () => {
  const {maquinas} = useMaquinas();
  return (
    <div className='bg-[#123042] mr-4 rounded-md'>
      <div className='ml-12 flex mt-[5%] mr-12 items-center justify-evenly'>
        <div className='flex flex-col basis-[40%]'>
          <DropDown title={'Seleccionar Máquina'} rows={maquinas}/>
        </div>
      </div>
      <div className='ml-12 flex justify-between mt-[5%] mr-12'>
        <Caja titulo={'Horas totales de operación'} valor={31}/>
        <Caja titulo={'Fecha última jornada operación'} valor={'10/05/22'}/>
        <Caja titulo={'Horas trabajo última jornada'} valor={'6h'}/>
        <Caja titulo={'Horas desde última inspección'} valor={36}/>
      </div>
      <div className='ml-12 flex justify-between mt-[5%] mr-12 mb-4'>
        <Caja titulo={'Horas desde último mantenimiento'} valor={'165h'}/>
        <Caja titulo={'RUL'} valor={'10h'}/>
        <Caja titulo={'Probabilidad de falla'} valor={'90%'}/>
        <Caja titulo={'Código de falla'} valor={'E040'}/>
      </div>
    </div>
  )
}

export default Maquinas