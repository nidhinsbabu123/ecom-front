import React, { useCallback, useContext, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import SummaryApi from '../../services/LoginServ';
import displayINRCurrency from '../../helpers/displayCurrency';
import VerticalCardProducts from '../components/VerticalCardProducts';
import CategoryWiseProductDisplay from '../components/CategoryWiseProductDisplay';
import addToCart from '../helpers/addToCart';
import Context from '../context';


function ProductDetails() {

  const [data, setData] = useState({
    productName: "",
    brandName: "",
    category: "",
    productImage: [],
    description: "",
    price: "",
    sellingPrice: ""
  })

  const params = useParams()

  const [loading, setLoading] = useState(true)

  const productImageListLoading = new Array(4).fill(null)

  const [activeImage, setActiveImage] = useState("")

  const [zoomImageCordinate, setZoomImageCordinate] = useState({
    x: 0,
    y: 0
  })

  const [zoomImage, setZoomImage] = useState(false)

  const { fetchUserAddToCart } = useContext(Context)

  const navigate = useNavigate()

  const fetchProductDetails = async () => {

    setLoading(true)

    const response = await fetch(SummaryApi.productDetails.url, {
      method: SummaryApi.productDetails.method,
      headers: {
        "content-type": "application/json"
      },
      body: JSON.stringify({
        productId: params?.id
      })
    })

    setLoading(false)

    const dataResponse = await response?.json()

    setData(dataResponse?.data)

    setActiveImage(dataResponse?.data?.productImage[0])

  }

  console.log("data : ", data);

  useEffect(() => {
    fetchProductDetails()
  }, [params])

  const handleMouseEnterProduct = (imgURL) => {
    setActiveImage(imgURL)
  }

  const handleZoomImage = useCallback((e) => {
    setZoomImage(true)
    const { left, top, width, height } = e.target.getBoundingClientRect()
    console.log("Cordinate : ", left, top, width, height);

    const x = (e.clientX - left) / width
    const y = (e.clientY - top) / height

    setZoomImageCordinate({
      x, y
    })

  }, [zoomImageCordinate])

  const handleLeaveImageZoom = () => {
    setZoomImage(false)
  }

  const handleAddToCart = async (e, id) => {
    await addToCart(e, id)
    fetchUserAddToCart()
  }

  const handleBuyProduct = async (e, id) => {
    await addToCart(e, id)
    fetchUserAddToCart()
    navigate("/cart")
  }

  return (
    <>
      <div className='container mx-auto p-4'>

        <div className='min-h-[200px] flex flex-col lg:flex-row gap-4'>

          {/* Product Image */}

          <div className='h-96 flex flex-col lg:flex-row-reverse gap-4'>

            <div className='h-[300px] w-[300px] lg:h-96 lg:w-96 bg-slate-200 relative p-2'>
              <img src={activeImage} alt="No Img" className='h-full w-full object-scale-down mix-blend-multiply' onMouseMove={handleZoomImage} onMouseLeave={handleLeaveImageZoom} />

              {/* Product Zoom */}

              {
                zoomImage && (
                  <div className='hidden lg:block absolute min-w-[500px] overflow-hidden min-h-[400px] bg-slate-200 p-1 -right-[510px] top-0'>

                    <div className='w-full h-full min-h-[400px] min-w-[500px] mix-blend-multiply'

                      style={{
                        backgroundImage: `url(${activeImage})`,
                        backgroundRepeat: 'no-repeat',
                        backgroundPosition: `${zoomImageCordinate.x * 100}% ${zoomImageCordinate.y * 100}%`
                      }}

                    >

                    </div>

                  </div>
                )
              }



            </div>

            <div className='h-full'>
              {
                loading ? (
                  <div className='flex gap-2 lg:flex-col overflow-scroll scrollbar-none h-full'>
                    {
                      productImageListLoading.map((el, index) => {

                        return (
                          <div className='h-20 w-20 bg-slate-200 rounded animate-pulse' key={"loadingImage"+index} >

                          </div>
                        )

                      })
                    }
                  </div>
                ) : (
                  <div className='flex gap-2 lg:flex-col overflow-scroll scrollbar-none h-full'>
                    {
                      data?.productImage?.map((imgURL, index) => {

                        return (
                          <div className='h-20 w-20 bg-slate-200 rounded p-1' key={imgURL} >
                            <img className='w-full h-full object-scale-down mix-blend-multiply cursor-pointer' src={imgURL} alt="No Img" onMouseEnter={() => handleMouseEnterProduct(imgURL)} onClick={() => handleMouseEnterProduct(imgURL)} />
                          </div>
                        )

                      })
                    }
                  </div>
                )
              }
            </div>

          </div>

          {/* Product Details */}

          {
            loading ? (
              <div className='grid gap-1 w-full'>
                <p className='bg-slate-200 animate-pulse h-6 w-48 rounded-lg inline-block'></p>
                <h2 className='text-2xl lg:text-3xl font-medium h-6 w-48 bg-slate-200 animate-pulse'></h2>
                <p className='capitalize text-blue-500 bg-slate-200 min-w-[100px] animate-pulse h-6'></p>

                <div className='text-yellow-500 flex items-center gap-1 bg-slate-200 h-6 animate-pulse'>

                </div>

                <div className='flex items-center gap-2 text-xl font-medium my-1 h-6 animate-pulse'>
                  <p className='text-slate-500 bg-slate-200'></p>
                  <p className='text-red-500 line-through bg-slate-200 h-6'></p>
                </div>

                <div className='flex gap-4 my-2'>

                  <button className='h-6 bg-slate-200 rounded animate-pulse'></button>
                  <button className='h-6 bg-slate-200 rounded animate-pulse' ></button>

                </div>

                <div className='w-full'>
                  <p className='text-blue-500 font-medium my-1 h-6 bg-slate-200 rounded animate-puls w-full'></p>
                  <p className='text-blue-500 font-medium my-1 h-10 bg-slate-200 rounded animate-puls w-full'></p>
                </div>

              </div>
            ) : (
              <div className='flex flex-col gap-1'>
                <p className='bg-blue-200 text-red-600 px-2 rounded-lg inline-block w-fit'>{data?.brandName}</p>
                <h2 className='text-2xl lg:text-3xl font-medium'>{data?.productName}</h2>
                <p className='capitalize text-blue-500'>{data?.category}</p>

                <div className='text-yellow-500 flex items-center gap-1'>
                  <i class="fa-solid fa-star"></i>
                  <i class="fa-solid fa-star"></i>
                  <i class="fa-solid fa-star"></i>
                  <i class="fa-solid fa-star"></i>
                  <i class="fa-solid fa-star-half"></i>
                </div>

                <div className='flex items-center gap-2 text-xl font-medium my-1'>
                  <p className='text-slate-500'>{displayINRCurrency(data?.sellingPrice)}</p>
                  <p className='text-red-500 line-through'>{displayINRCurrency(data?.price)}</p>
                </div>

                <div className='flex gap-4 my-2'>

                  <button onClick={(e) => handleBuyProduct(e, data?._id)} className='border-yellow-500 bg-yellow-400 rounded px-2 py-1 hover:bg-yellow-500'>Buy Now</button>
                  <button onClick={(e) => handleAddToCart(e, data?._id)} className='border-yellow-500 bg-yellow-400 rounded px-2 py-1 hover:bg-yellow-500' >Add To cart</button>

                </div>

                <div>
                  <p className='text-blue-500 font-medium my-1'>Description :</p>
                  <p>{data?.description}</p>
                </div>

              </div>
            )
          }

        </div>

        {
          data.category && (
            <CategoryWiseProductDisplay category={data?.category} heading={"Recommended"} />
          )
        }



      </div>
    </>
  )
}

export default ProductDetails