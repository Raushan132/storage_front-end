import {CiHardDrive} from 'react-icons/ci'
import {AiFillStar, AiOutlineShareAlt, AiFillMessage, AiOutlineCloudUpload, AiFillFolder} from 'react-icons/ai'
import {FaTrashAlt} from 'react-icons/fa'
import {GoPlus} from 'react-icons/go'
import {RiFolderUploadFill} from 'react-icons/ri'


const SideBar = () => {
    return (
        <>
            <div className=' shadow-xl h-screen fixed'>
                <div className=' px-8 my-16  w-full'>

                    <div>
                        <div> Eternal Space </div>
                    </div>
                    <div className="mt-10 dropdown dropdown-bottom">
                        <label tabIndex={0} className="btn m-1"><GoPlus className='mr-2'/> New</label>
                        <ul tabIndex={0} className="dropdown-content menu p-2 shadow bg-black rounded-box w-52">
                            <li><a><AiFillFolder />New Folder</a></li>
                            <li><a><AiOutlineCloudUpload />Upload File</a></li>
                            <li><a><RiFolderUploadFill />Upload Folder</a></li>
                        </ul>
                    </div>

                    <ul className="menu menu-compact lg:menu-normal bg-base-100 w-56 p-2 rounded-box">
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