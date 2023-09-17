import React from 'react'

const StartButton = ({callback}) => {
  return (
    <button onClick={callback} className='w-full m-4 p-4 duration-100 shadow-lg shadow-gray-800 rounded-lg bg-gray-700 text-center font-bold text-xl hover:scale-90 hover:border-gray-600 hover:shadow-transparent'>
      Start
    </button>
  )
}

export default StartButton
