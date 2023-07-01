import React, { useState } from 'react'
import { AiFillFile, AiFillFolder } from 'react-icons/ai'
import { BsShareFill, BsThreeDotsVertical } from 'react-icons/bs'
import { getUserId } from '../../redux/fetch/baseUrl'
import { reRender } from '../../redux/render/renderAction'
import { getDownloadFile, removeSharedUser } from '../../util/Util'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { fetchFileOrFolderDetail } from '../../redux/fetch/file/fileActions'
import { viewDetailOpen } from '../../redux/view_details/detailsActions'

import { Icon } from "@fluentui/react/lib/Icon";
import { getFileTypeIconProps } from "@fluentui/react-file-type-icons";
import { initializeFileTypeIcons } from "@fluentui/react-file-type-icons";

initializeFileTypeIcons();

const SharedGridView = ({folders,files}) => {
   
    const {render} = useSelector(state=> state.isRender)
    const [position,setPosition] = useState(0)
    const dispatch = useDispatch()
    const navigate = useNavigate()
  

    const handleOpenFolder =(fileId)=>{    
        navigate(`/user/drive/${fileId}`)
       }

    const handleViewData = (fileId) =>{
        dispatch(fetchFileOrFolderDetail(fileId))
   }
       
    const userId= getUserId()
    const handleRemove = (fileId)=>{
        
        removeSharedUser(fileId,userId).then(()=>{
           dispatch(reRender(render))
        })
    }
     
    const handlePosition = (e) =>{
        const observer = new IntersectionObserver(entries=>{
         const {x,y}=entries[0].boundingClientRect
         setPosition(prev=>Math.floor(y*100/window.innerHeight))
         console.log(position)
        })
      
        
        observer.observe(e.target)
        console.log(window.innerHeight)
   
 
     }
     
     const dropMenuClick = () => {
         const elem = document.activeElement;
         if(elem){
           elem?.blur();
         }
       };
 



 console.log(folders,files)
    if (folders.length == 0 && files.length == 0) {

        return (
            <>
                
                <div className='absolute flex flex-col justify-center items-center left-[60%] top-[60%] -translate-x-1/2 -translate-y-1/2'>

                    <div className='text-[12em] text-blue-300'><BsShareFill /></div>
                    <div>No Item</div>
                    <div>Files and Folders others have shared with you</div>

                </div>
            </>

        );
    }
  return (
    <>

<div className=' overflow-x-hidden h-[550px] overflow-y-auto'>
           { folders.length>0 &&  <div>
                <div className='text-2xl my-6'>Folders</div>
                <div className='flex flex-wrap  gap-6'>
                    {folders.map(({file}) => {
                        return (
                            <div className='text-lg flex items-center select-none  w-48 rounded-lg px-4 py-2 justify-between bg-base-300 cursor-default'
                             onDoubleClick={()=>handleOpenFolder(file.fileId)} key={file.fileId}
                             onClick={()=>{handleViewData(file.fileId)}}
                             
                             >
                                <div className='flex justify-center gap-2 items-center'>
                                    <div className='text-xl'><AiFillFolder /></div>
                                    <div className={`flex w-28 ${file.fileName?.length>12?'tooltip':''} `} data-tip={file?.fileName}>
                                    {file?.fileName?.length>12?file?.fileName?.substring(0, 10)+'...':file?.fileName}
                                    </div>
                                </div>
                                <div className={`dropdown ${position>52?'dropdown-top':'dropdown-bottom'}   w-full flex justify-end `} >
                                    <label tabIndex={0} onClick={handlePosition}  className=" cursor-pointer" ><BsThreeDotsVertical /></label>
                                    <ul tabIndex={0}  className="dropdown-content menu px-2  shadow bg-base-200 rounded-box w-52 translate-x-20 ">
                                       
                                        
                                        <li onClick={dropMenuClick} ><div onClick={()=>{dispatch(viewDetailOpen())}}>View details</div></li>
                                        <li onClick={dropMenuClick}><div onClick={()=>{handleRemove(file.fileId)}}>Remove</div></li>
                                    </ul>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>}

           {  files.length>0 &&  <div>
                <div className='text-2xl my-6'>Files</div>
                <div className='flex flex-wrap  gap-6'>
                    {files?.map(({file,owner}) => {
                        return (
                            <div className='text-md flex items-center select-none w-48 rounded-lg px-4 py-2 justify-between bg-base-300 cursor-default '
                             key={file?.fileId}
                             onClick={()=>{handleViewData(file.fileId)}}
                             >
                                <div className='flex justify-center gap-2 items-center'>
                                <Icon {...getFileTypeIconProps({ extension: file?.extension, size: 24 })} />
                                    <div className={`flex w-28  ${file.fileName?.length>12?'tooltip':''}`} data-tip={file?.fileName}>
                                        {file?.fileName?.length>12?file?.fileName?.substring(0, 10)+'...':file?.fileName}
                                        
                                    </div>
                                </div>
                                <div className={`dropdown ${position>52?'dropdown-top':'dropdown-bottom'}   w-full flex justify-end `} >
                                    <label tabIndex={0} onClick={handlePosition}  className=" cursor-pointer" ><BsThreeDotsVertical /></label>
                                    <ul tabIndex={0}  className="dropdown-content menu px-2  shadow bg-base-200 rounded-box w-52 translate-x-20 ">
                                       
                                      
                                        
                                        <li onClick={dropMenuClick}><div onClick={()=>{dispatch(viewDetailOpen())}}>View details</div></li>
                                        <li onClick={dropMenuClick}><div onClick={()=>{getDownloadFile(file.fileId)}}>Download</div></li>
                                        
                                        <li onClick={dropMenuClick}><div onClick={()=>{handleRemove(file.fileId)}}>Remove</div></li>
                                    </ul>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
            } 
        </div>

           
            
    </>
  )
}

export default SharedGridView