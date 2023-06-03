import React from 'react'
import customFiles from '../../data/customFiles.json'
import { AiFillFolder, AiFillFile, AiOutlineStar, AiFillStar, AiOutlineDownload, AiFillEdit } from 'react-icons/ai'
import { BsThreeDotsVertical } from 'react-icons/bs'

const GridView = () => {

    const folders = [];
    const files = [];

    customFiles.forEach(file => { file.isFolder ? folders.push(file) : files.push(file); })

    console.log(files)

    return (
        <div>
            <div>
                <div className='text-2xl my-6'>Folders</div>
                <div className='grid grid-cols-4 mx-4 gap-6'>
                    {folders.map(folder => {
                        return (
                            <div className='text-lg flex items-center w-48 rounded-lg px-4 py-2 justify-between bg-base-300 ' key={folder.fileId}>
                                <div className='flex justify-center gap-2 items-center'>
                                    <div className='text-xl'><AiFillFolder /></div>
                                    <div>
                                        {folder.fileName}
                                    </div>
                                </div>
                                <div className='cursor-pointer'><BsThreeDotsVertical /></div>
                            </div>
                        );
                    })}
                </div>
            </div>
            <div>
                <div className='text-2xl my-6'>Files</div>
                <div className='grid grid-cols-4 mx-4 gap-6'>
                    {files.map(file => {
                        return (
                            <div className='text-md flex items-center w-56 rounded-lg px-4 py-2 justify-between bg-base-300 ' key={file?.fileId}>
                                <div className='flex justify-center gap-2 items-center'>
                                    <div className='text-xl'><AiFillFile /></div>
                                    <div className='flex w-28'>
                                        {file?.fileName.substring(0,15)}
                                    </div>
                                </div>
                                <div className="dropdown dropdown-right  w-full flex justify-end">
                                    <label tabIndex={0} className="  cursor-pointer"><BsThreeDotsVertical /></label>
                                    <ul tabIndex={0} className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52">
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