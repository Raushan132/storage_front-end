import { AiOutlineClose } from 'react-icons/ai'
import { useDispatch } from 'react-redux'
import { viewDetailClose } from '../../redux/view_details/detailsActions'


const View_details = () => {

  const dispatch = useDispatch()

  const handleCancelDetail = () => {
    dispatch(viewDetailClose())
  }

  return (
    <div className='bg-gray-900  w-[310px] h-[75%] overflow-y-auto'>
      <div className='flex justify-between items-center pr-5'>
        <div className='text-xl  bg-gray-900 inline-flex w-32 h-10 justify-center items-end mb-2'><span className='border-0 border-b-[2px] border-blue-900 '>Details</span> </div>
        <div className='text-xl cursor-pointer' onClick={handleCancelDetail}><AiOutlineClose /></div>
      </div>
      <img src="https://www.entoin.com/images/drk1.jpg" alt="nothing is slected" />

      <div>
        <div>Who has access</div>
        <div>Private | Public</div>
      </div>
      <hr />
      <div className='my-2'>
        <div className='font-bold text-lg my-2 mx-4'>File Details</div>

        <div className='flex flex-col gap-3'>
          <div className='flex flex-col ml-4'><span className='text-sm'>File Name</span><span>Name of the file</span></div>
          <div className='flex flex-col ml-4'><span className='text-sm'>Type</span><span>Video</span></div>
          <div className='flex flex-col ml-4'><span className='text-sm'>Size</span><span>155.7 MB</span></div>
          <div className='flex flex-col ml-4'><span className='text-sm'>Location</span><span>Disk</span></div>
          <div className='flex flex-col ml-4'><span className='text-sm'>Owner</span><span>me</span></div>
          <div className='flex flex-col ml-4'><span className='text-sm'>modified</span><span>13/10/2023</span></div>
          <div className='flex flex-col ml-4'><span className='text-sm'>Created</span><span>13/05/2023</span></div>

        </div>

      </div>
    </div>
  )
}

export default View_details