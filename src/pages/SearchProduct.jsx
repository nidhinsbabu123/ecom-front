import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom';
import SummaryApi from '../../services/LoginServ';
import VerticalCard from '../components/VerticalCard';


function SearchProduct() {

    const query = useLocation()

    const [data, setData] = useState([])

    const [loading, setLoading] = useState(false)

    console.log("query : ", query.search);

    const fetchProduct = async () => {
        setLoading(true)
        const response = await fetch(SummaryApi.searchProduct.url+query.search)

        const dataResponse = await response.json()
        setLoading(false)

        setData(dataResponse.data)

        // console.log("dataResponse", dataResponse);
    }

    useEffect(() => {
        fetchProduct()
    },[query])

  return (
    <>

    <div className='container mx-auto p-4'>

        {
            loading && (
                <p className='text-2xl text-center font-semibold'>Loading...</p>
            )
        }

        <p className='text-xl font-medium my-4'>Search Result : {data.length}</p>

        {
            data.length === 0 && !loading && (
                <p className='text-2xl text-center font-semibold p-4'>No data found...</p>
            )
        }

        {
            data.length !==0 && !loading && (
                
                <VerticalCard data={data} />

            )
        }

    </div>

    </>
  )
}

export default SearchProduct