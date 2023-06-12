
import Drive from './pages/home/Drive'
import { Route, Routes } from 'react-router-dom'
import Trash from './pages/trash/Trash'
import Starred from './pages/starred/Starred'
import Shared from './pages/share/Shared'
import Messages from './pages/messages/Messages'
import Profile from './pages/profile/Profile'
import EditProfile from './pages/profile/EditProfile'
import Auth from './pages/authentication/Auth'
import { RequireAuth } from 'react-auth-kit'



function App() {







  return (
    <>
     
          <Routes>
            <Route path="/user" >

              <Route index path='/user/drive' element={
                <RequireAuth loginPath={'/auth'}> <Drive /></RequireAuth>
              } />

              <Route path='/user/starred' element={
                <RequireAuth loginPath={'/auth'}> <Starred /></RequireAuth>
              } />

              <Route path='/user/shared-with-me' element={
              <Shared />
              } />

              <Route path='/user/messages' element={
              <RequireAuth loginPath={'/auth'}> <Messages /></RequireAuth>
              } />
              <Route path='/user/trash' element={
              <RequireAuth loginPath={'/auth'}> <Trash /></RequireAuth>
              } />

              <Route path='/user/profile' element={
              <RequireAuth loginPath={'/auth'}> <Profile /></RequireAuth>
              } />
              <Route path='/user/editProfile' element={
              <RequireAuth loginPath={'/auth'}> <EditProfile /></RequireAuth>
              } />
            </Route>

            <Route path="/auth" element={<Auth />} />

          </Routes>
     
      

      

    </>
  )
}

export default App
