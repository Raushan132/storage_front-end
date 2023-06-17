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
import { uploadFiles } from "../../util/Util"




const Drive = () => {

  const {render} = useSelector(state=> state.isRender)
  const { loading, file, error } = useSelector(state => state.fileReducer)
  const allFiles = file.filter(file => !file.folder)
  const allFolders = file.filter(file => file.folder)

  const dispatch = useDispatch()
  const userId = getUserId()

  useEffect(() => {
    dispatch(fetchFiles(userId));
  }, [render]);



  const currentView = useSelector(state => state?.viewLayout)
  const isViewDetailsVisible = useSelector(state => state?.isDetailsVisible) === VIEW_DETAIL_OPEN



  
  
  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (!e.dataTransfer) return;
    const items=e.dataTransfer.items
    const sendingFiles=[]
    const allFiles=[]
    for(let key=0; key<items.length ;key++){
        
          if(items[key].webkitGetAsEntry().isDirectory){
             const reader= items[key].webkitGetAsEntry().createReader()
              const tempFiles=[]
              const folderName=items[key].webkitGetAsEntry().name
                reader.readEntries((entrie)=>{
                  entrie.map(files=>{
                         files.isFile && files.file(f=> f.name!='desktop.ini' && tempFiles.push(f))
                  })
                })
                sendingFiles.push({
                  folderName,
                  allFiles:tempFiles
                })
          }else if(items[key].webkitGetAsEntry().isFile){
            
            const reader= items[key].webkitGetAsEntry().file(f=>allFiles.push(f))
            
            
          }
         
    }
    sendingFiles.push({folderName:'',allFiles})
    setTimeout(()=>{ uploadFiles(sendingFiles,userId,userId)},500)
   
    
  
  }

  return (

    <>
      <Layout>
        <View pathname='' />
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