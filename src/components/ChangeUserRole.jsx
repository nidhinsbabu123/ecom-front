import React, { useState } from 'react'
import ROLE from '../../services/role'
import SummaryApi from '../../services/LoginServ'
import { toast } from 'react-toastify'

function ChangeUserRole({name, email, role, onClose, userId, callFunc}) {

    const[userRole, setUserRole] = useState("")

    const handleOnChangeSelect = (e) => {
        setUserRole(e.target.value)
        console.log(e.target.value);
    }

    const updateUserRole = async () => {
        const fetchResponse = await fetch(SummaryApi.updateUser.url,{
            method : SummaryApi.updateUser.method,
            credentials : 'include',
            headers : {
                "content-type" : "application/json"
            },
            body : JSON.stringify({
                userId : userId,
                role : userRole
            })
        })

        const responseData = await fetchResponse.json()

        if(responseData.success){
            toast.success(responseData.message)
            onClose()
            callFunc()
        }

        console.log("Role Updated : ", responseData);
    }

    return (
        <>

            <div className='fixed top-0 bottom-0 left-0 right-0 w-full h-full z-10 flex justify-center items-center bg-black bg-opacity-40'>
                <div className='bg-white shadow-lg p-4 w-full max-w-sm'>

                    <button className='block ml-auto' onClick={onClose} >
                    <i class="fa-solid fa-xmark hover:text-red-600 text-lg hover:text-xl transition-all"></i>
                    </button>

                    <h1 className='pb-4 text-lg font-medium'>Change User Role ?</h1>
                    <p>Name : {name}</p>
                    <p>Email : {email}</p>
                    <div className='flex items-center justify-between my-4'>
                        <p>Role :</p>
                        <select className='border px-4 py-1' value={userRole} onChange={handleOnChangeSelect}>
                            {
                                Object.values(ROLE).map(el => {
                                    return (
                                        <option value={el} key={el} >{el}</option>
                                    )
                                })
                            }

                        </select>
                    </div>

                    <button onClick={updateUserRole} className='w-fit mx-auto block outline outline-blue-400 py-1 px-3 rounded-md hover:outline-none hover:bg-blue-500 hover:text-white shadow-md'>Save Changes</button>

                </div>
            </div>

        </>
    )
}

export default ChangeUserRole