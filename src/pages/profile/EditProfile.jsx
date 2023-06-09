import React from 'react'
import { Link } from 'react-router-dom'

const EditProfile = () => {
    return (
        <>
            <from>
                <div className='flex flex-col gap-4 w-96 mx-16 my-16'>

                    <div className='flex gap-4 justify-between'>
                        <label>Name</label>
                        <input type="" className='' placeholder='' />
                    </div>
                    <div className='flex gap-4 justify-between'>
                        <label>Mob</label>
                        <input type="" className='' placeholder='' />
                    </div>
                    <div className='flex gap-4 justify-between'>
                        <label>DOB</label>
                        <input type="" className='' placeholder='' />
                    </div>
                    <div className='flex gap-4 justify-between'>
                        <label>Gender</label>
                        <input type="" className='' placeholder='' />
                    </div>
                    <div className='flex gap-4 justify-between'>
                        <label>State</label>
                        <input type="" className='' placeholder='' />
                    </div>
                    <div className='flex gap-4 justify-between'>
                        <label>City</label>
                        <input type="" className='' placeholder='' />
                    </div>
                    <div className='flex gap-4 justify-between'>
                        <label>Pincode</label>
                        <input type="" className='' placeholder='' />
                    </div>
                    <div className='flex gap-4 justify-between'>
                        <label>Country</label>
                        <input type="" className='' placeholder='' />
                    </div>
                </div>
                <div className='flex  gap-4 w-96 mx-16 justify-end'>
                    <Link to="/user/profile" className='btn'>Cancel</Link>
                    <span className='btn btn-primary'>Save</span>
                </div>
            </from>
        </>
    )
}

export default EditProfile