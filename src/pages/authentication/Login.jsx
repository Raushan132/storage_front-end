import React from 'react'

const Login = () => {
    return (
        <>
            <div className='flex flex-col justify-center gap-1 py-4 px-2'>

                <form>
                    <div className='flex flex-col gap-5 py-5 items-center'>

                        <div>
                            <input type="text" className="w-64 px-2" placeholder='Email' />
                        </div>
                        <div>
                            <input type="password" className="w-64 px-2" placeholder='Password' />
                        </div>
                        <div className='flex gap-5'>
                            <input type="reset" className='btn' value="Reset" />
                            <button className='btn btn-primary'>Login</button>
                        </div>
                    </div>
                </form>

                <div className='flex items-center justify-center pb-2'> --- or --- </div>
                <div className='btn btn-outline btn-success'>Login as Guest</div>
            </div>

        </>
    )
}

export default Login