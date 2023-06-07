import Layout from './layout/layout'
import Drive from './pages/home/Drive'
import View from './components/activity/View'
import { Route, Routes, useMatch } from 'react-router-dom'
import Trash from './pages/trash/Trash'
import Starred from './pages/starred/Starred'
import Shared from './pages/share/Shared'
import Messages from './pages/messages/Messages'
import Profile from './pages/profile/Profile'
import EditProfile from './pages/profile/EditProfile'
import Login from './pages/authentication/Auth'
import Auth from './pages/authentication/Auth'



function App() {

 
 const path = useMatch("/user/*")

 


  return (
    <>
     { path && <Layout>
        <View />
        <div className='mt-8'>
          <Routes>
             <Route path="/user">

              <Route index path='/user/drive' element={<Drive />} />
              <Route path='/user/starred' element={<Starred />} />
              <Route path='/user/shared-with-me' element={<Shared />} />
              <Route path='/user/messages' element={<Messages />} />
              <Route path='/user/trash' element={<Trash />} />

              <Route path='/user/profile' element={<Profile />} />
              <Route path='/user/editProfile' element={<EditProfile />} />
             </Route>

          </Routes>
        </div>
      </Layout>
      }

      {
        path===null &&  <Routes>
                               <Route path="/auth" element={<Auth />} />
                         </Routes> 
      }
      
    </>
  )
}

export default App
