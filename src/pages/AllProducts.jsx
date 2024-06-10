import React, { useEffect, useState } from 'react'
import UploadProduct from '../components/UploadProduct'
import SummaryApi from '../../services/LoginServ'
import AdminProductCard from '../components/AdminProductCard'


function AllProducts() {

  const [openUploadProduct, setOpenUploadProduct] = useState(false)

  const [allProduct, setAllProduct] = useState([])

  const fetchAllProduct = async () => {
    const response = await fetch(SummaryApi.allProduct.url)

    const dataResponse = await response.json()

    setAllProduct(dataResponse?.data || [])

  }

  useEffect(() => {
    fetchAllProduct()
  },[])

  return (
    <>
      <div className='bg-white py-2 px-4 flex justify-between items-center'>

        <h2 className='font-bold text-lg'>All Product</h2>

        <button onClick={() => setOpenUploadProduct(true)} className='bg-yellow-400 p-2 font-semibold rounded-md shadow-lg hover:text-blue-500 hover:bg-white hover:outline hover:outline-yellow-400 transition-all'><i class="fa-regular fa-square-plus"></i> Product</button>

      </div>

      {/* All Product */}

      <div className='flex items-center flex-wrap gap-5 py-4 h-[calc(100vh-190px)] overflow-y-scroll'>

        {
          allProduct.map((product, index) => {
            return(

              <AdminProductCard data = {product} key={index+"allProduct"} fetchdata = {fetchAllProduct} />

              
            )
          })
        }

      </div>

      {/* Upload Product */}

      {
        openUploadProduct && ( <UploadProduct onClose={() => setOpenUploadProduct(false)} fetchData = {fetchAllProduct} /> )
      }


    </>
  )
}

export default AllProducts