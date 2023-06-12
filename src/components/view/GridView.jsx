import React, { useEffect, useRef, useState } from 'react'
import { AiFillFolder, AiFillFile, AiFillFolderOpen, AiOutlineStar, AiFillStar, AiOutlineDownload, AiFillEdit } from 'react-icons/ai'

import { BsThreeDotsVertical } from 'react-icons/bs'

const GridView = ({ folders, files }) => {

    const [position,setPosition] = useState(0)
   
   
    const handlePosition = (e) =>{
       const observer = new IntersectionObserver(entries=>{
        const {x,y}=entries[0].boundingClientRect
        setPosition(prev=>Math.floor(y*100/window.innerHeight))
        console.log(position)
       })
     
       
       observer.observe(e.target)
       console.log(window.innerHeight)
  

    }

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
                            <div className='text-lg flex items-center  w-48 rounded-lg px-4 py-2 justify-between bg-base-300 ' key={folder.fileId}>
                                <div className='flex justify-center gap-2 items-center'>
                                    <div className='text-xl'><AiFillFolder /></div>
                                    <div className='flex w-28'>
                                        {folder?.fileName.substring(0, 15)}
                                    </div>
                                </div>
                                <div className={`dropdown ${position>52?'dropdown-top':'dropdown-bottom'}   w-full flex justify-end `} onClick={handlePosition}>
                                    <label tabIndex={0}  className="cursor-pointer" ><BsThreeDotsVertical /></label>
                                    <ul tabIndex={0}  className="dropdown-content menu p-2 shadow bg-base-200 rounded-box w-52 translate-x-20 ">
                                       
                                        <li><a>Share</a></li>
                                        <li><a>Remove Star</a></li>
                                        <li><a>Rename</a></li>
                                        <hr />
                                        <li><a>View details</a></li>
                                        <li><a>Download</a></li>
                                        <hr />
                                        <li><a>Remove</a></li>
                                    </ul>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>}
            <div>
                <div className='text-2xl my-6'>Files</div>
                <div className='flex flex-wrap  gap-6'>
                    {files.map(file => {
                        return (
                            <div className='text-md flex items-center w-48 rounded-lg px-4 py-2 justify-between bg-base-300 ' key={file?.fileId}>
                                <div className='flex justify-center gap-2 items-center'>
                                    <div className='text-xl'><AiFillFile /></div>
                                    <div className='flex w-28'>
                                        {file?.fileName.substring(0, 15)}
                                    </div>
                                </div>
                                <div className={`dropdown ${position>52?'dropdown-top':'dropdown-bottom'}   w-full flex justify-end `} onClick={handlePosition}>
                                    <label tabIndex={0}  className="cursor-pointer" ><BsThreeDotsVertical /></label>
                                    <ul tabIndex={0}  className="dropdown-content menu px-2 shadow bg-base-200 rounded-box w-52 translate-x-20 ">
                                       
                                        <li><a>Share</a></li>
                                        <li><a>Remove Star</a></li>
                                        <li><a>Rename</a></li>
                                        <hr />
                                        <li><a>View details</a></li>
                                        <li><a>Download</a></li>
                                        <hr />
                                        <li><a>Remove</a></li>
                                    </ul>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    )
}

export default GridView