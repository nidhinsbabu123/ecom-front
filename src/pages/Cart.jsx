import React, { useContext, useEffect, useState } from 'react'
import SummaryApi from '../../services/LoginServ'
import Context from '../context'
import displayINRCurrency from '../../helpers/displayCurrency'

function Cart() {

    const [data, setData] = useState([])

    const [loading, setLoading] = useState(false)

    const context = useContext(Context)

    const loadingCart = new Array(context.cartProductCount).fill(null)

    const fetchData = async () => {
        // setLoading(true)
        const response = await fetch(SummaryApi.addToCartProductView.url, {
            method: SummaryApi.addToCartProductView.method,
            credentials: 'include',
            headers: {
                "content-type": 'application/json'
            }
        })
        // setLoading(false)

        const responseData = await response.json()

        if (responseData.success) {
            setData(responseData.data)
        }
    }

    const handleLoading = async () => {
        await fetchData()
    }

    useEffect(() => {
        setLoading(true)
        handleLoading()
        setLoading(false)
    }, [])

    const increaseQty = async (id, qty) => {
        const response = await fetch(SummaryApi.updateCartProduct.url, {
            method: SummaryApi.updateCartProduct.method,
            credentials: 'include',
            headers: {
                "content-type": "application/json",
            },
            body: JSON.stringify(
                {
                    _id: id,
                    quantity: qty + 1
                }
            )
        })

        const responseData = await response.json()

        if (responseData.success) {
            fetchData()
        }
    }

    // I AM WRITING THIS, BCZ, WHEN WE DELETE AN ITEM AFTER WE LOGIN, THEN IT IS REMOVED BUT, IF WE TRY TO BUY IT AGAIN, IT IS SHOWING THAT ITEM ALREADY EXISTS. AND I HAVE GIVEN THIS FUNCTION CALL IN response.success of deleteCartProduct() 
    const updatingCart =  async (id) => {
        const response = await fetch(SummaryApi.updateCartProduct.url, {
            method : SummaryApi.updateCartProduct.method,
            credentials : 'include',
            headers : {
                "content-type" : "application/json",
            },
            body : JSON.stringify(
                {
                    _id : id,
                }
            )
        })

        const result = await response.json()
        if (result.success){
            fetchData()
        }
    }

    const decreaseQty = async (id, qty) => {
        if (qty >= 2) {
            const response = await fetch(SummaryApi.updateCartProduct.url, {
                method: SummaryApi.updateCartProduct.method,
                credentials: 'include',
                headers: {
                    "content-type": "application/json",
                },
                body: JSON.stringify(
                    {
                        _id: id,
                        quantity: qty - 1
                    }
                )
            })

            const responseData = await response.json()

            if (responseData.success) {
                fetchData()
            }
        }
    }

    const deleteCartProduct = async (id) => {
        const response = await fetch(SummaryApi.deleteCartProduct.url, {
            method: SummaryApi.deleteCartProduct.method,
            credentials: 'include',
            headers: {
                "content-type": "application/json",
            },
            body: JSON.stringify(
                {
                    _id: id,
                }
            )
        })

        const responseData = await response.json()

        if (responseData.success) {
            // GIVEN A FUNCTION BY ME TO DELETE PROPERLY.
            updatingCart(id)
            fetchData()

            context.fetchUserAddToCart()

        }
    }

    const totalQty = data.reduce((previousValue, currentValue) => previousValue + currentValue.quantity, 0)

    const totalPrice = data.reduce((prev, curr) => prev + (curr.quantity * curr?.productId?.sellingPrice), 0)




    return (
        <>

            <div className='container mx-auto'>

                <div className='text-center text-lg my-3'>
                    {
                        data.length === 0 && !loading && (
                            <p className='bg-white shadow-lg rounded py-5'>Cart is empty</p>
                        )
                    }
                </div>

                <div className='flex flex-col lg:flex-row gap-10 lg:justify-between p-4'>
                    {/* View Product */}
                    <div className='w-full max-w-3xl'>
                        {
                            loading ? (

                                loadingCart.map((el, index) => {
                                    return (
                                        <div key={el + "Add to Cart Loading"+index} className='w-full bg-slate-200 h-32 my-2 border-4 rounded border-slate-300 animate-pulse'>

                                        </div>
                                    )
                                })


                            ) : (
                                data.map((product, index) => {
                                    return (
                                        <div key={product?._id + "Add to Cart Loading"} className='w-full bg-white h-32 my-2 rounded shadow-lg grid grid-cols-[128px,1fr]'>

                                            <div className='w-32 h-32 bg-blue-100'>

                                                <img src={product?.productId?.productImage[0]} className='w-full h-full object-scale-down mix-blend-multiply' />

                                            </div>

                                            <div className='px-4 py-2 relative'>

                                                {/* Delete Product */}

                                                <div onClick={() => deleteCartProduct(product?._id)} className='absolute right-0 text-red-600 rounded-full p-3 hover:bg-red-600 hover:text-white h-8 w-8 flex justify-center items-center cursor-pointer'>

                                                    <i class="fa-solid fa-trash"></i>

                                                </div>

                                                <h2 className='text-lg lg:text-xl text-ellipsis line-clamp-1'>{product?.productId?.productName}</h2>
                                                <p className='capitalize text-slate-400'>{product?.productId?.category}</p>
                                                <div className='flex items-center justify-between'>
                                                    <p className='text-red-600 font-medium'>{displayINRCurrency(product?.productId?.sellingPrice)}</p>

                                                    <p className='text-slate-600 font-semibold'>{displayINRCurrency(product?.productId?.sellingPrice * product?.quantity)}</p>

                                                </div>
                                                <div className='flex items-center mt-1 gap-3'>
                                                    <button onClick={() => decreaseQty(product?._id, product?.quantity)} className='flex items-center justify-center px-2 py-1 outline outline-blue-400 hover:outline-none hover:bg-blue-400 rounded-l-full'> <i class="fa-solid fa-minus"></i> </button>
                                                    <span className=''>{product?.quantity}</span>
                                                    <button onClick={() => increaseQty(product?._id, product?.quantity)} className='flex items-center justify-center px-2 py-1 outline outline-blue-400 hover:outline-none hover:bg-blue-400 rounded-r-full'> <i class="fa-solid fa-plus"></i> </button>
                                                </div>
                                            </div>

                                        </div>
                                    )
                                })


                            )
                        }
                    </div>

                    {/* Grand Total Calculation Section */}

                    <div className='mt-5 lg:mt-0 w-full max-w-sm'>
                        {
                            loading ? (
                                <div className='h-36 bg-slate-200 border-4 border-slate-300 rounded animate-pulse'>

                                </div>
                            ) : (
                                <div className='h-36 shadow-md'>

                                    <h2 className='bg-blue-500 text-white px-4 py-1 rounded-t'>Amount Summary</h2>

                                    <div className='flex items-center justify-between px-4 gap-2 font-medium text-lg'>
                                        <p>Total Quantity :</p>
                                        <p>{totalQty}</p>
                                    </div>

                                    <div className='flex items-center justify-between px-4 gap-2 font-medium text-lg'>
                                        <p>Total Price</p>
                                        <p>{displayINRCurrency(totalPrice)}</p>
                                    </div>

                                    <div className='text-center'>

                                    <button className='text-blue-500 hover:bg-blue-600 border-2 border-blue-500 hover:border-none px-2 py-1 mt-4 w-1/4 hover:text-white shadow-sm rounded font-medium'>Payment</button>

                                    </div>

                                    

                                </div>
                            )
                        }
                    </div>

                </div>

            </div>

        </>
    )
}

export default Cart