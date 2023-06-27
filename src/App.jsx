
import Drive from './pages/home/Drive'
import { Navigate, Route, Routes } from 'react-router-dom'
import Trash from './pages/trash/Trash'
import Starred from './pages/starred/Starred'
import Shared from './pages/share/Shared'
import Messages from './pages/messages/Messages'
import Profile from './pages/profile/Profile'
import EditProfile from './pages/profile/EditProfile'
import Auth from './pages/authentication/Auth'
import { RequireAuth } from 'react-auth-kit'
import DriveFolder from './pages/home/DriveFolder'
import SharedDownload from './pages/share/SharedDownload'



function App() {







  return (
    <>
     
          <Routes>
            <Route path="/"  element={<Navigate  to="/auth"/>} />
            
              <Route path="/share/*" element={<SharedDownload />} />

              <Route index path='/user/drive' element={
                <RequireAuth loginPath={'/auth'}> <Drive /></RequireAuth>
              } />
               <Route index path='/user/drive/:id' element={
                <RequireAuth loginPath={'/auth'}> <DriveFolder /></RequireAuth>
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
            
            <Route path="/auth" element={<Auth />} />

          </Routes>
     
      

      

    </>
  )
}

export default App
