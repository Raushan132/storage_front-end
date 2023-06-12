import { useSelector } from "react-redux"
import GridView from "../../components/view/GridView"
import ListView from "../../components/view/ListView"
import { LISTVIEW } from "../../redux/view_layout/viewTypes"
import Layout from "../../layout/layout"
import View from "../../components/activity/View"

const Shared = () => {
  const currentView = useSelector(state => state?.viewLayout)

  return (

    <>
      <Layout>
        <View />
        <div className='mt-8'>
          <div className="w-full h-full ">

            {/* {currentView === LISTVIEW ? <ListView /> : <GridView />} */}

          </div>
        </div>
      </Layout>
    </>
  )
}

export default Shared