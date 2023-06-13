import { useDispatch, useSelector } from "react-redux"
import GridView from "../../components/view/GridView"
import ListView from "../../components/view/ListView"
import { LISTVIEW } from "../../redux/view_layout/viewTypes"
import Layout from "../../layout/layout"
import View from "../../components/activity/View"
import { useEffect } from "react"
import { getUserId } from "../../redux/fetch/baseUrl"
import { fetchTrashFile } from "../../redux/fetch/file/fileActions"

const Trash = () => {
 
    const currentView = useSelector(state=> state?.viewLayout)
    const {loading,file, error} = useSelector(state=> state?.fileReducer)
    const dispatch = useDispatch()
    const userId = getUserId()
    useEffect(()=>{

      dispatch(fetchTrashFile())

    },[]);
  console.log(file)
  return (
    <>
     
     <Layout>
        <View />

        <div className='mt-8'>

    <div className="w-full h-full ">
       
     {/* {currentView=== LISTVIEW? <ListView />     :   <GridView />} */}
      
    </div>

      </div>
      </Layout>

    </>
  )
  
}

export default Trash