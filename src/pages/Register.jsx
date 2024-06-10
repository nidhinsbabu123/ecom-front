import React, { useState } from 'react'
import './Register.css'
import { Link, useNavigate } from 'react-router-dom'
import { addUser } from '../../services/allApi'
import { toast } from 'react-toastify'





function Register() {

  const [showPassword, setShowPassword] = useState(false)

  const [showConfirmPassword, setShowConfirmPassword] = useState(false)

  const navigate = useNavigate()

  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: ""
  })

  const handleOnChange = (e) => {
    const { name, value } = e.target

    setData({ ...data, [name]: value })

    // setData((item) => {
    //   return{
    //     ...item,
    //     [name] : value
    //   }
    // })
  }

  // console.log('Data login : ', data);

  const handleSubmit = async (e) => {
    e.preventDefault()

    const { name, email, password, confirmPassword } = data

    if (!name || !email || !password || !confirmPassword) {
      alert("Please fill all attributes")
    } else {

      if (data.password === data.confirmPassword) {

        // Create form data -- here databody is our 'body' for Api call

        const databody = new FormData()
        databody.append("name", name)
        databody.append("email", email)
        databody.append("password", password)
        databody.append("confirmPassword", confirmPassword)

        // creating 'header' for the API Call-----here 'headers' is our header
        const headers = {
          "content-type": "application/json"
        }

        // API Call
        const response = await addUser(databody, headers)
        // console.log('response : ', response);

        if(response.data.success){
          toast.success(response.data.message)

          navigate("/login")

        }

        if(response.data.error){
          toast.error(response.data.message)
        }

        // toast(response.data.message)
        // alert("User Added successfully")

      }else{
        alert("Password mismatch")
      }

    }

  }

  return (
    <>

      <div className='mx-auto container p-4'>

        <div className='bg-white p-2 w-full max-w-md mx-auto'>

          <div className='wrappp flex items-center justify-center'>

            <div className='boxx relative w-[480px] h-[600px] flex items-center justify-center rounded-md'>

              <div className='contentt relative w-[180%] h-[100%] flex items-center justify-center'>

                <form onSubmit={handleSubmit} className='flex flex-col items-center justify-center'>

                  <div className='logo-wrapp w-[70px] h-[70px] bg-white'>

                    {/* <i class="fa-solid fa-key"></i> */}
                    <i class="fa-solid fa-circle-user text-6xl"></i>

                  </div>

                  <h1 className='welcome-line'>Hello There !</h1>

                  {/* Name */}

                  <div className='input-boxx'>

                    <input name='name' value={data.name} onChange={handleOnChange} type="text" required='true' />

                    <i class="fa-solid fa-user"></i>

                    <span>Name</span>

                  </div>

                  {/* Email */}

                  <div className='input-boxx'>

                    <input name='email' value={data.email} onChange={handleOnChange} type="text" required='true' />

                    {/* <i class="fa-solid fa-user"></i> */}
                    <i class="fa-solid fa-envelope"></i>

                    <span>Email</span>

                  </div>

                  {/* Password */}

                  <div className='input-boxx'>

                    <input name='password' value={data.password} onChange={handleOnChange} type={showPassword ? "text" : "password"} required='true' />

                    <i class="fa-solid fa-lock"></i>


                    <span>Password</span>

                  </div>

                  {/* Hidden Shown Symbol - 1 */}

                  <div className='flex justify-between items-center w-full mb-2'>

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

                  {/* Confirm Password */}

                  <div className='input-boxx'>

                    <input name='confirmPassword' value={data.confirmPassword} onChange={handleOnChange} type={showConfirmPassword ? "text" : "password"} required='true' />

                    <i class="fa-solid fa-lock"></i>


                    <span>Confirm Password</span>

                  </div>

                  {/* Hidden Shown Symbol - 2 */}

                  <div className='flex justify-between items-center w-full mb-6'>

                    <div onClick={() => setShowConfirmPassword(!showConfirmPassword)}>

                      {
                        showConfirmPassword ? (<i class="cursor-pointer fa-solid fa-eye"></i>) : (<i class="cursor-pointer text-blue-400 fa-solid fa-eye-slash"></i>)
                      }

                    </div>

                    <div onClick={() => setShowConfirmPassword(!showConfirmPassword)}>

                      {
                        showConfirmPassword ? (<span className='cursor-pointer'>Shown</span>) : (<span className='cursor-pointer text-blue-400'>Hidden</span>)
                      }

                    </div>

                  </div>

                  <div className='linkss w-[100%] flex justify-between'>

                    <p className='text-white'>Already have an account ?</p>
                    <Link to={'/login'} className='text-white hover:underline hover:text-neon-blue'>Login Here</Link>

                  </div>

                  <div className='input-boxx'>

                    <input type="submit" value="Sign-Up" />

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

export default Register