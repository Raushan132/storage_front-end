import { useSelector } from "react-redux"
import { motion } from 'framer-motion'
import { LISTVIEW } from "../../redux/view_layout/viewTypes"
import Layout from "../../layout/layout"
import View from "../../components/activity/View"
import { useEffect, useState } from "react"
import { getSharedFiles } from "../../util/Util"
import SharedGridView from "../../components/view/SharedGridView"
import View_details from "../../components/activity/View_details"
import { VIEW_DETAIL_OPEN } from "../../redux/view_details/detailsType"

const Shared = () => {
  const currentView = useSelector(state => state?.viewLayout)
  const { render } = useSelector(state => state?.isRender)
  const isViewDetailsVisible = useSelector(state => state?.isDetailsVisible) === VIEW_DETAIL_OPEN


  const [sharedData, setSharedData] = useState([])

  const folders = []
  const files = []


  sharedData.forEach(data => {
    const { file } = data
    if (file.folder) folders.push(data)
    else files.push(data)
  })


  useEffect(() => {
    getSharedFiles().then(res => setSharedData(res));
  }, [render])

  return (

    <>
      <Layout>
        <View pathname='' />
        <div className='mt-8'>

          <div className="w-full h-full flex gap-2 ">
            <div
             
              className="w-full min-h-[550px] overflow-y-auto"
            >

              {currentView === LISTVIEW ? '' : <SharedGridView folders={folders} files={files} />}

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

export default Shared