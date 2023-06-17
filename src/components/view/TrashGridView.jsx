import React, { useEffect, useRef, useState } from 'react'
import { AiFillFolder, AiFillFile, AiFillFolderOpen, AiOutlineStar, AiFillStar, AiOutlineDownload, AiFillEdit } from 'react-icons/ai'

import { BsThreeDotsVertical } from 'react-icons/bs'
import { deleteFileAndFolderFovever, restoreFileOrFolder } from '../../util/Util'
import { useDispatch, useSelector } from 'react-redux'
import { reRender } from '../../redux/render/renderAction'



const TrashGridView = ({ trashFiles }) => {
    
    const {render} = useSelector(state=>state.isRender)

    const [position,setPosition] = useState(0)
   
    const dispatch = useDispatch()
    

   const handleRestore =(trashId)=>{
        
        restoreFileOrFolder(trashId)
        dispatch(reRender(render))


   }

   const handleDeleteFoever = (trashId)=>{
        deleteFileAndFolderFovever(trashId)
        dispatch(reRender(render))
   }

   

   const handleViewData = (fileId) =>{
        // dispatch(fetchFileOrFolderDetail(fileId))
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

    if (trashFiles.filter(trashFile=> trashFile?.file?.folder).length == 0 && trashFiles.filter(trashFile=> !trashFile?.file?.folder).length == 0) {

        return (
            <>
                <div className='absolute flex flex-col justify-center items-center left-[60%] top-1/2 -translate-x-1/2 -translate-y-1/2'>

                    <div className='text-[12em] text-blue-300'><AiFillFolderOpen /></div>
                    <div>A Place To Save Your File Easly And Accesable</div>

                </div>
            </>

        );
    }

    return (
        <div className=' overflow-x-hidden h-[550px]  overflow-y-auto'>
           { trashFiles.filter(trashFile=> trashFile.file?.folder).length>0 &&  <div>
                <div className='text-2xl my-6'>Folders</div>
                <div className='flex flex-wrap  gap-6'>
                    {trashFiles.filter(trashFile=> trashFile.file.folder).map(({file,trashId}) => {
                        return (
                            <div className='text-lg flex items-center select-none  w-48 rounded-lg px-4 py-2 justify-between bg-base-300 cursor-default'
                              key={trashId}
                             onClick={()=>{handleViewData(file.fileId)}}
                             >
                                <div className='flex justify-center gap-2 items-center'>
                                    <div className='text-xl'><AiFillFolder /></div>
                                    <div className='flex w-28'>
                                        {file?.fileName.substring(0, 15)}
                                    </div>
                                </div>
                                <div className={`dropdown ${position>52?'dropdown-top':'dropdown-bottom'}   w-full flex justify-end `} >
                                    <label tabIndex={0} onClick={handlePosition}  className=" cursor-pointer" ><BsThreeDotsVertical /></label>
                                    <ul tabIndex={0}  className="dropdown-content menu px-2  shadow bg-base-200 rounded-box w-52 translate-x-20 ">
                                       
                                        <li><div onClick={()=>handleRestore(trashId)}>Restore</div></li>
                                       
                                        <li><div onClick={()=>handleDeleteFoever(trashId)}>Delete Forever</div></li>
                                        
                                    </ul>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>}
           { trashFiles.filter(trashFile=> !trashFile.file?.folder).length>0 &&  <div>
                <div className='text-2xl my-6'>Files</div>
                <div className='flex flex-wrap  gap-6'>
                    {trashFiles.filter(trashFile=> !trashFile.file?.folder).map(({file,trashId})=> {
                        return (
                            <div className='text-md flex items-center select-none w-48 rounded-lg px-4 py-2 justify-between bg-base-300 cursor-default '
                             key={file?.fileId}
                             onClick={()=>{handleViewData(file.fileId)}}
                             >
                                <div className='flex justify-center gap-2 items-center'>
                                    <div className='text-xl'><AiFillFile /></div>
                                    <div className='flex w-28'>
                                        {file?.fileName?.substring(0, 15)}
                                    </div>
                                </div>
                                <div className={`dropdown ${position>52?'dropdown-top':'dropdown-bottom'}   w-full flex justify-end `} >
                                    <label tabIndex={0} onClick={handlePosition}  className=" cursor-pointer" ><BsThreeDotsVertical /></label>
                                    <ul 
                                      
                                    tabIndex={0}  className="dropdown-content menu px-2   shadow bg-base-200 rounded-box w-52 translate-x-20 ">
                                       
                                       <li><div onClick={()=>handleRestore(trashId)}>Restore</div></li>
                                       <li><div onClick={()=>handleDeleteFoever(trashId)}>Delete Forever</div></li>
                                       
                                    </ul>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
            }
        </div>
    )
}

export default TrashGridView