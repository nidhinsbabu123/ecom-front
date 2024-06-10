import React, { useContext, useState } from 'react'
import './Login.css'
import { Link, useNavigate } from 'react-router-dom'
import { loginuser } from '../../services/allApi'
import { toast } from 'react-toastify'
import SummaryApi from '../../services/LoginServ'
import Context from '../context'

function Login() {

  const [showPassword, setShowPassword] = useState(false)

  const [data, setData] = useState({
    email: "",
    password: ""
  })

  const navigate = useNavigate()

  const { fetchUserDetails, fetchUserAddToCart } = useContext(Context)

  const handleOnChange = (e) => {
    const { name, value } = e.target

    setData({ ...data, [name]: value })

    // setData((item) => {
    //   return {
    //     ...item,
    //     [name]: value
    //   }
    // })
  }

  // console.log('Data login : ', data);

  const handleSubmit = async (e) => {
    e.preventDefault()

    const dataResponse = await fetch(SummaryApi.signIn.url, {
      method: SummaryApi.signIn.method,
      // for cookies
      credentials : 'include',
      headers: {
        "content-type" : "application/json"
      },
      body : JSON.stringify(data)
    })

    const dataApi = await dataResponse.json()

    if (dataApi.success) {
      toast.success(dataApi.message)
      
      navigate('/')

      fetchUserDetails()

      fetchUserAddToCart()

    }

    if (dataApi.error) {
      toast.error(dataApi.message)
    }

    // const { email, password } = data

    // if (!email || !password) {
    //   alert("Please fill all attributes");
    // } else {

    //   // verify the password matches

    //   const databody = new FormData()
    //   databody.append("email", email)
    //   databody.append("password", password)

    //   // creating 'header' for the API Call-----here 'headers' is our header
    //   const headers = {
    //     "content-type": "application/json"
    //   }

    //   // API Call
    //   const response = await loginuser(databody, headers)
    //   console.log('response : ', response);



    //   // const dataApi = await response.json()

    //   if (response.data.success) {
    //     toast.success(response.data.message)
    //     navigate('/')
    //   }

    //   if (response.data.error) {
    //     toast.error(response.data.message)
    //   }



    // }





  }



  return (
    <>

      <div className='mx-auto container p-4'>

        <div className='bg-white p-2 w-full max-w-md mx-auto'>

          <div className='wrappp flex items-center justify-center'>

            <div className='boxx relative w-[480px] h-[490px] flex items-center justify-center rounded-md'>

              <div className='contentt relative w-[180%] h-[100%] flex items-center justify-center'>

                <form onSubmit={handleSubmit} className='flex flex-col items-center justify-center'>

                  <div className='logo-wrapp w-[70px] h-[70px] bg-white'>

                    <i class="fa-solid fa-key"></i>

                  </div>

                  <h1 className='welcome-line'>Welcome !</h1>

                  {/* Email */}

                  <div className='input-boxx'>

                    <input name='email' value={data.email} onChange={handleOnChange} type="text" required='true' />

                    <i class="fa-solid fa-envelope"></i>

                    <span>Email</span>

                  </div>

                  {/* Password */}

                  <div className='input-boxx'>

                    <input name='password' value={data.password} onChange={handleOnChange} type={showPassword ? "text" : "password"} required='true' />

                    <i class="fa-solid fa-lock"></i>


                    <span>Password</span>

                  </div>

                  <div className='flex justify-between items-center w-full mb-4'>

                    <div onClick={() => setShowPassword(!showPassword)}>

                      {
                        showPassword ? (<i class="cursor-pointer fa-solid fa-eye"></i>) : (<i class="cursor-pointer text-blue-400 fa-solid fa-eye-slash"></i>)
                      }

                    </div>

                    <div onClick={() => setShowPassword(!showPassword)}>

                      {
                        showPassword ? (<span className='cursor-pointer'>Shown</span>) : (<span className='cursor-pointer text-blue-400'>Hidden</span>)
                      }



                    </div>




                  </div>

                  <div className='linkss w-[100%] flex justify-between'>

                    <Link to={'/forgot-password'} className='text-white hover:underline'>Forgot Password ?</Link>
                    <Link to={'/register'} className='text-white hover:underline hover:text-neon-blue'>Sign-Up</Link>

                  </div>

                  <div className='input-boxx'>

                    <input type="submit" value="Login" />

                  </div>



                </form>

              </div>

            </div>

          </div>

        </div>

      </div>

    </>
  )
}


export default Login