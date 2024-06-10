import React, { useState } from 'react'
import AdminEditProduct from './AdminEditProduct'
import displayINRCurrency from '../../helpers/displayCurrency'

function AdminProductCard({ data, fetchdata }) {

    const [editProduct, setEditProduct] = useState(false)

    return (
        <>
            <div>
                <div className='bg-white p-4 rounded'>
                    <div className='w-40'>
                        <div className='w-32 h-32 flex justify-center items-center'>

                            <img src={data?.productImage[0]} width={120} height={120} alt="No Img" className='mx-auto object-fill h-full' />

                        </div>

                        <h1 className='text-center text-ellipsis line-clamp-2'>{data?.productName}</h1>

                        <div>

                            <div className='text-center font-semibold'>

                                {displayINRCurrency(data.sellingPrice)}

                            </div>

                            <div className='w-8 h-8 ml-auto p-2 cursor-pointer rounded-full text-white bg-blue-400 hover:bg-blue-500 flex items-center justify-center' onClick={() => setEditProduct(true)} >
                                <i class="fa-solid fa-pen"></i>
                            </div>

                        </div>


                    </div>

                    {
                        editProduct && (<AdminEditProduct productData={data} onClose={() => setEditProduct(false)} fetchdata={fetchdata} />)
                    }



                </div>
            </div>
        </>
    )
}

export default AdminProductCard