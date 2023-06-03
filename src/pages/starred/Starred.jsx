import { useSelector } from "react-redux"
import GridView from "../../components/view/GridView"
import ListView from "../../components/view/ListView"
import { LISTVIEW } from "../../redux/view_layout/viewTypes"

const Starred = () => {
 
    const currentView = useSelector(state=> state?.viewLayout)

  return (
    <div className="w-full h-full ">
       
     {currentView=== LISTVIEW? <ListView />     :   <GridView />}
      
    </div>
  )
  
}

export default Starred