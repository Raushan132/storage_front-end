import { useSelector } from "react-redux"
import GridView from "../../components/view/GridView"
import ListView from "../../components/view/ListView"
import { LISTVIEW } from "../../redux/view_layout/viewTypes"
import View_details from "../../components/activity/View_details"
import { motion } from "framer-motion"
import { VIEW_DETAIL_OPEN } from "../../redux/view_details/detailsType"

import { useNavigate } from "react-router-dom"
import { useEffect } from "react"
import { document } from "postcss"
import Authorization from "../../util/Authorization"


const Drive = () => {
 
  // const navigate = useNavigate()
  // useEffect(()=>{
  //   if(document.cookie=="")

  //     navigate("/auth",{replace:true})
    
  // },[]);

   
 
  const currentView = useSelector(state=> state?.viewLayout)
  const isViewDetailsVisible = useSelector(state => state?.isDetailsVisible) === VIEW_DETAIL_OPEN
  
  const handleDrop= (e)=>{
      e.preventDefault();
      e.stopPropagation();
      if (!e.dataTransfer) return;
      let files=Array.from(e.dataTransfer.files)
      if(files.length<1) return;
      console.log(files)
  }

  return (
    <div className="w-full h-full flex gap-2 ">
       <div 
        onDragOver={(e)=>{e.preventDefault();console.log('drag enter');}}
        onDrop={handleDrop}
        
        >
            {currentView=== LISTVIEW? <ListView />     :   <GridView />}
        </div>  
      
   { isViewDetailsVisible && <motion.div className=""
       initial={{ width:0}}
       animate={{width:'initial'}}
       transition={{duration:0.2}}
     >
           <View_details />
      </motion.div>
   }

    </div>
  )
}

export default Drive