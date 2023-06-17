import { useDispatch, useSelector } from "react-redux"
import { createFolderNotVisible } from "../../redux/create_Folder/createFolderAction";
import { getRenameFolder, postCreateFolder } from "../../util/Util";
import { useRef } from "react";
import { getUserId } from "../../redux/fetch/baseUrl";
import { renameVisible } from "../../redux/rename_folder/renameAction";
import { reRender } from "../../redux/render/renderAction";



const RenameFile = () => {

    const {render} = useSelector(state=> state.isRender)
    const isVisible= useSelector(state=> state?.renameVisibleReduce)
    const {file} = useSelector(state=> state.singleFileReducer)
    const dispatch = useDispatch();
   
    

    
    const handleCancelBtn = ()=>{
        dispatch(renameVisible(false))
    }

    const folderName = useRef('')
    const userId = getUserId()
    const handleCreateBtn =()=>{
      const newfileName = folderName.current.value;
      
      if(newfileName !== file.fileName && newfileName!==''){
        const formData = new FormData()
        formData.append('newFileName',newfileName)
        formData.append('fileId',file.fileId)
        getRenameFolder(formData)
        dispatch(renameVisible(false))
        dispatch(reRender(render))
        
      }
        
             

    }
   

  return (
    <>
    <div className='flex flex-col gap-4 z-[999] fixed left-1/2 top-1/2 border-2 bg-base-100 px-4 py-4 w-96 -translate-x-1/2 -translate-y-1/2 shadow-xl'>
       <div>
            <label htmlFor='createFolder'>Rename</label>
       </div>
       <div >
           <input type="text" ref={folderName} placeholder="File Name" defaultValue={file.fileName} className="input input-bordered input-info w-full max-w-xs" />
       </div>
       <div className='flex gap-5 justify-end'>
            <button className="btn" onClick={handleCancelBtn}>Cancel</button>
            <button className="btn btn-success" onClick={handleCreateBtn}>Rename</button>
       </div>

    </div>
    <div className="fixed opacity-50 z-[990] bg-black w-full h-screen" onClick={handleCancelBtn}></div>
    </>
  )
}

export default RenameFile