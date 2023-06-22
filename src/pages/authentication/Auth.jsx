import { useEffect, useState } from "react"
import Login from "./Login"
import Signup from "./Signup"
import {  useSearchParams } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import "react-toastify/ReactToastify.min.css";


const Auth = () => {

  const [login, setLogin] = useState(true)
  const [searchParams, setSearchParams] = useSearchParams();
  
  useEffect(()=>{

    if(searchParams.get('logout') !==null)  toast("Logout successfully !");
  },[])

  return (
    <>
      <div className="w-full flex justify-center items-center h-screen">
        <div className=" bg-base-200 ">

          <div className="tabs  w-96 bg-base-300 flex justify-around">
            <div className={`tab tab-bordered ${login ? 'tab-active' : ''}`} onClick={() => setLogin(true)}>Login</div>
            <div className={`tab tab-bordered ${login ? '' : 'tab-active'}`} onClick={() => setLogin(false)}>Sign Up</div>
          </div>

          <div>
            {login ? <Login /> : <Signup />}
          </div>

        </div>

       
        

      </div>
      <div className="absolute">

      <ToastContainer
          position="top-center"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="dark"
          />
          </div>
    </>
  )
}

export default Auth