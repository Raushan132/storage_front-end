import { useDispatch, useSelector } from "react-redux"
import { LISTVIEW } from "../../redux/view_layout/viewTypes"
import Layout from "../../layout/layout"
import View from "../../components/activity/View"
import { useEffect } from "react"
import { getUserId } from "../../redux/fetch/baseUrl"
import { fetchTrashFile } from "../../redux/fetch/file/fileActions"
import TrashGridView from "../../components/view/TrashGridView"
import TrashListView from "../../components/view/TrashListView"

const Trash = () => {
 
  const {render} = useSelector(state=>state.isRender)
    const currentView = useSelector(state=> state?.viewLayout)
    const {loading,file, error} = useSelector(state=> state?.fileReducer)
    
     console.log("here ther",file)

    const dispatch = useDispatch()
    const userId = getUserId()
    useEffect(()=>{

      dispatch(fetchTrashFile())

    },[render]);
  console.log(file)
  return (
    <>
     
     <Layout>
        <View pathname={''} />

        <div className='mt-8'>

    <div  className="w-full min-h-[550px]  overflow-y-auto">
       
     {currentView=== LISTVIEW? <TrashListView data={file} />     :   <TrashGridView trashFiles={file}/>}
      
    </div>

      </div>
      </Layout>

    </>
  )
  
}

export default Trash