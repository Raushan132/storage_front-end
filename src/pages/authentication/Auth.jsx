import { useEffect, useState } from "react"
import Login from "./Login"
import Signup from "./Signup"
import { useSearchParams } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import "react-toastify/ReactToastify.min.css";


const Auth = () => {

  const [login, setLogin] = useState(true)
  const [searchParams, setSearchParams] = useSearchParams();
  const themeStore = localStorage.getItem("theme");
  const [theme, setTheme] = useState("dark")


  useEffect(() => {

    switch (themeStore) {
    case 'light':
    case 'cupcake':
    case 'wireframe':
    case 'aqua': setTheme("light"); break;
    case 'dark':
    case 'forest':
    case 'night':
      
     default: setTheme("dark");
   }

if (searchParams.get('logout') !== null) toast("Logout successfully !");

  }, [])

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
        autoClose={1000}
        hideProgressBar={true}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss={false}
        draggable
        pauseOnHover={false}
        theme={theme}
      />
    </div>
  </>
)
}

export default Auth