import { useDispatch, useSelector } from "react-redux"
import GridView from "../../components/view/GridView"
import ListView from "../../components/view/ListView"
import { LISTVIEW } from "../../redux/view_layout/viewTypes"
import View_details from "../../components/activity/View_details"
import { motion } from "framer-motion"
import { VIEW_DETAIL_OPEN } from "../../redux/view_details/detailsType"
import { useEffect } from "react"
import { fetchFiles } from "../../redux/fetch/file/fileActions"
import { getUserId } from "../../redux/fetch/baseUrl"
import Layout from "../../layout/layout"
import View from "../../components/activity/View"




const Drive = () => {

  const { loding, file, error } = useSelector(state => state.fileReducer)
  const allFiles = file.filter(file => !file.folder)
  const allFolders = file.filter(file => file.folder)

  const dispatch = useDispatch()
  const userId = getUserId()

  useEffect(() => {
    dispatch(fetchFiles(userId));
  }, []);



  const currentView = useSelector(state => state?.viewLayout)
  const isViewDetailsVisible = useSelector(state => state?.isDetailsVisible) === VIEW_DETAIL_OPEN

  const handleDrag = (e)=>{

  }

  
  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (!e.dataTransfer) return;
    const items=e.dataTransfer.items
    // console.log(items)
    for(let key=0; key<items.length ;key++){
          
          console.log(typeof(key))
          if(items[key].webkitGetAsEntry().isDirectory){
            console.log(items[key].webkitGetAsEntry().createReader())
                console.log("directory")
          }else if(items[key].webkitGetAsEntry().isFile){
            console.log("file")
          }


    }
    // console.log(items[0].webkitGetAsEntry().isDirectory)
    let files = Array.from(e.dataTransfer.files)
    if (files.length < 1) return;
    console.log(files)
  }

  return (

    <>
      <Layout>
        <View />
        <div className='mt-8'>

          <div className="w-full h-full flex gap-2 ">
            <div
              onDragOver={(e) => { e.preventDefault(); console.log('drag enter'); }}
              onDrop={handleDrop}
              className="w-full min-h-[550px] overflow-y-auto"
            >
              {currentView === LISTVIEW ? <ListView data={[...allFolders, ...allFiles]} /> : <GridView folders={allFolders} files={allFiles} />}
            </div>

            {isViewDetailsVisible && <motion.div className=""
              initial={{ width: 0 }}
              animate={{ width: 'initial' }}
              transition={{ duration: 0.2 }}
            >
              <View_details />
            </motion.div>
            }

          </div>

        </div>
      </Layout>

    </>
  )
}

export default Drive