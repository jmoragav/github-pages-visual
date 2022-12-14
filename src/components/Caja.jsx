import React from 'react'

const Caja = ({titulo,valor}) => {
  return (
    <div className='w-[21rem] rounded-3xl border-[#0071bc] border-8 text-white flex flex-col text-center justify-center items-center'>
        <h1 className='text-3xl font-semibold mb-6'>{titulo}</h1>
        <p className='text-[#97f1f1] text-4xl font-semibold mb-4'>{valor}</p>
    </div>
  )
}

export default Caja