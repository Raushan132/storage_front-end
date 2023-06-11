import axios from "axios";
import { baseUrl,getCookie, getUserId } from "../baseUrl";


export const sendMessage= (msg)=>{
   
    axios.post(`${baseUrl}/msg`,msg,{
        headers:{
          "Authorization": getCookie()
        }
      }).then(res=>{
        console.log(res.data)
      })
}

export const getSentMessage = async()=>{

  
const res = await axios.get(`${baseUrl}/msg/sent`,{
    headers:{
      "Authorization": getCookie()
    }
  })
  

  return res

}

export const getInboxMessage = async()=>{


  const res = await axios.get(`${baseUrl}/msg/received`,{
         headers:{
        "Authorization": getCookie()
      }
    })
    
  
    return res
  
  }