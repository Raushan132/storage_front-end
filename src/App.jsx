
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
import { useEffect, useState } from 'react'
import { AQUA, CUPCAKE, DARK, FOREST, LIGHT, NIGHT, WIREFRAME } from './data/themes'




function App() {

   const[customThemes,setCustomThemes] = useState("")

  

  useEffect(() => {
    document.querySelector('html').setAttribute('data-theme', customThemes);
  }, [customThemes]);



  return (
    <>


      <Routes>
        <Route path="/" element={<Navigate to="/auth" />} />

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


      {/* btn is available inside custom themes for change the theme. Below its dialog box */}
      <input type="checkbox" id="custom_themes" className="modal-toggle" />
      <div className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-lg">Themes!</h3>
          <p className="py-4 grid grid-cols-3 gap-5">
            <div className='border h-32 px-2 py-2 bg-white shadow-xl shadow-cyan-900' onClick={()=>{setCustomThemes(LIGHT)}}>LIGHT</div>
            <div className='border h-32 px-2 py-2 bg-[url("./assets/wireframe.png")] bg-cover shadow-xl shadow-cyan-900 text-White' onClick={()=>{setCustomThemes(WIREFRAME)}}>WIREFRAME</div>
            <div className='border h-32 px-2 text-yellow-600 py-2 bg-[url("./assets/cupcake.png")] bg-cover shadow-xl shadow-cyan-900' onClick={()=>{setCustomThemes(CUPCAKE)}}>CUPCAKE</div>
            <div className='border h-32 px-2 py-2 bg-black shadow-cyan-900 text-white' onClick={()=>{setCustomThemes(DARK)}}>DARK</div>
            <div className='border h-32 px-2 py-2 bg-[url("./assets/night.png")] bg-cover shadow-xl shadow-cyan-900 text-blue-50' onClick={()=>{setCustomThemes(NIGHT)}}>NIGHT</div>
            <div className='border h-32 px-2 py-2 bg-[url("./assets/forest.png")] bg-cover shadow-xl shadow-cyan-900' onClick={()=>{setCustomThemes(FOREST)}}>FOREST</div>
            <div className='border h-32 px-2 py-2 bg-[url("./assets/aqua.png")] bg-contain bg-center bg-no-repeat shadow-xl shadow-cyan-900' onClick={()=>{setCustomThemes(AQUA)}}>AQUA</div>
          </p>
          <div className="modal-action">
            <label htmlFor="custom_themes" className="btn">Done!</label>
           
          </div>
        </div>
      </div>



    </>
  )
}

export default App
