import { CiHardDrive } from 'react-icons/ci'
import { AiFillStar, AiOutlineShareAlt, AiFillMessage, AiOutlineCloudUpload, AiFillFolder } from 'react-icons/ai'
import { FaTrashAlt } from 'react-icons/fa'
import { GoPlus } from 'react-icons/go'
import { RiFolderUploadFill } from 'react-icons/ri'
import CreateFolder from '../activity/CreateFolder'
import { useState } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { createFolderVisible } from '../../redux/create_Folder/createFolderAction'


const SideBar = () => {

    
    const iscreateFolderVisible= useSelector(state=> state?.isCreateFolderVisible);
    const dispatch = useDispatch()
    const handleCreateFolder = ()=>{
         if(!iscreateFolderVisible)
            dispatch(createFolderVisible())
    }




    const [progress, setProgress] = useState(0);
    const [cancelRequests,setCancelRequests] =useState()
    console.log(iscreateFolderVisible)

    const onUploadProgress = (progressEvent) => {
        const { loaded, total } = progressEvent;
        let percent = Math.floor((loaded * 100) / total);
        console.log("here", loaded, total);
        if (percent < 100) {
            console.log(`${loaded} bytes of ${total} bytes. ${percent}%`);
            setProgress(percent)
        } else {
            setProgress(0);
        }
    };

    const handleCancleBtn = ()=>{
        console.log("first")
        cancelRequests.cancel();
        
    }

    const fileUploadHandle = async (event) => {

        if (event.target.files?.length > 0) {
            const files = event.target.files
            const userId = "5fa14b19-fc64-4b69-9fab-6aee7f76d7f7"
            const formData = new FormData();
            formData.append("userId", userId)
            formData.append("parentFolderId", userId);

            for (const key of Object.keys(files))
                formData.set("files", files[key]);

                const cancelRequest= axios.CancelToken.source();
                 setCancelRequests(cancelRequest);

                 axios.post(`http://localhost:8081/addFiles`,
                    formData, {
                     headers: {
                       "Content-Type": "multipart/form-data",
                     },
                     onUploadProgress,
                    cancelToken: cancelRequest.token
                    }
                 ).then(res => {
                console.log(res.data)
                 })

            axios.all()
          
        }

    }


    return (
        <>
            {iscreateFolderVisible && <CreateFolder />}
            <div className=' shadow-xl bg-base-200 h-screen fixed z-20'>
                <div className=' px-8 my-16  w-full'>

                    <div>
                        <div> Eternal Space </div>
                    </div>
                    <div className="mt-10 dropdown dropdown-bottom">
                        <label tabIndex={0} className="btn m-1"><GoPlus className='mr-2' /> New</label>
                        <ul tabIndex={0} className="dropdown-content menu p-2 shadow bg-base-300 rounded-box w-52">
                            <li><div onClick={handleCreateFolder}><AiFillFolder />New Folder</div></li>
                            <li><div >
                                <AiOutlineCloudUpload />
                                <label htmlFor='fileUpload'>Upload File</label>
                                <input type="file" multiple onChange={fileUploadHandle} id="fileUpload" hidden />
                            </div></li>
                            <li><div>
                                <RiFolderUploadFill />
                                <label htmlFor='folderUpload'>Upload Folder</label>
                                <input type="file" webkitdirectory="true" onChange={fileUploadHandle} id="folderUpload" hidden />
                            </div></li>
                        </ul>
                    </div>

                    <ul className="menu menu-compact lg:menu-normal bg-base-200 w-56 p-2 rounded-box">
                        <li draggable={false}><Link to="/user/drive"><CiHardDrive /> My Disk</Link></li>
                        <li><Link to="/user/starred"><AiFillStar />Starred</Link></li>
                        <li><Link to="/user/shared-with-me"><AiOutlineShareAlt />Shared with me</Link></li>
                        <li><Link to="/user/messages"><AiFillMessage />Message</Link></li>
                        <li><Link to="/user/trash"><FaTrashAlt />Trash</Link></li>
                    </ul>


                </div>
            </div>

            {/* progress bar below */}
            {
                progress > 0 &&
                <div className='fixed left-[80%] top-[80%]' onClick={handleCancleBtn}>
                    <div className="radial-progress text-success" style={{ "--value": progress }}>{progress}%</div>
                    
                </div>
            }
        </>
    )
}

export default SideBar