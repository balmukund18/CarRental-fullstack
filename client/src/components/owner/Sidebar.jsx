import React, { useState } from 'react'
import { assets, ownerMenuLinks } from '../../assets/assets'
import { NavLink, useLocation } from 'react-router-dom';
import { useAppContext } from '../../context/AppContext';
import toast from 'react-hot-toast';
import { motion, AnimatePresence } from 'framer-motion';

const Sidebar = () => {
  const {user, axios, fetchUser} = useAppContext()
  const location = useLocation()
  const [image, setImage] = useState('')
  const [collapsed, setCollapsed] = useState(false)

  const updateImage = async ()=>{
    try {
      const formData = new FormData()
      formData.append('image', image)
      const {data} = await axios.post('/api/owner/update-image', formData)
      if(data.success){
        fetchUser()
        toast.success(data.message)
        setImage('')
      }else{
        toast.error(data.message)
      }
    } catch (error) {
      toast.error(error.message)
    }
  }

  return (
    <motion.div
      initial={{ x: -40, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className={`relative min-h-screen flex flex-col items-center pt-8 w-full md:max-w-60 max-w-16 border-r border-white/40 bg-white/60 backdrop-blur-xl shadow-xl transition-all duration-300 z-20 ${collapsed ? 'max-w-16 md:max-w-16' : 'max-w-60 md:max-w-60'}`}
    >
      {/* Collapse/Expand Button */}
      <button
        className="absolute top-4 right-2 md:hidden bg-blue-100 hover:bg-blue-200 rounded-full p-1 shadow-md transition-all"
        onClick={()=>setCollapsed(!collapsed)}
        aria-label={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
      >
        <svg width="22" height="22" fill="none" viewBox="0 0 24 24"><path d="M9 18l6-6-6-6" stroke="#2563eb" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
      </button>
      {/* Profile Image */}
      <motion.div
        whileHover={{ scale: 1.08, boxShadow: "0 4px 24px 0 rgba(31, 38, 135, 0.15)" }}
        className="group relative mb-2 mt-2"
      >
        <label htmlFor="image">
          <img
            src={image ? URL.createObjectURL(image) : user?.image ||  "https://images.unsplash.com/photo-1633332755192-727a05c4013d?q=80&w=300"}
            alt="profile"
            className="h-12 md:h-16 w-12 md:w-16 rounded-full mx-auto object-cover border-2 border-blue-200 shadow-md transition-all duration-200 group-hover:brightness-95"
          />
          <input type="file" id='image' accept="image/*" hidden onChange={e=> setImage(e.target.files[0])}/>
          <motion.div
            initial={{ opacity: 0 }}
            whileHover={{ opacity: 1 }}
            className="absolute inset-0 bg-black/20 rounded-full flex items-center justify-center cursor-pointer opacity-0 group-hover:opacity-100 transition-all"
          >
            <img src={assets.edit_icon} alt="Edit" className="h-6 w-6" />
          </motion.div>
        </label>
      </motion.div>
      {image && (
        <button className="absolute top-0 right-0 flex p-2 gap-1 bg-primary/10 text-primary cursor-pointer rounded-lg shadow-md text-xs" onClick={updateImage}>Save <img src={assets.check_icon} width={13} alt="" /></button>
      )}
      <AnimatePresence>
        {!collapsed && (
          <motion.p
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="mt-2 text-base font-semibold text-gray-700 max-md:hidden"
          >
            {user?.name}
          </motion.p>
        )}
      </AnimatePresence>
      {/* Menu Links */}
      <div className="w-full flex-1 mt-4">
        {ownerMenuLinks.map((link, index) => {
          const isActive = link.path === location.pathname
          return (
            <NavLink
              key={index}
              to={link.path}
              className={({ isActive }) =>
                `relative flex items-center gap-3 w-full py-3 pl-4 pr-2 my-1 rounded-lg transition-all duration-200 cursor-pointer
                ${isActive ? 'bg-gradient-to-r from-blue-200/60 to-blue-50 text-primary font-semibold shadow-md' : 'text-gray-600 hover:bg-blue-100/40 hover:text-primary'}
                ${collapsed ? 'justify-center pl-0' : ''}`
              }
              title={link.name}
            >
              <motion.img
                src={link.path === location.pathname ? link.coloredIcon : link.icon}
                alt={link.name}
                className="h-6 w-6"
                whileHover={{ scale: 1.15 }}
                transition={{ type: 'spring', stiffness: 300 }}
              />
              <AnimatePresence>
                {!collapsed && (
                  <motion.span
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -10 }}
                    className="text-base"
                  >
                    {link.name}
                  </motion.span>
                )}
              </AnimatePresence>
              {/* Animated Active Indicator */}
              {isActive && (
                <motion.div
                  layoutId={`sidebar-active-indicator-${link.path}`}
                  className="absolute right-0 top-1/2 -translate-y-1/2 w-1.5 h-8 rounded-l bg-primary shadow-md"
                  transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                />
              )}
            </NavLink>
          )
        })}
      </div>
    </motion.div>
  )
}

export default Sidebar
