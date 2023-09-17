import React from 'react'
import Cell from './Cell'
const Stage = ({stage}) => {

  return (
    <div className='grid grid-cols-12'>
      {stage.map(row => row.map((cell , x) => <Cell key={x} type={cell[0]} /> ))}
    </div>
  )
}

export default Stage
