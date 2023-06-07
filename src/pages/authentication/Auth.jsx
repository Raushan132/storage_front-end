import { useState } from "react"
import Login from "./Login"
import Signup from "./Signup"


const Auth = () => {

  const [login, setLogin] = useState(true)

  return (
    <>
      <div className="w-full flex justify-center items-center h-screen">
        <div className=" bg-base-200 ">

          <div className="tabs  w-96 bg-base-300 flex justify-around">
            <div className={`tab tab-bordered ${login ? 'tab-active' : ''}`} onClick={() => setLogin(true)}>Login</div>
            <div className={`tab tab-bordered ${login ? '' : 'tab-active'}`} onClick={() => setLogin(false)}>Sign Up</div>
          </div>

          <div>
            { login? <Login /> : <Signup />}
          </div>

        </div>
      </div>
    </>
  )
}

export default Auth