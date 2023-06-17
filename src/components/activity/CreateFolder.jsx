import { useDispatch, useSelector } from "react-redux"
import { createFolderNotVisible } from "../../redux/create_Folder/createFolderAction";
import { postCreateFolder } from "../../util/Util";
import { useRef } from "react";
import { getUserId } from "../../redux/fetch/baseUrl";
import { useLocation } from "react-router-dom";
import { reRender } from "../../redux/render/renderAction";



const CreateFolder = () => {

    const {render} = useSelector(state=> state.isRender)
    const isVisible= useSelector(state=> state?.isCreateFolderVisible)
    const {pathname} = useLocation();
    console.log()
    const dispatch = useDispatch();
    const handleCancelBtn = ()=>{
        dispatch(createFolderNotVisible());
    }

    const folderName = useRef('')
    const userId = getUserId()
    const handleCreateBtn =()=>{
      const newFolderName = folderName.current.value;
      if(newFolderName !== ''){
          if(pathname.match('/user/drive')!==null  && pathname.match('/user/drive')?.input.split("/").length===4){
            
            const parentFolderId= pathname.match('/user/drive')?.input.split("/")[3]
            return postCreateFolder(userId,newFolderName,parentFolderId).then(res=> {
              handleCancelBtn();
              dispatch(reRender(render))
            });
          }
          postCreateFolder(userId,newFolderName,userId).then(res=>{ handleCancelBtn(); dispatch(reRender(render))})
      }       

    }
   

  return (
    <div className='flex flex-col gap-4 z-30 fixed left-1/2 top-1/2 border-2 bg-base-100 px-4 py-4 w-96 -translate-x-1/2 -translate-y-1/2 shadow-xl'>
       <div>
            <label htmlFor='createFolder'>New Folder</label>
       </div>
       <div >
           <input type="text" ref={folderName} placeholder="Folder Name" className="input input-bordered input-info w-full max-w-xs" />
       </div>
       <div className='flex gap-5 justify-end'>
            <button className="btn" onClick={handleCancelBtn}>Cancel</button>
            <button className="btn btn-success" onClick={handleCreateBtn}>Create</button>
       </div>

    </div>
  )
}

export default CreateFolder