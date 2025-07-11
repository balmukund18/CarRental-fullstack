import React, { useEffect } from 'react'
import NavbarOwner from '../../components/owner/NavbarOwner'
import Sidebar from '../../components/owner/Sidebar'
import { Outlet } from 'react-router-dom'
import { useAppContext } from '../../context/AppContext'

const Layout = () => {
  const {isOwner, navigate} = useAppContext()

  useEffect(()=>{
    if(!isOwner){
      navigate('/')
    }
  },[isOwner])
  return (
    <div className='flex flex-col min-h-screen'>
      <NavbarOwner />
      <div className='flex flex-col md:flex-row flex-1 w-full min-h-0'>
        <Sidebar />
        <div className='flex-1 min-w-0'>
          <Outlet />
        </div>
      </div>
    </div>
  )
}

export default Layout
