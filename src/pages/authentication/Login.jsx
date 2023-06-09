import axios from 'axios'
import React, { useRef } from 'react'
import { useNavigate } from 'react-router-dom'


const Login = () => {

   
    const email= useRef()
    const password= useRef()
    const navigate = useNavigate();


   const handleSubmit = (e)=>{
          e.preventDefault();
          
          const formData= {
            username:email.current.value,
            password:password.current.value
          }
          console.log(formData)
          axios.post("http://localhost:8081/signIn",formData,{auth:{username:formData.username,password:formData.password}})
          .then(res=> {
            document.cookie=  `token=${res.headers.getAuthorization()}; expires=${res.headers?.expires};`
            localStorage.setItem("userId",res.data.userId)
            navigate("/user/drive")
            
        })
          .catch(e=> console.log(e))

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
                <div className='btn btn-outline btn-success'>Login as Guest</div>
            </div>

        </>
    )
}

export default Login