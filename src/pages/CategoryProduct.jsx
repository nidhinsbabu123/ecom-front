import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import productCategory from '../../helpers/productCategory'
import VerticalCard from '../components/VerticalCard'
import SummaryApi from '../../services/LoginServ'

function CategoryProduct() {

  // const params = useParams()

  const [data, setData] = useState([])

  const navigate = useNavigate()

  const [loading, setLoading] = useState(false)

  const loaction = useLocation()

  const urlSearch = new URLSearchParams(loaction.search)

  const urlCategoryListInArray = urlSearch.getAll("category")

  const urlCategoryListObject = {}

  urlCategoryListInArray.forEach(el => {
    urlCategoryListObject[el] = true
  })

  const [selectCategory, setSelectCategory] = useState(urlCategoryListObject)

  const [filterCategoryList, setFilterCategoryList] = useState([])

  const [sortBy, setSortBy] = useState("")

  console.log("SortBy", sortBy);

  const fetchData = async () => {
    const response = await fetch(SummaryApi.filterProduct.url, {
      method: SummaryApi.filterProduct.method,
      headers: {
        "content-type": "application/json"
      },
      body: JSON.stringify({
        category: filterCategoryList
      })
    })

    const dataResponse = await response.json()

    setData(dataResponse?.data || [])

  }

  const handleSelectCategory = (e) => {
    const { name, value, checked } = e.target

    setSelectCategory((preve) => {
      return {
        ...preve,
        [value]: checked
      }
    })

  }

  useEffect(() => {
    fetchData()
  }, [filterCategoryList])


  useEffect(() => {
    const arrayOfCategory = Object.keys(selectCategory).map(categoryKeyName => {
      if (selectCategory[categoryKeyName]) {
        return categoryKeyName
      }
      return null
    }).filter(el => el)

    setFilterCategoryList(arrayOfCategory)

    // Format for the url change corresponding to the change in checkbox

    const urlformat = arrayOfCategory.map((el, index) => {
      if ((arrayOfCategory.length - 1) === index) {
        return `category=${el}`
      }

      return `category=${el}&&`

    })

    navigate("/product-category?" + urlformat.join(""))

  }, [selectCategory])

  const handleOnChangeSortBy = (e) => {
    const { value } = e.target

    setSortBy(value)

    if(value === 'asc'){
      setData(preve => preve.sort((a,b) => a.sellingPrice - b.sellingPrice))
    }

    if(value === 'dsc'){
      setData(preve => preve.sort((a,b) => b.sellingPrice - a.sellingPrice))
    }

    
  }

  useEffect(() => {

  },[sortBy])

  return (
    <>
      <div className='container mx-auto p-4'>

        {/* Desktop Version */}

        <div className='hidden lg:grid grid-cols-[200px,1fr]'>
          {/* Left Side */}

          <div className='p-2 bg-white min-h-[calc(100vh-120px)] overflow-y-scroll'>
            {/* Sort by */}
            <div>
              <h3 className='text-base uppercase font-medium text-blue-500 border-b-2 border-blue-200 pb-1'>Sort by</h3>

              <form className='text-sm flex flex-col gap-2 py-2 w-full'>
                <div className='flex items-center gap-3'>
                  <input type="radio" name='sortBy' value={"asc"} checked={sortBy === 'asc'} onChange={handleOnChangeSortBy} />
                  <label htmlFor="" className='text-black'>Price - Low to High</label>
                </div>

                <div className='flex items-center gap-3'>
                  <input type="radio" name='sortBy' value={"dsc"} checked={sortBy === 'dsc'} onChange={handleOnChangeSortBy} />
                  <label htmlFor="" className='text-black'>Price - High to Low</label>
                </div>

              </form>

            </div>

            {/* Filter by */}
            <div>
              <h3 className='text-base uppercase font-medium text-blue-500 border-b-2 border-blue-200 pb-1'>Category</h3>

              <form className='text-sm flex flex-col gap-2 py-2 w-full'>
                {
                  productCategory.map((categoryName, index) => {
                    return (
                      <div className='text-black flex items-center gap-3'>
                        <input type="checkbox" name={'category'} checked={selectCategory[categoryName?.value]} value={categoryName?.value} id={categoryName?.value} onChange={handleSelectCategory} />
                        <label htmlFor={categoryName?.value}>{categoryName?.label}</label>
                      </div>
                    )
                  })
                }
              </form>

            </div>

          </div>

          {/* Right Side ( product ) */}

          <div className='px-4'>

            <p className='font-medium text-blue-500 my-4'>Search Results : {data.length}</p>

            <div className='min-h-[calc(100vh-120px)] overflow-y-scroll max-h-[calc(100vh-120px)]'>
              {
                data.length !== 0 && !loading && (
                  <VerticalCard data={data} />
                )
              }
            </div>
          </div>

        </div>


      </div>
    </>
  )
}

export default CategoryProduct