import React from 'react'

const Signup = () => {
    return (
        <div className='flex flex-col justify-center gap-1 py-4 px-2'>
            <form>
                <div className='flex flex-col gap-5 py-5 items-center'>

                    <div>
                        <input type="email" className="w-64 px-2"  placeholder='Email' />
                    </div>
                    <div>
                        <input type="password" className="w-64 px-2" placeholder='Password' />
                    </div>
                    <div>
                        <input type="password" className="w-64 px-2" placeholder='Confirm Password' />
                    </div>
                    <div>
                        <input type="text" className="w-64 px-2" placeholder='Mobile Number' />
                    </div>
                    <div className='flex gap-5'>
                        <input type="reset" className='btn' value="Reset" />
                        <button className='btn btn-primary '>Sign up</button>
                    </div>
                </div>
            </form>

        </div>
    )
}

export default Signup