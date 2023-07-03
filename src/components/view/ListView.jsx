import React, { useState } from 'react'
import { AiTwotoneFolderOpen, AiOutlineStar, AiFillStar, AiOutlineDownload, AiFillEdit, AiFillFolderOpen } from 'react-icons/ai'
import { BsThreeDotsVertical } from 'react-icons/bs'
import { Icon } from "@fluentui/react/lib/Icon";
import { getFileTypeIconProps } from "@fluentui/react-file-type-icons";
import { initializeFileTypeIcons } from "@fluentui/react-file-type-icons";


import formatBytes from '../../data/ByteFormat';
import moment from 'moment';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { reRender } from '../../redux/render/renderAction';
import { deleteFileAndFolder, getDownloadFile, reverseStar } from '../../util/Util';
import { fetchFileOrFolderDetail } from '../../redux/fetch/file/fileActions';
import { viewDetailOpen } from '../../redux/view_details/detailsActions';
import { renameVisible } from '../../redux/rename_folder/renameAction';
import { shareVisible } from '../../redux/share_files/shareBtnAction';
import { fetchShareFileAndUser } from '../../redux/share_files/shareFileActions';



// initializeFileTypeIcons();

const ListView = ({ data }) => {

    const {render} = useSelector(state=> state.isRender)
    const [position,setPosition] = useState(0)
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const getDate = (date) => {
        return "date", moment().format('L') === moment(date).format("L") ? "Today, "+moment(date).format("hh:mm") : moment(date).format("L")
    }

    const handleOpenFolder = (fileId) => {

        navigate(`/user/drive/${fileId}`)


    }

    const handleShare=(fileId)=>{
        dispatch(shareVisible(true))
        dispatch(fetchShareFileAndUser(fileId))

    }

    const handleRename = ()=>{
         setTimeout(()=>{
            dispatch(renameVisible(true))
        },100)
    }

    

    const handleGetStar =(fileId)=>{
        reverseStar(fileId).then(()=>{
             dispatch(reRender(render))
             handleViewData(fileId)
        })
   }

   const handleRemove =(fileId)=>{
        
    deleteFileAndFolder(fileId).then(res=>{

        dispatch(reRender(render))
    })
}


const handleViewData =  (fileId) =>{
    dispatch(fetchFileOrFolderDetail(fileId))
}

const handlePosition = (e) =>{
    const observer = new IntersectionObserver(entries=>{
     const {x,y}=entries[0].boundingClientRect
     setPosition(prev=>Math.floor(y*100/window.innerHeight))
    
    })
  
    
    observer.observe(e.target)


 }
 
 const dropMenuClick = () => {
     const elem = document.activeElement;
     if(elem){
       elem?.blur();
     }
   };


   if (data?.length == 0 ) {
  
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
        <>


            <table className='table w-full'>
                <thead>
                    <tr>
                        <td className='w-72'>Name</td>
                        <td className='w-48'>Type</td>
                        <td>Size</td>
                        <td>Public</td>
                        <td>Date</td>
                        <td></td>
                        <td></td>
                    </tr>
                </thead>
                <tbody>
                    {data.filter(file => file.folder).map(file => {
                        return (

                            <tr className='hover  select-none'
                                onDoubleClick={() => handleOpenFolder(file.fileId)} key={file.fileId}
                                onClick={()=>{handleViewData(file.fileId)}}
                            >
                                <td className='w-72 flex gap-2 items-center '>
                                    <span className='text-xl'><AiTwotoneFolderOpen /></span>
                                    <span>{file?.fileName?.length > 22 ? file?.fileName?.substring(0, 20) + '...' : file?.fileName}</span>
                                </td>
                                <td className='w-48'>{file.fileType?.length > 22 ? file.fileType.substring(0, 20) + "..." : file.fileType}</td>
                                <td>{file?.folder ? "-" : formatBytes(file.fileSize)}</td>
                                <td>{file?.public ? 'Yes' : 'No'}</td>
                                <td>{getDate(file.dateOfOpened)}</td>
                                <td>
                                    <div className='flex gap-6 text-[16px]'>
                                        {/* <div className='cursor-pointer'>
                                            <AiOutlineDownload />
                                        </div> */}
                                        <div className='cursor-pointer' onClick={handleRename}>
                                            <AiFillEdit />
                                        </div>
                                        <div className='cursor-pointer'>
                                            {file?.hasStar ? <AiFillStar /> : <AiOutlineStar />}
                                        </div>
                                    </div>
                                </td>
                                <td>
                                <div className={`dropdown ${position>55?'dropdown-top':'dropdown-bottom'}   w-full flex justify-center `} >
                                    <label tabIndex={0} onClick={handlePosition}  className=" cursor-pointer" ><BsThreeDotsVertical /></label>
                                    <ul tabIndex={0}  className="dropdown-content menu px-2  shadow bg-base-200 rounded-box w-52 -translate-x-20 ">
                                       
                                        <li onClick={dropMenuClick} ><div onClick={()=>{dispatch(viewDetailOpen())}}>View details</div></li>
                                        {/* <li><a>Share</a></li> */}
                                        <li onClick={dropMenuClick}><div onClick={()=>{handleGetStar(file.fileId)}}>{file.hasStar?'Remove to star':'Add to star'}</div></li>
                                        <li onClick={dropMenuClick} ><div onClick={()=>{dispatch(renameVisible(true))}}>Rename</div></li>
                                        <li onClick={dropMenuClick}><div onClick={()=>{handleRemove(file.fileId)}}>Remove</div></li>
                                    </ul>
                                </div>
                                </td>
                            </tr>
                        );
                    })}

                    {data.filter(file => !file.folder).map(file => {
                        return (

                            <tr className='hover'
                            onClick={()=>{handleViewData(file.fileId)}}
                            key={file.fileId}
                            >
                                <td className='w-72 flex gap-2 items-center '>
                                <Icon {...getFileTypeIconProps({ extension: file.extension, size: 24 })} />
                                    <span>{file?.fileName?.length > 22 ? file?.fileName?.substring(0, 20) + '...' : file?.fileName}</span>
                                </td>
                                <td className='w-48'>{file.fileType?.length > 22 ? file.fileType.substring(0, 20) + "..." : file.fileType}</td>
                                <td>{file.folder ? "-" : formatBytes(file.fileSize)}</td>
                                <td>{file?.public ? 'Yes' : 'No'}</td>
                                <td>{getDate(file.dateOfOpened)}</td>
                                <td>
                                    <div className='flex gap-6 text-[16px]'>
                                        <div className='cursor-pointer' onClick={()=>{getDownloadFile(file.fileId)}}>
                                            <AiOutlineDownload />
                                        </div>
                                        <div className='cursor-pointer' onClick={handleRename} >
                                            <AiFillEdit />
                                        </div>
                                        <div className='cursor-pointer'>
                                            {file?.hasStar ? <AiFillStar /> : <AiOutlineStar />}
                                        </div>
                                    </div>
                                </td>
                                <td>
                                <div className={`dropdown ${position>55?'dropdown-top':'dropdown-bottom'}   w-full flex justify-center `} >
                                    <label tabIndex={0} onClick={handlePosition}  className=" cursor-pointer" ><BsThreeDotsVertical /></label>
                                    <ul tabIndex={0}  className="dropdown-content menu px-2  shadow bg-base-200 rounded-box w-52 -translate-x-20 ">
                                       
                                        <li onClick={dropMenuClick}><div onClick={()=>{dispatch(viewDetailOpen())}}>View details</div></li>
                                    <li onClick={dropMenuClick}><div onClick={()=>handleShare(file.fileId)}>Share</div></li>
                                        <li onClick={dropMenuClick}><div onClick={()=>{handleGetStar(file.fileId)}}>{file.hasStar?'Remove to star':'Add to star'}</div></li>
                                        <li onClick={dropMenuClick}><div onClick={()=>{dispatch(renameVisible(true))}}>Rename</div></li>
                                       
                                        <li onClick={dropMenuClick}><div onClick={()=>{getDownloadFile(file.fileId)}}>Download</div></li>
                                        
                                        <li onClick={dropMenuClick}><div onClick={()=>{handleRemove(file.fileId)}}>Remove</div></li>
                                    </ul>
                                </div>
                                </td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>


        </>
    )
}

export default ListView