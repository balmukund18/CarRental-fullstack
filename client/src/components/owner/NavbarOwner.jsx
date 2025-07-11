import React from 'react'
import { assets } from '../../assets/assets'
import { Link } from 'react-router-dom';
import { useAppContext } from '../../context/AppContext';

const NavbarOwner = () => {
  const {user} = useAppContext()
  const displayName = user?.name || "Owner"
  const avatarLetter = displayName.charAt(0).toUpperCase()

  return (
    <div className="flex items-center justify-between px-6 md:px-10 py-4 text-gray-500 border-b border-borderColor relative transition-all bg-white/70 backdrop-blur-md">
      <Link to='/'>
        <img src={assets.logo} alt="" className="h-7"/>
      </Link>
      <div className="flex items-center gap-3">
        <div className="flex items-center gap-3 px-4 py-2 rounded-xl bg-gradient-to-br from-blue-100/60 to-white/80 shadow-lg border border-white/60">
          <div className="w-9 h-9 rounded-full bg-blue-400 flex items-center justify-center text-white font-bold text-lg shadow-md">
            {avatarLetter}
          </div>
          <div className="flex flex-col items-start">
            <span className="text-xs text-gray-400 font-medium">Welcome</span>
            <span className="text-base font-semibold text-gray-700">{displayName}</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default NavbarOwner
