import React, { useContext, useEffect, useRef, useState } from 'react'
import fetchCategoryWiseProduct from '../helpers/fetchCategoryWiseProducts'
import displayINRCurrency from '../../helpers/displayCurrency'
import { Link } from 'react-router-dom'
import addToCart from '../helpers/addToCart'
import Context from '../context'
import scrollTop from '../helpers/scrollTop'

function CategoryWiseProductDisplay({ category, heading }) {

    const [data, setData] = useState([])

    const [loading, setLoading] = useState(false)

    const loadingList = new Array(13).fill(null)

    const { fetchUserAddToCart } = useContext(Context)

    const handleAddToCart = async (e, id) => {
        await addToCart(e, id)
        fetchUserAddToCart()
    }

    const fetchData = async () => {

        setLoading(true)

        const categoryProduct = await fetchCategoryWiseProduct(category)

        setLoading(false)

        console.log("Horizontal data", categoryProduct.data);

        setData(categoryProduct?.data)

    }

    useEffect(() => {
        fetchData()
    }, [])

    

    return (
        <>

            <div className='container mx-auto px-4 my-6 relative'>

                <h2 className='text-2xl font-semibold py-4'>{heading}</h2>

                <div className='grid grid-cols-[repeat(auto-fit,minmax(300px,320px))] justify-between md:gap-6 overflow-x-scroll scrollbar-none transition-all' >

                    

                    {
                        data.map((product, index) => {
                            return (

                                <Link to={"/product/"+product?._id} className='w-full min-w-[280px] md:min-w-[320px] max-w-[280px] md:max-w-[320px] bg-white rounded-sm shadow' onClick={scrollTop } >

                                    <div className='bg-blue-100 h-48 p-4 min-w-[280px] md:min-w-[145px] flex justify-center items-center'>
                                        <img src={product.productImage[0]} className='object-scale-down h-full hover:scale-110 transition-all mix-blend-multiply' alt="" />
                                    </div>

                                    <div className='p-4 grid gap-3'>
                                        <h2 className='text-base md:text-lg font-semibold text-ellipsis line-clamp-1'> {product?.productName} </h2>
                                        <p className='capitalize text-blue-500'>{product.category}</p>

                                        <div className='flex gap-3'>
                                            <p className='text-red-600 font-medium' >{displayINRCurrency(product?.sellingPrice)}</p>
                                            <p className='text-slate-400 line-through' >{displayINRCurrency(product?.price)}</p>
                                        </div>

                                        <button onClick={(e) => handleAddToCart(e, product?._id)} className='bg-yellow-300 hover:bg-yellow-400 px-3 py-1 mt-2 rounded-full'>Add to Cart</button>

                                    </div>

                                </Link>

                            )
                        })
                    }
                </div>



            </div>

        </>
    )
}

export default CategoryWiseProductDisplay