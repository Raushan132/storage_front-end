import React, { useState } from 'react'
import { AiFillFolder, AiFillFolderOpen } from 'react-icons/ai'
import { Icon } from "@fluentui/react/lib/Icon";
import { getFileTypeIconProps } from "@fluentui/react-file-type-icons";
import { initializeFileTypeIcons } from "@fluentui/react-file-type-icons";

import { BsThreeDotsVertical } from 'react-icons/bs'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { fetchFileOrFolderDetail } from '../../redux/fetch/file/fileActions'
import { viewDetailOpen } from '../../redux/view_details/detailsActions'
import { renameVisible } from '../../redux/rename_folder/renameAction'
import { getDownloadFile,deleteFileAndFolder, reverseStar } from '../../util/Util'
import { reRender } from '../../redux/render/renderAction'
import { shareVisible } from '../../redux/share_files/shareBtnAction'
import { fetchShareFileAndUser } from '../../redux/share_files/shareFileActions'


initializeFileTypeIcons();

const GridView = ({ folders, files }) => {

    const {render} = useSelector(state=> state.isRender)
    const [position,setPosition] = useState(0)
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const handleShare=(fileId)=>{
        dispatch(shareVisible(true))
        dispatch(fetchShareFileAndUser(fileId))

    }

   const handleOpenFolder =(fileId)=>{    
    navigate(`/user/drive/${fileId}`)
   }

   const handleGetStar =(fileId)=>{
        reverseStar(fileId).then(()=>{
             dispatch(reRender(render))
             handleViewData(fileId)
             console.log("here stared")
        })
   }

   const handleRemove =(fileId)=>{
        
       deleteFileAndFolder(fileId).then(res=>{

           dispatch(reRender(render))
       })
   }

   const handleViewData = (fileId) =>{
        dispatch(fetchFileOrFolderDetail(fileId))
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

    

    if (folders.length == 0 && files.length == 0) {

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
        <div className=' overflow-x-hidden min-h-full overflow-y-auto'>
           { folders.length>0 &&  <div>
                <div className='text-2xl my-6'>Folders</div>
                <div className='flex flex-wrap  gap-6'>
                    {folders.map(folder => {
                        return (
                            <div className='text-lg flex items-center select-none  w-48 rounded-lg px-4 py-2 justify-between bg-base-300 cursor-default'
                             onDoubleClick={()=>handleOpenFolder(folder.fileId)} key={folder.fileId}
                             onClick={()=>{handleViewData(folder.fileId)}}
                             >
                                <div className='flex justify-center gap-2 items-center'>
                                    <div className='text-xl'><AiFillFolder /></div>
                                    <div className={`flex w-28 ${folder.fileName?.length>12?'tooltip':''} `} data-tip={folder?.fileName}>
                                    {folder?.fileName?.length>12?folder?.fileName?.substring(0, 10)+'...':folder?.fileName}
                                    </div>
                                </div>
                                <div className={`dropdown ${position>52?'dropdown-top':'dropdown-bottom'}   w-full flex justify-end `} >
                                    <label tabIndex={0} onClick={handlePosition}  className=" cursor-pointer" ><BsThreeDotsVertical /></label>
                                    <ul tabIndex={0}  className="dropdown-content menu px-2  shadow bg-base-200 rounded-box w-52 translate-x-20 ">
                                       
                                        {/* <li><div onClick={()=>handleShare(folder.fileId)}>Share</div></li> */}
                                        <li onClick={dropMenuClick}><div onClick={()=>{handleGetStar(folder.fileId)}}>{folder.hasStar?'Remove to star':'Add to star'}</div></li>
                                        <li onClick={dropMenuClick} ><div onClick={()=>{console.log("here3000");dispatch(renameVisible(true))}}>Rename</div></li>
                                        <hr />
                                        <li onClick={dropMenuClick} ><div onClick={()=>{dispatch(viewDetailOpen())}}>View details</div></li>
                                        <li><a>Download</a></li>
                                        <hr />
                                        <li onClick={dropMenuClick}><div onClick={()=>{handleRemove(folder.fileId)}}>Remove</div></li>
                                    </ul>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>}
           { files.length>0 &&  <div>
                <div className='text-2xl my-6'>Files</div>
                <div className='flex flex-wrap  gap-6'>
                    {files.map(file => {
                        return (
                            <div className='text-md flex items-center select-none w-48 rounded-lg px-4 py-2 justify-between bg-base-300 cursor-default '
                             key={file?.fileId}
                             onClick={()=>{handleViewData(file.fileId)}}
                             >
                                <div className='flex justify-center gap-2 items-center'>
                                   <Icon {...getFileTypeIconProps({ extension: file.extension, size: 24 })} />
                                    <div className={`flex w-28  ${file.fileName?.length>12?'tooltip':''}`} data-tip={file?.fileName}>
                                        {file?.fileName?.length>12?file?.fileName?.substring(0, 10)+'...':file?.fileName}
                                    </div>
                                </div>
                                <div className={`dropdown ${position>52?'dropdown-top':'dropdown-bottom'}   w-full flex justify-end `} >
                                    <label tabIndex={0} onClick={handlePosition}  className=" cursor-pointer" ><BsThreeDotsVertical /></label>
                                    <ul tabIndex={0}  className="dropdown-content menu px-2  shadow bg-base-200 rounded-box w-52 translate-x-20 ">
                                       
                                    <li><div onClick={()=>handleShare(file.fileId)}>Share</div></li>
                                        <li onClick={dropMenuClick}><div onClick={()=>{handleGetStar(file.fileId)}}>{file.hasStar?'Remove to star':'Add to star'}</div></li>
                                        <li onClick={dropMenuClick}><div onClick={()=>{dispatch(renameVisible(true))}}>Rename</div></li>
                                        <hr />
                                        <li onClick={dropMenuClick}><div onClick={()=>{dispatch(viewDetailOpen())}}>View details</div></li>
                                        <li onClick={dropMenuClick}><div onClick={()=>{getDownloadFile(file.fileId)}}>Download</div></li>
                                        <hr />
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
    )
}

export default GridView