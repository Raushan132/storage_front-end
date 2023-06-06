import Layout from './layout/layout'
import Drive from './pages/home/Drive'
import View from './components/activity/View'
import { Route, Routes, useLocation } from 'react-router-dom'
import Trash from './pages/trash/Trash'
import Starred from './pages/starred/Starred'
import Shared from './pages/share/Shared'
import Messages from './pages/messages/Messages'
import Profile from './pages/profile/Profile'
import EditProfile from './pages/profile/EditProfile'
import Login from './pages/authentication/Login'



function App() {

 const path= useLocation()
 const isLoginPath= path.pathname !=='/login'
 


  return (
    <>
     { isLoginPath && <Layout>
        <View />
        <div className='mt-8'>
          <Routes>
              <Route path='/' element={<Drive />} />
              <Route path='/starred' element={<Starred />} />
              <Route path='/shared-with-me' element={<Shared />} />
              <Route path='/messages' element={<Messages />} />
              <Route path='/trash' element={<Trash />} />

              <Route path='/profile' element={<Profile />} />
              <Route path='/editProfile' element={<EditProfile />} />

          </Routes>
        </div>
      </Layout>
      }

      {
        !isLoginPath && <Login />
      }
      
    </>
  )
}

export default App
