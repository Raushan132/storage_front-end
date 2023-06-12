import axios from "axios"
import { baseUrl, getCookie } from "../redux/fetch/baseUrl"


export const postCreateFolder = async (userId,folderName,parentFolderId)=>{

    const data ={
        userId,
        folderName,
        parentFolderId
    }
    
    return await axios.post(`${baseUrl}/createFolder`,data,{
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


export const uploadFiles = async(formData)=>{

  await axios.post(`${baseUrl}/addFiles`,formData,{
    headers: {
        'Content-Type': 'application/json',
        'Authorization': getCookie()
      }
  }).then(res=>{
    console.log(res.data)
  })

}