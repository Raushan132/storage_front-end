import { useDispatch, useSelector } from "react-redux"
import GridView from "../../components/view/GridView"
import ListView from "../../components/view/ListView"
import { LISTVIEW } from "../../redux/view_layout/viewTypes"
import { useEffect } from "react"
import { fetchFilesWithStar } from "../../redux/fetch/file/fileActions"
import Layout from "../../layout/layout"
import View from "../../components/activity/View"

const Starred = () => {

  const currentView = useSelector(state => state?.viewLayout)

  const { loding, file, error } = useSelector(state => state.fileReducer)
  const allFiles = file.filter(file => !file.folder)
  const allFolders = file.filter(file => file.folder)

  const dispatch = useDispatch()


  useEffect(() => {
    dispatch(fetchFilesWithStar());
  }, []);


  return (
    <>
      <Layout>
        <View />
        <div className='mt-8'>
          <div className="w-full h-full ">

            {currentView === LISTVIEW ? <ListView data={[...allFolders, ...allFiles]} /> : <GridView folders={allFolders} files={allFiles} />}

          </div>
        </div>
      </Layout>
    </>
  )

}

export default Starred