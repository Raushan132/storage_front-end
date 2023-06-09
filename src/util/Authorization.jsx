import { useEffect } from "react";
import { useNavigate } from "react-router-dom"

const Authorization =()=>{

    const navigate = useNavigate();
    useEffect(()=>{

        if(document.cookie==""){

            navigate("/auth",{replace:true})
        }
        

     
    },[]);

}

export default Authorization