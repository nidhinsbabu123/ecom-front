import React, { useState } from 'react'
import productCategory from '../../helpers/productCategory'
import uploadImage from '../../helpers/uploadImage'
import Displayimage from './Displayimage'
import SummaryApi from '../../services/LoginServ'
import { toast } from 'react-toastify'

function AdminEditProduct({ onClose, productData, fetchdata }) {

    const [data, setData] = useState({
        ...productData,
        productName: productData?.productName,
        brandName: productData?.brandName,
        category: productData?.category,
        productImage: productData?.productImage || [],
        description: productData?.description,
        price: productData?.price,
        sellingPrice: productData?.sellingPrice
    })

    const [openFullScreenImage, setOpenFullScreenImage] = useState(false)



    // const [uploadProductImageInput, setUploadProductImageInput] = useState("")

    const [fullScreenImage, setFullScreenImage] = useState("")

    const handleOnchange = (e) => {
        const { name, value } = e.target
        setData((preve) => {
            return {
                ...preve,
                [name]: value
            }
        })
    }

    const handleUploadProduct = async (e) => {
        const file = e.target.files[0]
        // setUploadProductImageInput(file.name)
        // console.log("file : ", file);

        const uploadImageCloudinary = await uploadImage(file)

        setData((preve) => {
            return {
                ...preve,
                productImage: [...preve.productImage, uploadImageCloudinary.url]
            }
        })

    }

    const handleDeleteProductImage = async (index) => {
        console.log("Image Index : ", index);

        const newProductImage = [...data.productImage]

        newProductImage.splice(index, 1)

        setData((preve) => {
            return {
                ...preve,
                productImage: [...newProductImage]
            }
        })
    }

    // Upload Product
    const handleSubmit = async (e) => {
        e.preventDefault()
        // console.log("data : ", data);

        const response = await fetch(SummaryApi.updateProduct.url, {
            method: SummaryApi.updateProduct.method,
            credentials: 'include',
            headers: {
                "content-type": "application/json"
            },
            body: JSON.stringify(data)
        })
        const responseData = await response.json()

        if (responseData.success) {
            toast.success(responseData?.message)
            onClose()
            fetchdata()
        }

        if (responseData.error) {
            toast.error(responseData.message)
        }

    }


    return (
        <>
            <div className='fixed bg-black bg-opacity-30 w-full h-full top-0 bottom-0 left-0 right-0 flex justify-center items-center'>

                <div className='bg-white p-4 w-full max-w-2xl rounded h-full max-h-[80%] shadow-lg overflow-hidden'>

                    <div className='flex justify-between items-center h-8 mb-4'>

                        <h2 className='font-semibold text-lg'>Edit Product</h2>
                        <div className='text-xl hover:text-red-600 hover:text-2xl transition-all cursor-pointer' onClick={onClose} >
                            <i class="fa-solid fa-xmark"></i>
                        </div>

                    </div>

                    <form className='grid mx-auto gap-2 overflow-y-scroll h-full pb-5' onSubmit={handleSubmit} >

                        {/* Product Name */}
                        <label className='text-black' htmlFor='productName'>Product Name : </label>

                        <input
                            type="text"
                            id='productName'
                            placeholder='Enter Product Name'
                            name='productName'
                            required
                            value={data.productName}
                            onChange={handleOnchange}
                            className='p-2 focus:bg-blue-100 text-black border border-black rounded'
                        />

                        {/* Brand Name */}

                        <label className='text-black mt-3' htmlFor='brandName'>Brand Name : </label>

                        <input
                            type="text"
                            id='brandName'
                            name='brandName'
                            required
                            placeholder='Enter Brand Name'
                            value={data.brandName}
                            onChange={handleOnchange}
                            className='p-2 focus:bg-blue-100 text-black border border-black rounded'
                        />

                        {/* Category */}
                        <label className='text-black mt-3' htmlFor='category'>Category : </label>
                        <select required value={data.category} onChange={handleOnchange} name="category" id="" className='p-2 focus:bg-blue-100 text-black border border-black rounded'>
                            <option value={""} >Select Category</option>
                            {
                                productCategory.map((el, index) => {
                                    return (
                                        <option value={el.value} key={el.value + index}>{el.label}</option>
                                    )
                                })
                            }

                        </select>

                        {/* Product Image */}
                        <label className='text-black mt-3' htmlFor='productImage'>Product Image : </label>

                        <label htmlFor="uploadImageInput">

                            <div className='p-2 bg-blue-100 rounded h-32 w-full text-black flex justify-center items-center cursor-pointer'>



                                <div className='text-slate-500 text-center'>

                                    <span><i class="fa-solid fa-file-arrow-up text-4xl mb-2"></i></span>
                                    <p className='text-sm mb-3'>Upload Product Image</p>
                                    <input type="file" name="" id="uploadImageInput" className='hidden' onChange={handleUploadProduct} />


                                </div>



                            </div>

                        </label>

                        <div>
                            {
                                data?.productImage[0] ? (
                                    <div className='flex items-center gap-2'>
                                        {
                                            data.productImage.map((el, index) => {
                                                return (

                                                    <div className='relative group'>

                                                        <img src={el}
                                                            alt="No Img"
                                                            width={80}
                                                            height={80}
                                                            className='bg-blue-100 border-black cursor-pointer'
                                                            onClick={() => {
                                                                setOpenFullScreenImage(true)
                                                                setFullScreenImage(el)
                                                            }}
                                                        />

                                                        {/* Delete Button */}

                                                        <div className='absolute bottom-0 right-0 p-1 bg-white text-red-600 rounded-full w-7 h-7 text-center hidden group-hover:block cursor-pointer' onClick={() => handleDeleteProductImage(index)} >

                                                            <i class="fa-solid fa-trash"></i>

                                                        </div>

                                                    </div>


                                                )
                                            })
                                        }
                                    </div>
                                ) : (<p className='text-red-600 mb-4'>*Please upload product image</p>)
                            }

                        </div>

                        {/* Price */}

                        <label className='text-black mt-3' htmlFor='price'>Price : </label>

                        <input
                            type="number"
                            id='price'
                            name='price'
                            required
                            placeholder='Enter Price'
                            value={data.price}
                            onChange={handleOnchange}
                            className='p-2 focus:bg-blue-100 text-black border border-black rounded'
                        />

                        {/* Selling Price */}

                        <label className='text-black mt-3' htmlFor='sellingPrice'>Selling Price : </label>

                        <input
                            type="number"
                            id='sellingPrice'
                            name='sellingPrice'
                            required
                            placeholder='Enter Selling Price'
                            value={data.sellingPrice}
                            onChange={handleOnchange}
                            className='p-2 focus:bg-blue-100 text-black border border-black rounded'
                        />

                        {/* Description */}

                        <label className='text-black mt-3' htmlFor='description'>Description : </label>

                        <textarea
                            className='h-28 bg-blue-100 text-black p-1 border rounded'
                            placeholder='Enter product description'
                            name="description"
                            rows={3}
                            onChange={handleOnchange}
                            id=""
                            value={data.description}
                        >

                        </textarea>

                        {/* <div className='w-full text-center'> */}

                        <button className='px-2 py-1 outline outline-blue-600 text-black hover:outline-none hover:text-white hover:bg-blue-600 mb-8 rounded w-[98%] mx-auto'>Update</button>

                        {/* </div> */}



                    </form>

                </div>

                {/* Display image in full screen */}

                {
                    openFullScreenImage && (<Displayimage onClose={() => setOpenFullScreenImage(false)} imgUrl={fullScreenImage} />)
                }



            </div>
        </>
    )
}

export default AdminEditProduct