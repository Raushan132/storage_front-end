import axios from 'axios'
import React, { useEffect, useRef } from 'react'
import { useIsAuthenticated, useSignIn } from 'react-auth-kit'
import { useNavigate } from 'react-router-dom'
import { baseUrl } from '../../redux/fetch/baseUrl'


const Login = () => {


    const navigate = useNavigate();
    const isAuthenticated = useIsAuthenticated()


    isAuthenticated() && navigate("/user/drive")




    const signIn = useSignIn()
    const email = useRef()
    const password = useRef()

    const handleGuestLogin = ()=>{
         const formData ={
            username: 'guest@test.com',
            password:'guest'
         }

         axios.post(`${baseUrl}/signIn`, formData, { auth: { username: formData.username, password: formData.password } })
            .then(res => {
                const now = new Date(Number(res.headers?.expires));
                             
                signIn({
                    token: res.headers.getAuthorization(),
                    expiresIn: 600000,
                    tokenType: "String",
                    authState: { userId: res.data.userId }
                })
               
                navigate("/user/drive")

            })
            .catch(e => console.log(e))



    }

    const handleSubmit = (e) => {
        e.preventDefault();

        const formData = {
            username: email.current.value,
            password: password.current.value
        }
        
        axios.post(`${baseUrl}/signIn`, formData, { auth: { username: formData.username, password: formData.password } })
            .then(res => {
                const now = new Date(Number(res.headers?.expires));
                             
                signIn({
                    token: res.headers.getAuthorization(),
                    expiresIn: 600000,
                    tokenType: "String",
                    authState: { userId: res.data.userId }
                })
               
                navigate("/user/drive")

            })
            .catch(e => console.log(e))

    }

    return (
        <>
            <div className='flex flex-col justify-center gap-1 py-4 px-2'>

                <form onSubmit={handleSubmit}>
                    <div className='flex flex-col gap-5 py-5 items-center'>

                        <div>
                            <input type="email" ref={email} className="w-64 px-2" placeholder='Email' />
                        </div>
                        <div>
                            <input type="password" ref={password} className="w-64 px-2" placeholder='Password' />
                        </div>
                        <div className='flex gap-5'>
                            <input type="reset" className='btn' value="Reset" />
                            <button type='submit' className='btn btn-primary'>Login</button>
                        </div>
                    </div>
                </form>

                <div className='flex items-center justify-center pb-2'> --- or --- </div>
                <div className='btn btn-outline btn-success' onClick={handleGuestLogin}>Login as Guest</div>
            </div>

           

        </>
    )
}

export default Login