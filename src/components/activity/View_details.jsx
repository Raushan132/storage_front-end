import { AiOutlineClose,AiFillStar } from 'react-icons/ai'
import { MdPublic } from 'react-icons/md'
import { useDispatch, useSelector } from 'react-redux'
import { viewDetailClose } from '../../redux/view_details/detailsActions'
import { baseUrl } from '../../redux/fetch/baseUrl'


const View_details = () => {

  const dispatch = useDispatch()
  const { loading, file, error } = useSelector(state => state.singleFileReducer)
 const userId=file?.userId

  const handleCancelDetail = () => {
    dispatch(viewDetailClose())
  }

  return (
    <div className='bg-gray-900  w-[310px] h-[565px] overflow-y-auto'>
      <div className='flex justify-between items-center pr-5'>
        <div className='text-xl  bg-gray-900 inline-flex w-32 h-10 justify-center items-end mb-2'><span className='border-0 border-b-[2px] border-blue-900 '>Details</span> </div>
        <div className='text-xl cursor-pointer' onClick={handleCancelDetail}><AiOutlineClose /></div>
      </div>
      <img src="https://www.entoin.com/images/drk1.jpg" alt="nothing is slected" />

    {  file!==''?   <div>

          <div className='flex flex-col px-4 my-4'>
            <div>Who has access</div>
            <div className='px-2'>{file.public ? <span className='flex gap-2 items-center'><MdPublic />Public</span> : 
                  <span className='flex gap-2 items-center text-sm'> <img draggable={false} src={`${ baseUrl+'/img/'+userId}`} alt="" className='w-5 h-5 rounded-full'  />Private to you</span> }</div>
          </div>
          <hr />
          <div className='my-2'>
            <div className='font-bold text-lg my-2 mx-4'>File Details</div>

            <div className='flex flex-col gap-3'>
              <div className='flex gap-2 items-center justify-between mx-4'><span className='text-sm'>File Name</span><span className='text-[12px] '>{file.fileName.length>32?file.fileName.substring(0,30)+"...":file.fileName}</span></div>
              <div className='flex gap-2 items-center justify-between mx-4'><span className='text-sm'>Type:</span><span className='text-[12px] '>{file.fileType}</span></div>
              <div className='flex gap-2 items-center justify-between mx-4'><span className='text-sm'>Size:</span><span className='text-[12px] '>{file.folder ? "-" : file.fileSize}</span></div>
              <div className='flex gap-2 items-center justify-between mx-4'><span className='text-sm'>Location:</span><span className='text-[12px] '>path</span></div>
              <div className='flex gap-2 items-center justify-between mx-4'><span className='text-sm'>Owner:</span><span className='text-[12px] '>Me</span></div>
              <div className='flex gap-2 items-center justify-between mx-4'><span className='text-sm'>Starred:</span><span className='text-[12px] '>{file.hasStar ? <AiFillStar/> : '-'}</span></div>
              <div className='flex gap-2 items-center justify-between mx-4'><span className='text-sm'>Created:</span><span className='text-[12px] '>{file.dateOfOpened}</span></div>

            </div>

          </div>
        </div> :<div className='flex justify-center items-center my-10'>
                    Select an item to see the details
                </div>
        }
    </div>
  )
}

export default View_details