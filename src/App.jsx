import Layout from './layout/layout'
import Drive from './pages/home/Drive'
import View from './components/activity/View'
import { Route, Routes } from 'react-router-dom'
import Trash from './pages/trash/Trash'
import Starred from './pages/starred/Starred'
import Shared from './pages/share/Shared'
import Messages from './pages/messages/Messages'
import Profile from './pages/profile/Profile'



function App() {



  return (
    <>
      <Layout>
        <View />
        <div className='mt-8'>
          <Routes>
              <Route path='/' element={<Drive />} />
              <Route path='/starred' element={<Starred />} />
              <Route path='/shared-with-me' element={<Shared />} />
              <Route path='/messages' element={<Messages />} />
              <Route path='/trash' element={<Trash />} />

              <Route path='/profile' element={<Profile />} />

          </Routes>
        </div>
      </Layout>

      
    </>
  )
}

export default App
