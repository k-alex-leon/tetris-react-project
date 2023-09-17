import React, { useEffect } from 'react'
import { TETROMINOS } from '../tetrominos'

const Cell = ({type}) => {

  return (
    <div className={`w-8 h-8 col-span-1 border border-gray-900`} style={type ? {background: "#"+ TETROMINOS[type].color} : {}}/>
  )
}

// render only when it change
export default React.memo(Cell)