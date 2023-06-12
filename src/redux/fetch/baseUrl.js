import { useAuthUser } from "react-auth-kit";

export const baseUrl ='http://localhost:8081'

export const getCookie = (key='_auth=')=>{
    const cookies= document.cookie
    
    if(cookies!=''){
     
     const  token = cookies.split(';').find((row) =>row.substring(1,7)===key)?.split('=')[1];
     
        
       return token
    }
}

export const getUserId= ()=>{
  const userState = useAuthUser()
  const {userId} = userState()
  return  userId
}