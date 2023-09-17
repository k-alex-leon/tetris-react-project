import React from 'react'

const Display = ({gameOver, text}) => {
  return (
    <div className='border-2 border-gray-800 p-4 text-xl font-bold z-10 shadow-lg shadow-gray-800 rounded-lg m-4'>
      {text}
    </div>
  )
}

export default Display
