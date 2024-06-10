import React from 'react'

function Displayimage({ imgUrl, onClose }) {
  return (
    <>

      <div className='fixed left-0 right-0 top-0 bottom-0 flex justify-center items-center'>

        <div className='bg-white shadow-lg rounded max-w-5xl mx-auto'>

          <div className='hover:text-red-600 text-2xl cursor-pointer ml-auto w-fit p-4' onClick={onClose} >
            <i class="fa-solid fa-xmark"></i>
          </div>

          <div className='flex justify-center p-4 max-w-[80vh] max-h-[80vh]'>
            <img src={imgUrl} alt="No Img" className='w-full h-full' />
          </div>

        </div>

      </div>

    </>
  )
}

export default Displayimage