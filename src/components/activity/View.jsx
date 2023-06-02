import { FaRegListAlt } from 'react-icons/fa'
import { BsGrid3X2 } from 'react-icons/bs'
import { AiOutlineInfoCircle } from 'react-icons/ai'
import Breadcrumbs from './Breadcrumbs'
import { useDispatch, useSelector } from 'react-redux'
import { GRIDVIEW,LISTVIEW } from '../../redux/view_layout/viewTypes'
import { gridView, listView } from '../../redux/view_layout/view_actions'


const View = () => {
  const breadcrumbs = ['Home', 'Document', 'Test']
  

 const currentView = useSelector((state=> state?.viewLayout))
 const dispatch = useDispatch();
 console.log(currentView)

  const handleView = () => {
    currentView === GRIDVIEW?  dispatch(listView(LISTVIEW)):dispatch(gridView(GRIDVIEW));
   
  }

  return (
    <>
      <div className='flex justify-between items-center'>
        <Breadcrumbs path={breadcrumbs} />
        <div className='flex justify-center items-center gap-2'>
          <div className="tooltip tooltip-bottom" data-tip={currentView === GRIDVIEW ? 'List' :'Grid'}>
            <div onClick={handleView} className='hover:bg-gray-500 rounded-full w-10 h-10 flex justify-center items-center transition-all cursor-pointer'>
              {currentView === GRIDVIEW ? <FaRegListAlt /> : <BsGrid3X2 />}
            </div>
          </div>

          <div className="tooltip tooltip-bottom" data-tip='view detail'>
            <div className='hover:bg-gray-500 rounded-full w-10 h-10 flex justify-center items-center transition-all cursor-pointer'>
              <AiOutlineInfoCircle />
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default View