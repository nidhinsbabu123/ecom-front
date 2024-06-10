import React, { useContext, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import SummaryApi from '../../services/LoginServ';
import { toast } from 'react-toastify'
import { setUserDetails } from '../store/userSlice';
import ROLE from '../../services/role';
import Context from '../context';

function Header() {

    const user = useSelector(state => state?.user?.user)

    const navigate = useNavigate()

    const dispatch = useDispatch()

    const [menuDisplay, setMenuDisplay] = useState(false)

    const context = useContext(Context)

    const searchInput = useLocation()

    const URLSearch = new URLSearchParams(searchInput?.search)

    const searchQuery = URLSearch.getAll("q")

    const [search, setSearch] = useState(searchQuery)

    // console.log("Search Input", searchInput?.search.split("=")[1])

    // console.log("User header ", user);

    const handleLogout = async () => {
        const fetchData = await fetch(SummaryApi.logout_user.url, {
            method: SummaryApi.logout_user.method,
            // for cookies to send it the back-end
            credentials: 'include'
        })

        const data = await fetchData.json()

        if (data.success) {
            toast.success(data.message)

            dispatch(setUserDetails(null))

            navigate("/")
        }

        if (data.error) {
            toast.error(data.message)
        }

    }

    const handleSearch = (e) => {
        const { value } = e.target
        setSearch(value)

        if(value){
            navigate(`/search?q=${value}`)
        }else{
            navigate("/search")
        }

    }

    // console.log("Header add to cart count : ", context);

    return (
        <>

            {/* Navbar */}


            <div className='w-full shadow-md mx-auto px-10 bg-white fixed z-10'>

                <div className='items-center w-full flex justify-between'>

                    {/* Logo */}


                    <div className=' w-28'>

                        <Link to={'/'} >

                            <img src="./images/N.jpg" className='w-9 mx-auto' />
                            <h6 className='text-blue-500 lg:text-xl sm:text-sm font-bold mx-auto'>N-Shopper</h6>

                        </Link>


                    </div>

                    {/* Search Box */}

                    <div className='w-96 lg:relative searchbox shadow-md'>

                        <div className='absolute p-2 text-blue-500 bg-slate-300 rounded-l-md'>
                            <i class="fa-solid fa-magnifying-glass"></i>
                        </div>


                        <input onChange={handleSearch} value={search} class="focus:ring-2 focus:ring-blue-500 focus:outline-none appearance-none w-full text-sm leading-6 text-slate-900 placeholder-slate-400 rounded-md py-2 pl-10 ring-1 ring-slate-300 shadow-sm focus:shadow-md" type="text" placeholder="Search products..."></input>

                    </div>

                    {/* Icons in the right side */}

                    <div className='flex items-center gap-7'>

                        <div className='relative flex justify-center'>

                            {
                                user?._id && (
                                    <div onClick={() => setMenuDisplay(!menuDisplay)} className='text-blue-500 text-2xl cursor-pointer flex justify-evenly items-center w-20'>

                                        <i class="fa-solid fa-circle-user"></i>

                                        {
                                            user?.name ? (<h1 className='text-sm'> {user.name} </h1>) : (null)
                                        }

                                    </div>
                                )
                            }



                            {/* Admin Pannel */}

                            {
                                menuDisplay && (

                                    <div className='hidden md:block text-center absolute bg-white bottom-0 top-11 h-fit p-2 shadow-md rounded-md'>
                                        <nav>

                                            {
                                                user?.role === ROLE.ADMIN && (
                                                    <Link to={"/admin-panel/all-products"} className='whitespace-nowrap hover:bg-blue-300 p-2 hover:rounded-md' onClick={() => setMenuDisplay(!menuDisplay)} >Admin Panel</Link>
                                                )
                                            }


                                        </nav>
                                    </div>

                                )
                            }




                        </div>

                        {
                            user?._id && (
                                <Link to={"/cart"} className='text-blue-500 text-2xl cursor-pointer w-8 relative'>

                                    <div className='bg-red-600 text-white text-xs w-4 rounded-full text-center absolute right-0' >{context?.cartProductCount}</div>
                                    <i class="fa-solid fa-cart-plus"></i>

                                </Link>
                            )
                        }

                        {/* <div className='text-blue-500 text-2xl cursor-pointer w-8 relative'>

                            <div className='bg-red-600 text-white text-xs w-4 rounded-full text-center absolute right-0' >{context?.cartProductCount}</div>
                            <i class="fa-solid fa-cart-plus"></i>

                        </div> */}

                        <div>

                            {
                                user?._id ? (
                                    <button onClick={handleLogout} className='outline outline-yellow-500 hover:bg-red-600 hover:outline-none hover:text-white p-1 px-3 rounded-full w-18' >Logout</button>
                                ) :

                                    (<Link to={'/login'} className='bg-yellow-500 hover:bg-green-600 hover:text-white p-1 px-3 rounded-full w-16'>Login</Link>)

                            }



                        </div>

                    </div>

                </div>

            </div>

        </>
    )
}

export default Header