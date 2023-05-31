import {CiHardDrive} from 'react-icons/ci'
import {AiFillStar, AiOutlineShareAlt, AiFillMessage, AiOutlineCloudUpload, AiFillFolder} from 'react-icons/ai'
import {FaTrashAlt} from 'react-icons/fa'
import {GoPlus} from 'react-icons/go'
import {RiFolderUploadFill} from 'react-icons/ri'
import CreateFolder from '../activity/CreateFolder'
import { useState } from 'react'


const SideBar = () => {

    const[createFolder,setCreateFolder] = useState(false)
    console.log(createFolder)

    const fileUploadHandle= (event)=>{
         
        console.log(event.target.files[0]?.name)
         
    }


    return (
        <>
            {createFolder && <CreateFolder />}
            <div className=' shadow-xl bg-base-200 h-screen fixed z-20'>
                <div className=' px-8 my-16  w-full'>

                    <div>
                        <div> Eternal Space </div>
                    </div>
                    <div className="mt-10 dropdown dropdown-bottom">
                        <label tabIndex={0} className="btn m-1"><GoPlus className='mr-2'/> New</label>
                        <ul tabIndex={0} className="dropdown-content menu p-2 shadow bg-base-300 rounded-box w-52">
                            <li><div onClick={()=>setCreateFolder(true)}><AiFillFolder />New Folder</div></li>
                            <li><div >
                                <AiOutlineCloudUpload />
                                <label htmlFor='fileUpload'>Upload File</label>
                                <input type="file" multiple onChange={fileUploadHandle} id="fileUpload" hidden/>
                                </div></li>
                            <li><div>
                                <RiFolderUploadFill />
                                <label htmlFor='folderUpload'>Upload Folder</label>
                                <input type="file" webkitdirectory="true" onChange={fileUploadHandle} id="folderUpload" hidden/>
                            </div></li>
                        </ul>
                    </div>

                    <ul className="menu menu-compact lg:menu-normal bg-base-200 w-56 p-2 rounded-box">
                        <li><a><CiHardDrive /> My Disk</a></li>
                        <li><a><AiFillStar />Starred</a></li>
                        <li><a><AiOutlineShareAlt />Shared with me</a></li>
                        <li><a><AiFillMessage />Message</a></li>
                        <li><a><FaTrashAlt />Trash</a></li>
                    </ul>


                </div>
            </div>
        </>
    )
}

export default SideBar