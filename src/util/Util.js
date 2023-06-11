import axios from "axios"
import { baseUrl, getCookie } from "../redux/fetch/baseUrl"


export const postCreateFolder = (userId,folderName,parentFolderId)=>{

    const data ={
        userId,
        folderName,
        parentFolderId
    }
    
    return axios.post(`${baseUrl}/addFolder`,data,{
        headers: {
        'Content-Type': 'application/json',
        'Authorization': getCookie()
      }}).then(res=>{
        console.log(res.data)
        return true
      }).catch(err=>{
         console.log(err)
         return false
      })

      

}