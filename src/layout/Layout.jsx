import React from 'react'
import Topbar from '../components/topbar/TopBar'
import SideBar from '../components/sidebar/SideBar'
const Layout = ({ children }) => {
  return (
    <>
      <Topbar />
      <SideBar />
      <div className='ml-80 mr-4 pt-24 overflow-x-hidden'>
        {children}
      </div>
    </>
  )
}

export default Layout