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

export const reverseStar = async (fileId)=>{
    
  
     axios.patch(`${baseUrl}/changeStateStarred`,{fileId:fileId},{
      headers: {
        'Content-Type': 'application/json',
        'Authorization': getCookie()
      }

     }).then(res=>{
      console.log(res.data);
     })
}

export const getRenameFolder = async(formData)=>{
  try{

    await axios.patch(`${baseUrl}/renameFile`,formData,{
      headers:{
        'Content-Type': 'form-data',
        'Authorization': getCookie()
      }
    }).then(res=>{
      console.log(res.data)
    })
  }catch(err){
    console.log("File not rename")
  }
    

}

export const getDownloadFile = async (fileId)=>{
   const res = await axios.get(`${baseUrl}/download/${fileId}`, {
    headers: {
      'Content-Type': 'form-data',
      'Authorization': getCookie()
    },
    responseType: 'blob'
  })
  const blob = new Blob([res.data], { type: res.headers.getContentType() })
  const link = document.createElement('a')
  link.href = window.URL.createObjectURL(blob)
  link.download = res.headers.filename
  link.click()
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

export const deleteFileAndFolder = async (fileId)=>{
   try{

     const   res = await axios.delete(`${baseUrl}/deleteFileOrFolder/${fileId}`,{
        headers: {
          'Content-Type': 'application/json',
          'Authorization': getCookie()
        }
       })

       console.log(res.data)
   }catch(error){
        console.log("error to remove file or folder")
   } 

    
}

export const restoreFileOrFolder = async(trashId) =>{
    try{
       const res=   await axios.post(`${baseUrl}/trash`,{trashId:trashId},{
            headers: {
              'Content-Type': 'application/json',
              'Authorization': getCookie()
            }
          })

          console.log(res.data)
    }catch(err){

    }
}

export const deleteFileAndFolderForvever = async (trashId)=>{
    
  try{

    const   res = await axios.delete(`${baseUrl}/trash/${trashId}`,{
       headers: {
         'Content-Type': 'application/json',
         'Authorization': getCookie()
       }
      })
  
      console.log(res.data)
  }catch(error){
    
  }

  
}

export const allDeleteFileAndFolderForever = async()=>{
     try{
        const res = await axios.delete(`${baseUrl}/trash/allDelete`,{
          headers: {
            'Content-Type': 'application/json',
            'Authorization': getCookie()
          }
        })

        console.log(res.data)

     }catch(error){
      console.log("error on all deleteFile and folder forever");
     }

}

