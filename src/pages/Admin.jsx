import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { Link, Outlet, useNavigate } from 'react-router-dom'
import AllUsers from './AllUsers'
import AllProducts from './AllProducts'
import ROLE from '../../services/role'


function Admin() {

  const user = useSelector(state => state?.user?.user)

  const navigate = useNavigate()

  useEffect(() => {
    if(user?.role !== ROLE.ADMIN){
      navigate("/")
    }
  }, [user])
  

  return (
    <>

      <div className='min-h-[calc(100vh-120px)] md:flex hidden'>

        <aside className='bg-white min-h-full w-full max-w-60 shadow-sm'>

          <div className='flex justify-center items-center'>

            <div className='text-blue-500 text-4xl p-1 h-16 cursor-pointer relative flex justify-evenly items-center w-32 mt-4 shadow-lg'>

              <i class="fa-solid fa-circle-user"></i>

              {
                user?.name ? (<h1 className='text-lg font-semibold text-center capitalize'> {user.name} </h1>) : ( <h1 className='text-lg font-semibold text-center'>User</h1> )
              }

            </div>

          </div>

          <p className='text-center mt-4'> Role : {user.role} </p>

          {/* Navigation */}

          <div>

            <nav className='grid p-4'>
              <Link to={"all-users"} className='hover:bg-blue-100 w-full px-2 py-1' >All Users</Link>
              <Link to={"all-products"} className='hover:bg-blue-100 w-full px-2 py-1' >All-Products</Link>
            </nav>

          </div>

        </aside>

        <main className='w-full h-full p-4'>
          <Outlet>
            <AllUsers/>
            <AllProducts/>
          </Outlet>
        </main>

      </div>



    </>
  )
}

export default Admin