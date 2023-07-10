import { CiHardDrive } from 'react-icons/ci'
import { AiFillStar, AiOutlineShareAlt, AiFillMessage, AiOutlineCloudUpload, AiFillFolder, AiFillCloud } from 'react-icons/ai'
import { FaTrashAlt } from 'react-icons/fa'
import { GoPlus } from 'react-icons/go'
import { RiFolderUploadFill } from 'react-icons/ri'
import CreateFolder from '../activity/CreateFolder'
import { useEffect, useState } from 'react'
import axios from 'axios'
import { Link, useLocation } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { createFolderVisible } from '../../redux/create_Folder/createFolderAction'
import { baseUrl, getCookie, getUserId } from '../../redux/fetch/baseUrl'
import RenameFile from '../activity/RenameFile'
import { reRender } from '../../redux/render/renderAction'
import ShareDialog from '../activity/ShareDialog'
import formatBytes from '../../data/ByteFormat'
import Logo from '../../assets/logo.png'


const SideBar = () => {

    const {render} = useSelector(state=> state.isRender)
    const {pathname} = useLocation()

    const iscreateFolderVisible= useSelector(state=> state?.isCreateFolderVisible);
    const {visible}= useSelector(state=> state?.renameVisibleReduce);
    const {shareBtnVisible} = useSelector(state=> state.isShareBtnVisible)
    const isrenameFileVisible=visible
    const dispatch = useDispatch()

    const [storage,setStorage]= useState({
        used:0,
        byte:0,
        total:`1 GB`
    })
   
    const handleCreateFolder = ()=>{
         if(!iscreateFolderVisible)
            dispatch(createFolderVisible())
    }


    useEffect(()=>{
       
            
             axios.get(`${baseUrl}/storage`,{
                headers: {
                    "Content-Type": "multipart/form-data",
                    'Authorization': getCookie()
                  }
            }).then(res=>{
                const totalSize =res.data.totalSize;
                const used = res.data.used;
                const per =  Number((used*100)/totalSize).toFixed(2);
                const size = formatBytes(totalSize);
                const b = formatBytes(used);
                setStorage(prev => ( {used:per,byte:b,total: size}));
                
            })
      

    },[render])

    const [progress, setProgress] = useState(0);
    const [cancelRequests,setCancelRequests] =useState()
    

    const onUploadProgress = (progressEvent) => {
        const { loaded, total } = progressEvent;
        let percent = Math.floor((loaded * 100) / total);
        console.log("here", loaded, total);
        if (percent < 100) {
            setProgress(percent)
        } else {
            setProgress(0);
        }
    };

    const handleCancleBtn = ()=>{
        console.log("first")
        cancelRequests.cancel();
        
    }

    const userId = getUserId()

    const fileUploadHandle = async (event) => {

        if (event.target.files?.length > 0) {
            const files = event.target.files
            
            const formData = new FormData();
            formData.append("userId", userId)
            if(pathname.match('/user/drive')!==null  && pathname.match('/user/drive')?.input.split("/").length===4){
                const parentFolderId= pathname.match('/user/drive')?.input.split("/")[3]
                formData.append("parentFolderId", parentFolderId);
              }else
                 formData.append("parentFolderId", userId);
            console.log(files)
            for (const key of Object.keys(files)){
                formData.set("files", files[key]);

                const cancelRequest= axios.CancelToken.source();
                 setCancelRequests(cancelRequest);

                 axios.post(`${baseUrl}/addFiles`,
                    formData, {
                     headers: {
                       "Content-Type": "multipart/form-data",
                       'Authorization': getCookie()
                     },
                     onUploadProgress,
                    cancelToken: cancelRequest.token
                    }
                 ).then(res => {
                console.log(res.data)
                   dispatch(reRender(render))
                 })

           
            }
          
        }

    }

    const folderUploadHandle = (e)=>{
        if(e.target.files.length==0) return;
        const files= e.target.files
        const folderName=e.target.files[0].webkitRelativePath.split('/')[0]

        const formData = new FormData()
        console.log(userId)
        formData.append('userId',userId)
        formData.append('folderName',folderName)
        if(pathname.match('/user/drive')!==null  && pathname.match('/user/drive')?.input.split("/").length===4){
            const parentFolderId= pathname.match('/user/drive')?.input.split("/")[3]
            formData.append("parentFolderId", parentFolderId);
          }else
             formData.append("parentFolderId", userId);
        
        for (const key of Object.keys(files)){
            
            formData.append("files", files[key]);
            
        }
       
        
            const cancelRequest= axios.CancelToken.source();
             setCancelRequests(cancelRequest);

             axios.post(`${baseUrl}/addFolder`,
                formData, {
                 headers: {
                   "Content-Type": "multipart/form-data",
                   'Authorization': getCookie()
                 },
                 onUploadProgress,
                cancelToken: cancelRequest.token
                }
             ).then(res => {
            console.log(res.data)
            dispatch(reRender(render))
             })

       
        



    }



    return (
        <>
            {iscreateFolderVisible && <CreateFolder />}
            {isrenameFileVisible && <RenameFile/>}
           { shareBtnVisible && <ShareDialog />}
            <div className=' shadow-xl bg-base-200 h-screen fixed z-20'>
                <div className=' px-8 my-8  w-full'>

                    <div>
                        <div className='w-36 h-32'> <img className='w-full h-full' draggable={false} src={Logo} alt="logo" /> </div>
                    </div>
                    <div className="mt-10 dropdown dropdown-right">
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
                                <input type="file" webkitdirectory="true" onChange={folderUploadHandle} id="folderUpload" hidden />
                            </div></li>
                        </ul>
                    </div>

                    <ul className="menu menu-compact lg:menu-normal bg-base-200 w-56 p-2 rounded-box">
                        <li draggable={false}><Link to="/user/drive"><CiHardDrive /> My Disk</Link></li>
                        <li><Link to="/user/starred"><AiFillStar />Starred</Link></li>
                        <li><Link to="/user/shared-with-me"><AiOutlineShareAlt />Shared with me</Link></li>
                        <li><Link to="/user/messages"><AiFillMessage />Message</Link></li>
                        <li><Link to="/user/trash"><FaTrashAlt />Dustbin</Link></li>
                    </ul>

                    <div>
                         <div className='flex gap-2 items-center px-4'><span><AiFillCloud /></span> <span>Storage</span></div>
                         <div><progress className={`progress ${storage.used>85?'progress-error':'progress-success'} w-48 px-4`} value={storage.used<1?1:storage.used} max="100"></progress></div>
                         <div className='flex gap-2 items-center px-4 text-[13px]'>{storage.byte} of {storage.total} used</div>
                    </div>

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