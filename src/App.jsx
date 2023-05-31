import Layout from './layout/layout'
import Drive from './pages/home/Drive'
import View from './components/activity/View'



function App() {



  return (
    <>
      <Layout>
        <View />
        <div className='mt-8'>
          <Drive />
        </div>
      </Layout>
    </>
  )
}

export default App
