import React, { useEffect, useState } from 'react'
import { AiFillFile, AiFillFolder } from 'react-icons/ai'
import { BsFillTrashFill, BsThreeDotsVertical } from 'react-icons/bs'
import formatBytes from '../../data/ByteFormat'
import moment from 'moment'
import { allDeleteFileAndFolderForever, deleteFileAndFolderForvever, restoreFileOrFolder } from '../../util/Util'
import { useDispatch, useSelector } from 'react-redux'
import { reRender } from '../../redux/render/renderAction'

const TrashListView = ({ data }) => {

    const{render} = useSelector(state=> state.isRender)
    const [position, setPosition] = useState(0)
    const [trash, setTrash] = useState('')


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


    const getDate= (date)=>{
         return "date",moment().format('L')=== moment(date).format("L")?moment(date).format("hh:mm"):moment(date).format("L")
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

    const trashFolders = data.filter(trash => trash.file?.folder)
    const trashFiles = data.filter(trash => !trash.file?.folder)


    console.log("trash Folder:", trashFolders)
    console.log("trash Files:", trashFiles)

    if (trashFolders.length == 0 && trashFiles.length == 0) {

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
            <div className='bg-base-200 h-12 flex items-center px-8 select-none  justify-between '><span>Items in trash are deleted forever after 30 days</span><span><button className='btn btn-sm' onClick={() => window.all_deleted_forever.showModal()}>Empty</button></span></div>
            <div className='overflow-x-hidden h-[500px]'>

                <table className='table w-full my-5'>
                    <thead>
                        <tr className=''>
                            <td className='w-72'>Name</td>
                            <td>File Type</td>
                            <td>File Size</td>
                            <td>Trashed Date</td>
                            <td >Path</td>
                            <td></td>
                        </tr>
                    </thead>
                    <tbody>
                        {

                            trashFolders.map(({ trashId, userId, file, date }) => {

                                return (
                                    <tr className='hover cursor-pointer' key={trashId}>
                                        <td className='w-72 flex gap-2 items-center '>
                                            <span className='text-xl'><AiFillFolder/></span>
                                            <span>{file?.fileName?.length>22?file?.fileName?.substring(0, 20)+'...':file?.fileName}</span>
                                        </td>
                                        <td>{file.fileType}</td>
                                        <td>{file?.fileSize || '-'}</td>
                                        <td>{getDate(date)}</td>
                                        <td>{file.path.split('/')[1]}</td>
                                        <td>
                                            <div className={`dropdown ${position > 52 ? 'dropdown-top' : 'dropdown-bottom'}   w-full flex justify-center `} >
                                                <label tabIndex={0} onClick={handlePosition} className=" cursor-pointer" ><BsThreeDotsVertical /></label>
                                                <ul

                                                    tabIndex={0} className="dropdown-content menu px-2   shadow bg-base-200 rounded-box w-52 -translate-x-20 ">

                                                    <li><div onClick={() => handleRestore(trashId)}>Restore</div></li>
                                                    <li><div onClick={() => { window.deleted_forever.showModal(); setTrash({file,trashId}) }}>Delete Forever</div></li>

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
                                            <span className='text-xl'><AiFillFile/></span>
                                            <span>{file?.fileName?.length>22?file?.fileName?.substring(0, 20)+'...':file?.fileName}</span>
                                        </td>
                                        <td>{file?.fileType}</td>
                                        <td>{formatBytes(file?.fileSize)}</td>
                                        <td>{getDate(date)}</td>
                                        <td>{file?.path.split('/')[1]}</td>
                                        <td>
                                            <div className={`dropdown ${position > 52 ? 'dropdown-top' : 'dropdown-bottom'}   w-full flex justify-center `} >
                                                <label tabIndex={0} onClick={handlePosition} className=" cursor-pointer" ><BsThreeDotsVertical /></label>
                                                <ul

                                                    tabIndex={0} className="dropdown-content menu px-2   shadow bg-base-200 rounded-box w-52 -translate-x-20 ">

                                                    <li><div onClick={() => handleRestore(trashId)}>Restore</div></li>
                                                    <li><div onClick={() => { window.deleted_forever.showModal(); setTrash({file,trashId})}}>Delete Forever</div></li>

                                                </ul>
                                            </div>
                                        </td>
                                    </tr>
                                )
                            })
                        }



                    </tbody>
                </table>

            </div>

            <dialog id="deleted_forever" className="bg-transparent">
                <form method="dialog" className="modal-box">
                    <h3 className="font-bold text-lg">Delete Forever!</h3>
                    <p className="py-4">"{trash?.file?.fileName}" will be deleted forever!!! </p>
                    <div className="modal-action">

                        <button className="btn">Cancel</button>
                        <button className="btn btn-error" onClick={() => handleDeleteFoever(trash?.trashId)}>Delete</button>
                    </div>
                </form>
            </dialog>

            <dialog id="all_deleted_forever" className="bg-transparent">
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

export default TrashListView
