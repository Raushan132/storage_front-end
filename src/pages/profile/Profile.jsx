import React, { useEffect } from 'react'
import profileImg from '../../assets/profile.png'
import {AiFillCamera} from 'react-icons/ai'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { fetchUsers } from '../../redux/fetch/fetch_user/userActions'

const Profile = () => {

  const users= useSelector(state=> state.userReducer)
  const dispatch= useDispatch()
  const userData = users.user

  useEffect(()=>{
        dispatch(fetchUsers());
  },[]);


  return (
    <>
     
      <div className='grid md:grid-cols-2 overflow-x-hidden overflow-y-auto h-full'>
       
        <div className='justify-self-center'>
            <div className='w-[300px] h-[300px] rounded-full bg-blue-700  overflow-hidden flex justify-center items-center'>
                <img className='w-full h-full ' draggable='false'  src={`${userData?.imgUrl || profileImg}`} alt="profile img" />
             </div>
             <label htmlFor='profile_Pic' className='text-3xl relative left-48 -top-10 w-14 h-14 flex justify-center items-center rounded-full bg-base-200 cursor-pointer'>
                <AiFillCamera />
                <input type="file" className='hidden' id="profile_Pic" />
             </label>
        </div>
        

        <div className='w-96'>

          <div className='flex flex-col mb-10 gap-3 px-4'>
            <div className='text-3xl font-bold'> {userData.fullName} </div>
            <div> <span>Email:</span>     <span>{userData.email}</span></div>
            <div> <span>Mob:</span> <span>8932145123</span> </div>
          </div>
          <div className=' text-xl text-slate-400'>More Info</div>
          <hr />
          <div className='grid grid-cols-2 my-5 gap-5 px-4'>
            <div> <span>DOB:</span>     <span>{userData?.dob}</span></div>
            <div> <span>Gender:</span>     <span>{userData?.gender}</span></div>
            <div> <span>State:</span>     <span>Bihar</span></div>
            <div> <span>City:</span>     <span>Patna</span></div>
            <div> <span>Country:</span>     <span>India</span></div>
            <div> <span>Pincode:</span> <span>800014</span> </div>
          </div>

        </div>


      </div>

       <div className=" flex flex-col  items-end px-64 py-8 "><Link to="/user/editProfile" className='btn'>Edit</Link></div>
    </>
  )
}

export default Profile