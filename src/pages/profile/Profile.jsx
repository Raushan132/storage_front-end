import React from 'react'
import {AiFillCamera} from 'react-icons/ai'
import { Link } from 'react-router-dom'

const Profile = () => {
  return (
    <>
      <div className='grid md:grid-cols-2 overflow-x-hidden overflow-y-auto h-full'>
        <div className='justify-self-center'>
            <div className='w-[300px] h-[300px] rounded-full bg-blue-700  overflow-hidden flex justify-center items-center'>
                <img className='w-full h-full ' draggable='false'  src="https://media.istockphoto.com/id/1300972573/photo/pleasant-young-indian-woman-freelancer-consult-client-via-video-call.jpg?b=1&s=612x612&w=0&k=20&c=gApYcn6GubvJA-YoMO00KZAShv66MHEwrsAbcmaq_cQ=" alt="profile img" />
             </div>
             <label htmlFor='profile_Pic' className='text-3xl relative left-48 -top-10 w-14 h-14 flex justify-center items-center rounded-full bg-base-200 cursor-pointer'>
                <AiFillCamera />
                <input type="file" className='hidden' id="profile_Pic" />
             </label>
        </div>
        

        <div className='w-96'>

          <div className='flex flex-col mb-10 gap-3 px-4'>
            <div className='text-3xl font-bold'> Raja kumar </div>
            <div> <span>Email:</span>     <span>abc@gmail.com</span></div>
            <div> <span>Mob:</span> <span>8932145123</span> </div>
          </div>
          <div className=' text-xl text-slate-400'>More Info</div>
          <hr />
          <div className='grid grid-cols-2 my-5 gap-5 px-4'>
            <div> <span>DOB:</span>     <span>13/02/1999</span></div>
            <div> <span>Gender:</span>     <span>Male</span></div>
            <div> <span>State:</span>     <span>Bihar</span></div>
            <div> <span>City:</span>     <span>Patna</span></div>
            <div> <span>Country:</span>     <span>India</span></div>
            <div> <span>Pincode:</span> <span>800014</span> </div>
          </div>

        </div>


      </div>

       <div className=" flex flex-col  items-end px-64 py-8 "><Link to="/editProfile" className='btn'>Edit</Link></div>
    </>
  )
}

export default Profile