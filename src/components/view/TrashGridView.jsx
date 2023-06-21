import React, { useEffect, useRef, useState } from 'react'
import { AiFillFolder, AiFillFile, AiFillFolderOpen, AiOutlineStar, AiFillStar, AiOutlineDownload, AiFillEdit } from 'react-icons/ai'

import { BsThreeDotsVertical, BsFillTrashFill } from 'react-icons/bs'
import { allDeleteFileAndFolderForever, deleteFileAndFolderForvever, restoreFileOrFolder } from '../../util/Util'
import { useDispatch, useSelector } from 'react-redux'
import { reRender } from '../../redux/render/renderAction'



const TrashGridView = ({ trashFiles }) => {

    const { render } = useSelector(state => state.isRender)

    const [position, setPosition] = useState(0)
    const[trash,setTrash] = useState('')

    const dispatch = useDispatch()


    const handleRestore = (trashId) => {

        restoreFileOrFolder(trashId).then(()=>{

            dispatch(reRender(render))
        })


    }

    const handleDeleteFoever = (trashId) => {
        
            deleteFileAndFolderForvever(trashId).then(res => {

                dispatch(reRender(render))
            })


        

    }
    const handleAllDeleteForever= () =>{

        allDeleteFileAndFolderForever().then(()=>{
             dispatch(reRender(render))
        })

    }



    const handleViewData = (fileId) => {
        // dispatch(fetchFileOrFolderDetail(fileId))
    }


    const handlePosition = (e) => {
        const observer = new IntersectionObserver(entries => {
            const { x, y } = entries[0].boundingClientRect
            setPosition(prev => Math.floor(y * 100 / window.innerHeight))
            console.log(position)
        })


        observer.observe(e.target)
        console.log(window.innerHeight)


    }

    if (trashFiles.filter(trashFile => trashFile?.file?.folder).length == 0 && trashFiles.filter(trashFile => !trashFile?.file?.folder).length == 0) {

        return (
            <>
                <div className='bg-base-200 h-12 flex items-center px-8 select-none mb-4'>Items in trash are deleted forever after 30 days</div>
                <div className='absolute flex flex-col justify-center items-center left-[60%] top-[60%] -translate-x-1/2 -translate-y-1/2'>

                    <div className='text-[12em] text-blue-300'><BsFillTrashFill /></div>
                    <div>No Item</div>
                    <div>Removed item appear in trash</div>

                </div>
            </>

        );
    }

    return (
        <>
            <div className='bg-base-200 h-12 flex items-center px-8 select-none  justify-between '><span>Items in trash are deleted forever after 30 days</span><span><button className='btn btn-sm' onClick={()=>window.all_deleted_forever.showModal()}>Empty</button></span></div>
            <div className=' overflow-x-hidden h-[550px]  overflow-y-auto'>
                {trashFiles.filter(trashFile => trashFile.file?.folder).length > 0 && <div>
                    <div className='text-2xl my-6'>Folders</div>
                    <div className='flex flex-wrap  gap-6'>
                        {trashFiles.filter(trashFile => trashFile.file.folder).map(({ file, trashId }) => {
                            return (
                                <div className='text-lg flex items-center select-none  w-48 rounded-lg px-4 py-2 justify-between bg-base-300 cursor-default'
                                    key={trashId}
                                    onClick={() => { handleViewData(file.fileId) }}
                                >
                                    <div className='flex justify-center gap-2 items-center'>
                                        <div className='text-xl'><AiFillFolder /></div>
                                        <div className={`flex w-28  ${file?.fileName.length>12?'tooltip':''}`} data-tip={file?.fileName}>
                                        {file?.fileName?.length>12?file?.fileName?.substring(0, 10)+'...':file?.fileName}
                                        </div>
                                    </div>
                                    <div className={`dropdown ${position > 52 ? 'dropdown-top' : 'dropdown-bottom'}   w-full flex justify-end `} >
                                        <label tabIndex={0} onClick={handlePosition} className=" cursor-pointer" ><BsThreeDotsVertical /></label>
                                        <ul tabIndex={0} className="dropdown-content menu px-2  shadow bg-base-200 rounded-box w-52 translate-x-20 ">

                                            <li onClick={() => handleRestore(trashId)}><div >Restore</div></li>

                                            <li><div onClick={() => {window.deleted_forever.showModal(); setTrash({file,trashId})}}>Delete Forever</div></li>

                                        </ul>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>}
                {trashFiles.filter(trashFile => !trashFile.file?.folder).length > 0 && <div>
                    <div className='text-2xl my-6'>Files</div>
                    <div className='flex flex-wrap  gap-6'>
                        {trashFiles.filter(trashFile => !trashFile.file?.folder).map(({ file, trashId }) => {
                            return (
                                <div className='text-md flex items-center select-none w-48 rounded-lg px-4 py-2 justify-between bg-base-300 cursor-default '
                                    key={file?.fileId}
                                    onClick={() => { handleViewData(file.fileId) }}
                                >
                                    <div className='flex justify-center gap-2 items-center'>
                                        <div className='text-xl'><AiFillFile /></div>
                                        <div className={`flex w-28  ${file?.fileName.length>12?'tooltip':''}`} data-tip={file?.fileName}>
                                        {file?.fileName?.length>12?file?.fileName?.substring(0, 10)+'...':file?.fileName}
                                        </div>
                                    </div>
                                    <div className={`dropdown ${position > 52 ? 'dropdown-top' : 'dropdown-bottom'}   w-full flex justify-end `} >
                                        <label tabIndex={0} onClick={handlePosition} className=" cursor-pointer" ><BsThreeDotsVertical /></label>
                                        <ul

                                            tabIndex={0} className="dropdown-content menu px-2   shadow bg-base-200 rounded-box w-52 translate-x-20 ">

                                            <li><div onClick={() => handleRestore(trashId)}>Restore</div></li>
                                            <li><div onClick={() => {window.deleted_forever.showModal(); setTrash({file,trashId})}}>Delete Forever</div></li>

                                        </ul>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
                }
            </div>

           
            <dialog id="deleted_forever" className="bg-transparent">
                <form method="dialog" className="modal-box">
                    <h3 className="font-bold text-lg">Delete Forever!</h3>
                    <p className="py-4">"{trash?.file?.fileName}" will be deleted forever!!! </p>
                    <div className="modal-action">
                      
                        <button className="btn">Cancel</button>
                        <button className="btn btn-error" onClick={()=>handleDeleteFoever(trash?.trashId)}>Delete</button>
                    </div>
                </form>
            </dialog>
            <dialog id="all_deleted_forever" className="bg-transparent">
                <form method="dialog" className="modal-box">
                    <h3 className="font-bold text-lg">Delete Forever!</h3>
                    <p className="py-4">"All file or folder will be deleted forever!!! </p>
                    <div className="modal-action">
                      
                        <button className="btn">Cancel</button>
                        <button className="btn btn-error" onClick={()=>handleAllDeleteForever()}>Delete</button>
                    </div>
                </form>
            </dialog>
        </>
    )
}

export default TrashGridView