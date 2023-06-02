import React from 'react'
import {AiTwotoneFolderOpen,AiFillFile,AiOutlineStar, AiFillStar,AiOutlineDownload, AiFillEdit} from 'react-icons/ai'
import {BsThreeDotsVertical} from 'react-icons/bs'
import data from '../../data/customFiles.json'
import formatBytes from '../../data/ByteFormat';
import DataTable, { createTheme } from 'react-data-table-component';
import customStyles from '../../data/CustomTableStyle'



const ListView = () => {

    

    const columns = [
        {
            name: 'Name',
            sortable: true,
            grow:2,
            selector: row => { return (<div className='flex justify-center items-center gap-2'>
                                          <div className='text-lg'>
                                              {row.isFolder? <AiTwotoneFolderOpen /> :<AiFillFile/> }
                                          </div>
                                          <div>
                                             {row.fileName}
                                          </div>
                                     </div>
                                     )
                             },
        },
        {
            name: 'Type',
            cell: row => row.fileType,
        },
        {
            name: 'Size',
            cell: row => row?.fileSize && formatBytes(row.fileSize,0) || '. . .',
        },
        {
            cell: row => {
                            return (
                                <>
                                <div className='flex gap-6 text-[16px]'>
                                    <div className='cursor-pointer'>
                                        <AiOutlineDownload />
                                    </div>
                                    <div className='cursor-pointer'>
                                        <AiFillEdit />
                                    </div>
                                    <div className='cursor-pointer'>
                                        {row?.hasStar? <AiFillStar /> : <AiOutlineStar />}
                                    </div>
                                </div>
                                </>
                            );
                        },
        },

        {
           
            cell: row => {
                            return (
                                <div className="dropdown dropdown-bottom  px-8 w-full flex justify-end">
                                <label tabIndex={0} className="  cursor-pointer"><BsThreeDotsVertical /></label>
                                <ul tabIndex={0} className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52">
                                  { row.isFolder && <li><a>Open</a></li>}
                                  <hr/>
                                  <li><a>Share</a></li>
                                  <li><a>Remove Star</a></li>
                                  <li><a>Rename</a></li>
                                  <hr/>
                                  <li><a>View details</a></li>
                                  <li><a>Download</a></li>
                                  <hr/>
                                  <li><a>Remove</a></li>
                                </ul>
                              </div>
                               
                            );
                        },
            
        },

    ];
    

    console.log(data);
  return (
    <>

       <DataTable
            columns={columns}
            data={data}
            customStyles={customStyles}
            style={{height:'100vh',background:'#f00'}}
           
            
            
        />
      
    </>
  )
}

export default ListView