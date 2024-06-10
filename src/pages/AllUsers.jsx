import React, { useEffect, useState } from 'react'
import SummaryApi from '../../services/LoginServ'
import { toast } from 'react-toastify'
import moment from 'moment'
import ChangeUserRole from '../components/ChangeUserRole'

function AllUsers() {

  const [allUser, setAllUser] = useState([])

  const [openUpdateRole, setOpenUpdateRole] = useState(false)

  const [updateUserDetails, setUpdateUserDetails] = useState({
    email: "",
    name: "",
    role: "",
    _Id : ""
  })

  const fetchAllUsers = async () => {
    const fetchData = await fetch(SummaryApi.allUser.url, {
      method: SummaryApi.allUser.method,
      credentials: 'include'
    })

    const dataResponse = await fetchData.json()



    if (dataResponse.success) {



      setAllUser(dataResponse.data)
    }

    // console.log("Data response : ", dataResponse.data);



    if (dataResponse.error) {
      toast.error(dataResponse.message)
    }

    console.log("dataResponse = ", dataResponse);

  }



  useEffect(() => {
    fetchAllUsers()
  }, [])

  return (
    <>

      <div>

        <table className='w-full'>
          <thead>

            <tr>

              <th>S.No</th>
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
              <th>Date Created</th>
              <th>Action</th>

            </tr>


          </thead>
          <tbody>

            {
              allUser.map((el, index) => {
                return (
                  <tr>
                    <td>{index + 1}</td>
                    <td>{el?.name}</td>
                    <td>{el?.email}</td>
                    <td>{el?.role}</td>
                    <td>{moment(el?.createdAt).format('LL')}</td>
                    <td>
                      <button onClick={() =>{ 
                        setUpdateUserDetails(el)
                        setOpenUpdateRole(true)}} className='bg-gray-200 p-1 hover:bg-green-300 w-8 h-8 rounded-full' > <i class="fa-solid fa-pencil"></i> </button>
                    </td>
                  </tr>
                )
              })
            }

          </tbody>
        </table>

        {
          openUpdateRole &&
          (
            <ChangeUserRole onClose={() => setOpenUpdateRole(false)}
              name={updateUserDetails.name}
              email={updateUserDetails.email}
              role={updateUserDetails.role}
              userId={updateUserDetails._id}
              callFunc={fetchAllUsers}
            />
          )
        }



      </div>

    </>
  )
}

export default AllUsers