import { useEffect, useState } from 'react'
import './App.css'
import { Outlet, Route, Routes } from 'react-router-dom'
import Login from './pages/Login'
import Header from './components/Header'
import Footer from './components/Footer'
import Landing from './pages/Landing'
import ForgotPassword from './pages/ForgotPassword'
import Register from './pages/Register'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { current_user, loginuser } from '../services/allApi'
import SummaryApi from '../services/LoginServ'
import Context from './context'
import { useDispatch } from 'react-redux'
import { setUserDetails } from './store/userSlice'
import Admin from './pages/Admin'
import AllUsers from './pages/AllUsers'
import AllProducts from './pages/AllProducts'
import CategoryProduct from './pages/CategoryProduct'
import ProductDetails from './pages/ProductDetails'
import Cart from './pages/Cart'
import SearchProduct from './pages/SearchProduct'

function App() {

  const dispatch = useDispatch()

  const [cartProductCount, setCartProductCount] = useState(0)

  const fetchUserDetails = async () => {
    const dataResponse = await fetch(SummaryApi.current_user.url, {
      method: SummaryApi.current_user.method,
      credentials: 'include'
    })

    const dataApi = await dataResponse.json()

    if (dataApi.success) {
      dispatch(setUserDetails(dataApi.data))
    }

    // console.log("data-user", dataResponse);

  }

  const fetchUserAddToCart = async () => {
    const dataResponse = await fetch(SummaryApi.addToCartProductCount.url, {
      method: SummaryApi.addToCartProductCount.method,
      credentials: 'include'
    })

    const dataApi = await dataResponse.json()

    console.log("data Api is : ", dataApi);

    setCartProductCount(dataApi?.data?.count)

  }

  useEffect(() => {
    // User details
    fetchUserDetails()

    // fetch user add to cart
    fetchUserAddToCart()

  }, [])

  return (
    <>

      <Context.Provider value={{

        fetchUserDetails,  //user details fetch

        cartProductCount,  // Current user add to cart product count

        fetchUserAddToCart

      }}>

        <ToastContainer position='top-center' />

        <div className='pb-16'>

          <Header />

        </div>



        <Routes>

          <Route path='/' element={<Landing />} />

          <Route path='/login' element={<Login />} />

          <Route path='/forgot-password' element={<ForgotPassword />} />

          <Route path='/register' element={<Register />} />

          <Route path='/product-category' element={<CategoryProduct />} />

          <Route path='/product/:id' element = { <ProductDetails/> } />

          <Route path='/search' element = { <SearchProduct/> } /> 

          <Route path='/cart' element = { <Cart/> } />

          <Route path='/admin-panel' element={<Admin />}>

            <Route path='all-users' element={<AllUsers />} />
            <Route path='all-products' element={<AllProducts />} />

          </Route>


        </Routes>

        <Footer />

      </Context.Provider>

    </>
  )
}

export default App
