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


export const uploadFiles = (sendingFiles,userId,parentFolderId)=>{
   const formData = new FormData();
   formData.append("userId",userId)
   formData.append("parentFolderId",parentFolderId)
   
   sendingFiles.map(({allFiles,folderName}) => {
     console.log(allFiles)
     
     formData.set("files",allFiles)
        
        if(folderName===''){
          formData.delete('folderName')
          axios.post(`${baseUrl}/addFiles`,formData,{
            headers: {
                'Content-Type': 'multipart/form-data',
                'Authorization': getCookie()
              }
          }).then(res=>{
            console.log(res.data)
          })

        }else{
          formData.set('folderName',folderName)
          axios.post(`${baseUrl}/addFolder`,formData,{
            headers: {
                'Content-Type': 'multipart/form-data',
                'Authorization': getCookie()
              }
          }).then(res=>{
            console.log(res.data)
          })

        }

  });
  

}