import { FaRegListAlt } from 'react-icons/fa'
import { BsGrid3X2 } from 'react-icons/bs'
import { AiOutlineInfoCircle } from 'react-icons/ai'
import Breadcrumbs from './Breadcrumbs'
import { useDispatch, useSelector } from 'react-redux'
import { GRIDVIEW,LISTVIEW } from '../../redux/view_layout/viewTypes'
import { gridView, listView } from '../../redux/view_layout/view_actions'
import { viewDetailClose, viewDetailOpen } from '../../redux/view_details/detailsActions'
import { VIEW_DETAIL_OPEN } from '../../redux/view_details/detailsType'
import { useLocation, useNavigate } from 'react-router-dom'
import { useEffect } from 'react'


const View = ({pathname}) => {
  const breadcrumbs = []
  if(useLocation().pathname.match('/user/drive/*'))
     breadcrumbs.push({pathname:'Drive',link:'/user/drive'})
  else if(useLocation().pathname.match('/user/starred'))
     breadcrumbs.push({pathname:'Starred',link:'/user/starred'})
  else if(useLocation().pathname.match('/user/trash'))
    breadcrumbs.push({pathname:'Trash',link:'/user/trash'})
    else if(useLocation().pathname.match('/user/search'))
    breadcrumbs.push({pathname:'Search',link:'/user/Search'})


  if(pathname!==''){
      const paths=  pathname.path.split('/').slice(1)
      
      console.log(paths)
      if(paths.length>1){
            paths.slice(1).forEach(path=>{
               const val= path.split(";")
               console.log("here",val)
               breadcrumbs.push({pathname:val[0],link:`/user/drive/${val[1]}`})
            })
      }

      breadcrumbs.push({pathname:pathname.fileName,link:''})

  }
  
  
  
  
  
  const currentView = useSelector((state=> state?.viewLayout))
  const isDetailsVisible = useSelector((state=> state?.isDetailsVisible))
  const dispatch = useDispatch();
  
  const handleView = () => {
    currentView === GRIDVIEW?  dispatch(listView(LISTVIEW)):dispatch(gridView(GRIDVIEW));
    
  }
  
  const handleViewDatails = () =>{
    isDetailsVisible === VIEW_DETAIL_OPEN ? dispatch(viewDetailClose()) : dispatch(viewDetailOpen())
    console.log("view.jsx view detail handle function:", isDetailsVisible)
  }
  
  return (
    <>
      <div className='flex justify-between  items-center pr-8'>
        <Breadcrumbs path={breadcrumbs} />
        <div className='flex justify-center items-center gap-2'>
         { !useLocation().pathname.match('/user/search') && <div className="tooltip tooltip-bottom" data-tip={currentView === GRIDVIEW ? 'List' :'Grid'}>
            <div onClick={handleView} className='hover:bg-gray-500 rounded-full w-10 h-10 flex justify-center items-center transition-all cursor-pointer'>
              {currentView === GRIDVIEW ? <FaRegListAlt /> : <BsGrid3X2 />}
            </div>
          </div>}

          <div className="tooltip tooltip-bottom" data-tip='view detail' onClick={handleViewDatails}>
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