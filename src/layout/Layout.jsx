import React from 'react'
import Topbar from '../components/topbar/TopBar'
import SideBar from '../components/sidebar/SideBar'
const Layout = ({ children }) => {
  return (
    <>
      <Topbar />
      <SideBar />
      <div className='ml-80 mr-16 pt-24'>
        {children}
      </div>
    </>
  )
}

export default Layout