import React, { useState } from 'react'
import { AiFillFolder, AiTwotoneFolderOpen, AiOutlineStar, AiFillStar, AiOutlineDownload, AiFillEdit, AiFillFolderOpen, AiOutlineFileSearch } from 'react-icons/ai'
import { BsThreeDotsVertical } from 'react-icons/bs'
import formatBytes from '../../data/ByteFormat'
import { Icon } from "@fluentui/react/lib/Icon";
import { getFileTypeIconProps } from "@fluentui/react-file-type-icons";
import { initializeFileTypeIcons } from "@fluentui/react-file-type-icons";

import moment from 'moment'
import { useNavigate } from 'react-router-dom';
import { allDeleteFileAndFolderForever, deleteFileAndFolderForvever, restoreFileOrFolder, deleteFileAndFolder, getDownloadFile, reverseStar } from '../../util/Util'
import { useDispatch, useSelector } from 'react-redux'
import { reRender } from '../../redux/render/renderAction'
import { fetchFileOrFolderDetail } from '../../redux/fetch/file/fileActions';
import { viewDetailOpen } from '../../redux/view_details/detailsActions';
import { renameVisible } from '../../redux/rename_folder/renameAction';
import { shareVisible } from '../../redux/share_files/shareBtnAction';
import { fetchShareFileAndUser } from '../../redux/share_files/shareFileActions';

// initializeFileTypeIcons();

const SearchView = ({ search }) => {

    const { files, sharedFileInfos, trashes } = search





    const { render } = useSelector(state => state.isRender)
    const [position, setPosition] = useState(0)
    const [trash, setTrash] = useState('')
    const navigate = useNavigate()


    const dispatch = useDispatch()

    /* drive list view function below */

    const handleOpenFolder = (fileId) => {
        navigate(`/user/drive/${fileId}`)
    }

    const handleShare = (fileId) => {
        dispatch(shareVisible(true))
        dispatch(fetchShareFileAndUser(fileId))

    }

    const handleRename = () => {
        setTimeout(() => {
            dispatch(renameVisible(true))
        }, 100)
    }

    const handleGetStar = (fileId) => {
        reverseStar(fileId).then(() => {
            dispatch(reRender(render))
            handleViewData(fileId)
        })
    }

    const handleRemove = (fileId) => {
        deleteFileAndFolder(fileId).then(res => {
            dispatch(reRender(render))
        })
    }

    const handleViewData = (fileId) => {
        dispatch(fetchFileOrFolderDetail(fileId))
    }

    const dropMenuClick = () => {
        const elem = document.activeElement;
        if (elem) {
            elem?.blur();
        }
    };

    /* Share list view function below */
    const handleSharedRemove = (fileId)=>{
        
        removeSharedUser(fileId,userId).then(()=>{
           dispatch(reRender(render))
        })
    }

    /* Trash list view function below */

    const handleRestore = (trashId) => {
        restoreFileOrFolder(trashId).then(() => {
            dispatch(reRender(render))
        })
    }

    const handleDeleteFoever = (trashId) => {

        deleteFileAndFolderForvever(trashId).then(res => {

            dispatch(reRender(render))
        })




    }
    const handleAllDeleteForever = () => {

        allDeleteFileAndFolderForever().then(() => {
            dispatch(reRender(render))
        })

    }


    const getDate = (date) => {
        return "date", moment().format('L') === moment(date).format("L") ? "Today, " + moment(date).format("hh:mm") : moment(date).format("L")
    }

    const handlePosition = (e) => {
        const observer = new IntersectionObserver(entries => {
            const { x, y } = entries[0].boundingClientRect
            setPosition(prev => Math.floor(y * 100 / window.innerHeight))
            console.log(position)
        })
        observer.observe(e.target)
    }

    const trashFolders = trashes.filter(trash => trash.file?.folder) 
    const trashFiles = trashes.filter(trash => !trash.file?.folder) 




    if(trashes.length === 0 && sharedFileInfos.length === 0 && files.length === 0){
        return (
            <>
                
                <div className='absolute flex flex-col justify-center items-center left-[60%] top-[60%] -translate-x-1/2 -translate-y-1/2'>

                    <div className='text-[12em] text-blue-300'><AiOutlineFileSearch /></div>
                    <div>No Item Found</div>
                   

                </div>
            </>

        );
    }



    return (
        <>

            {trashes.length>0 && <div className='bg-base-200 h-12 flex items-center px-8 select-none mb-4'>Items in trash are deleted forever after 30 days</div>} 
           
            <table className='table w-full'>
                <thead>
                    <tr>
                        <td className='w-72'>Name</td>
                        <td className='w-48'>Type</td>
                        <td>Size</td>
                        <td>Date</td>
                        <td>Location</td>
                        <td></td>
                    </tr>
                </thead>
                <tbody>


                    {   //Folder in drive not trash
                        files.filter(file => file.folder && !file.trash ).map(file => {
                            return (

                                <tr className='hover  select-none'
                                    onDoubleClick={() => handleOpenFolder(file.fileId)} key={file.fileId}
                                    onClick={() => { handleViewData(file.fileId) }}
                                >
                                    <td className='w-72 flex gap-2 items-center '>
                                        <span className='text-xl'><AiTwotoneFolderOpen /></span>
                                        <span>{file?.fileName?.length > 22 ? file?.fileName?.substring(0, 20) + '...' : file?.fileName}</span>
                                    </td>
                                    <td className='w-48'>{file.fileType?.length > 22 ? file.fileType.substring(0, 20) + "..." : file.fileType}</td>
                                    <td>{file?.folder ? "-" : formatBytes(file.fileSize)}</td>
                                    <td>{getDate(file.dateOfOpened)}</td>
                                    <td>Drive</td>
                                    <td>
                                        <div className={`dropdown ${position > 55 ? 'dropdown-top' : 'dropdown-bottom'}   w-full flex justify-center `} >
                                            <label tabIndex={0} onClick={handlePosition} className=" cursor-pointer" ><BsThreeDotsVertical /></label>
                                            <ul tabIndex={0} className="dropdown-content menu px-2  shadow bg-base-200 rounded-box w-52 -translate-x-20 ">

                                                <li onClick={dropMenuClick} ><div onClick={() => { dispatch(viewDetailOpen()) }}>View details</div></li>
                                                {/* <li><a>Share</a></li> */}
                                                <li onClick={dropMenuClick}><div onClick={() => { handleGetStar(file.fileId) }}>{file.hasStar ? 'Remove to star' : 'Add to star'}</div></li>
                                                <li onClick={dropMenuClick} ><div onClick={() => { dispatch(renameVisible(true)) }}>Rename</div></li>
                                                <li onClick={dropMenuClick}><div onClick={() => { handleRemove(file.fileId) }}>Remove</div></li>
                                            </ul>
                                        </div>
                                    </td>
                                </tr>
                            );
                        })
                    }
                    { //files in drive not trash
                     
                     files.filter(file => !file.folder && !file.trash).map(file => {
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
                                {/* <td>{file?.public ? 'Yes' : 'No'}</td> */}
                                <td>{getDate(file.dateOfOpened)}</td>
                                <td>Drive</td>
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
                    })

                    }

                    { 
                        // share file and folder
                        sharedFileInfos?.map(({file,owner})  => {
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
                                    {/* <td>{file?.public ? 'Yes' : 'No'}</td> */}
                                    <td>{getDate(file.dateOfOpened)}</td>
                                    <td>Shared</td>
                                    <td>
                                    <div className={`dropdown ${position>55?'dropdown-top':'dropdown-bottom'}   w-full flex justify-center `} >
                                        <label tabIndex={0} onClick={handlePosition}  className=" cursor-pointer" ><BsThreeDotsVertical /></label>
                                        <ul tabIndex={0}  className="dropdown-content menu px-2  shadow bg-base-200 rounded-box w-52 -translate-x-20 ">
                                              
                                        <li onClick={dropMenuClick} ><div onClick={()=>{dispatch(viewDetailOpen())}}>View details</div></li>
                                        <li onClick={dropMenuClick}><div onClick={()=>{handleSharedRemove(file.fileId)}}>Remove</div></li>
                                           
                                        </ul>
                                    </div>
                                    </td>
                                </tr>
                            );
                        })
                    
                    }

                    {
                        trashFolders.map(({ trashId, userId, file, date }) => {

                            return (
                                <tr className='hover cursor-pointer' key={trashId}>
                                    <td className='w-72 flex gap-2 items-center '>
                                        <span className='text-xl'><AiFillFolder /></span>
                                        <span>{file?.fileName?.length > 22 ? file?.fileName?.substring(0, 20) + '...' : file?.fileName}</span>
                                    </td>
                                    <td>{file.fileType.length > 15 ? file?.fileType?.substring(0, 20) + '...' : file?.fileType}</td>
                                    <td>{file?.fileSize || '-'}</td>
                                    <td>{getDate(date)}</td>
                                    <td>Trash</td>
                                    <td>
                                        <div className={`dropdown ${position > 52 ? 'dropdown-top' : 'dropdown-bottom'}   w-full flex justify-center `} >
                                            <label tabIndex={0} onClick={handlePosition} className=" cursor-pointer" ><BsThreeDotsVertical /></label>
                                            <ul

                                                tabIndex={0} className="dropdown-content menu px-2   shadow bg-base-200 rounded-box w-52 -translate-x-20 ">

                                                <li><div onClick={() => handleRestore(trashId)}>Restore</div></li>
                                                <li><div onClick={() => { window.deleted_forever.showModal(); setTrash({ file, trashId }) }}>Delete Forever</div></li>

                                            </ul>
                                        </div>
                                    </td>
                                </tr>
                            )
                        })

                    }
                    {
                        trashFiles.map(({ trashId, userId, file, date }) => {

                            return (
                                <tr className='hover cursor-pointer' key={trashId}>
                                    <td className='w-72 flex gap-2 items-center '>
                                        <Icon {...getFileTypeIconProps({ extension: file?.extension, size: 24 })} />
                                        <span>{file?.fileName?.length > 22 ? file?.fileName?.substring(0, 20) + '...' : file?.fileName}</span>
                                    </td>
                                    <td>{file.fileType.length > 15 ? file?.fileType?.substring(0, 20) + '...' : file?.fileType}</td>
                                    <td>{formatBytes(file?.fileSize)}</td>
                                    <td>{getDate(date)}</td>
                                    <td>Trash</td>
                                    <td>
                                        <div className={`dropdown ${position > 52 ? 'dropdown-top' : 'dropdown-bottom'}   w-full flex justify-center `} >
                                            <label tabIndex={0} onClick={handlePosition} className=" cursor-pointer" ><BsThreeDotsVertical /></label>
                                            <ul

                                                tabIndex={0} className="dropdown-content menu px-2   shadow bg-base-200 rounded-box w-52 -translate-x-20 ">

                                                <li><div onClick={() => handleRestore(trashId)}>Restore</div></li>
                                                <li><div onClick={() => { window.deleted_search_forever.showModal(); setTrash({ file, trashId }) }}>Delete Forever</div></li>

                                            </ul>
                                        </div>
                                    </td>
                                </tr>
                            )
                        })
                    }

                    {
                        //file and folder which are trashed
                        files.filter(file => file.trash).map(file => {
                            return (
                                
                                <tr className='opacity-40'
                               
                                key={file.fileId}
                                >

                                    <td className='w-72 flex gap-2 items-center '>
                                    <Icon {...getFileTypeIconProps({ extension: file.extension, size: 24 })} />
                                        <span>{file?.fileName?.length > 22 ? file?.fileName?.substring(0, 20) + '...' : file?.fileName}</span>
                                    </td>
                                    <td className='w-48'>{file.fileType?.length > 22 ? file.fileType.substring(0, 20) + "..." : file.fileType}</td>
                                    <td>{file.folder ? "-" : formatBytes(file.fileSize)}</td>
                                    {/* <td>{file?.public ? 'Yes' : 'No'}</td> */}
                                    <td>{getDate(file.dateOfOpened)}</td>
                                    <td>Drive</td>
                                    <td>
                                    <div className={`dropdown  w-full flex justify-center `} >
                                        <label tabIndex={0}  className=" cursor-pointer" ><BsThreeDotsVertical /></label>
                                      
                                    </div>
                                    </td>
                                </tr>
                                
                            );
                        })
                    }

                </tbody>



            </table>


            <dialog id="deleted_search_forever" className="bg-transparent">
                <form method="dialog" className="modal-box">
                    <h3 className="font-bold text-lg">Delete Forever!</h3>
                    <p className="py-4">"{trash?.file?.fileName}" will be deleted forever!!! </p>
                    <div className="modal-action">

                        <button className="btn">Cancel</button>
                        <button className="btn btn-error" onClick={() => handleDeleteFoever(trash?.trashId)}>Delete</button>
                    </div>
                </form>
            </dialog>

            <dialog id="all_deleted_search_forever" className="bg-transparent">
                <form method="dialog" className="modal-box">
                    <h3 className="font-bold text-lg">Delete Forever!</h3>
                    <p className="py-4">"All file or folder will be deleted forever!!! </p>
                    <div className="modal-action">
                        <button className="btn">Cancel</button>
                        <button className="btn btn-error" onClick={() => handleAllDeleteForever()}>Delete</button>
                    </div>
                </form>
            </dialog>



        </>
    )
}

export default SearchView