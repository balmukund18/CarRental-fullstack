import React, { useEffect, useState } from 'react'
import { assets} from '../assets/assets'
import Title from '../components/Title'
import { useAppContext } from '../context/AppContext'
import toast from 'react-hot-toast'
import { motion, AnimatePresence } from 'framer-motion'

const MyBookings = () => {
  const { axios, user, currency } = useAppContext()
  const [bookings, setBookings] = useState([])
  const [loading, setLoading] = useState(true)

  const fetchMyBookings = async ()=>{
    setLoading(true)
    try {
      const { data } = await axios.get('/api/bookings/user')
      if (data.success){
        setBookings(data.bookings)
      }else{
        toast.error(data.message)
      }
    } catch (error) {
      toast.error(error.message)
    } finally {
      setLoading(false)
    }
  }

  useEffect(()=>{
    user && fetchMyBookings()
  },[user])

  return (
    <motion.div 
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="px-6 md:px-16 lg:px-24 xl:px-32 2xl:px-48 mt-16 text-sm max-w-7xl min-h-screen bg-gradient-to-br from-gray-50 to-blue-50"
    >
      <Title title='My Bookings'
        subTitle='View and manage all your car bookings'
        align="left"/>

      <div>
        <AnimatePresence>
          {loading && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              className="flex flex-col items-center justify-center py-24 text-gray-400"
            >
              <svg className="animate-spin h-10 w-10 mb-4 text-blue-400" viewBox="0 0 24 24" fill="none"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"/></svg>
              <p className="text-lg font-semibold">Loading bookings...</p>
            </motion.div>
          )}
          {!loading && bookings.length === 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              className="flex flex-col items-center justify-center py-24 text-gray-400"
            >
              <img src={assets.listIcon} alt="No bookings" className="h-16 w-16 mb-4 opacity-60" />
              <p className="text-lg font-semibold">No bookings found</p>
              <p className="text-sm mt-1">Your bookings will appear here.</p>
            </motion.div>
          )}
        </AnimatePresence>
        {!loading && bookings.map((booking, index)=>(
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.4 }}
            key={booking._id}
            className="relative grid grid-cols-1 md:grid-cols-4 gap-8 p-7 rounded-2xl shadow-lg bg-white/80 border border-white/40 mt-8 first:mt-14 hover:shadow-xl transition-all duration-300 group"
          >
            {/* Accent bar for status */}
            <div className={`absolute left-0 top-6 bottom-6 w-1 rounded-full ${booking.status === 'confirmed' ? 'bg-green-400' : 'bg-red-400'} group-hover:scale-y-110 transition-transform`} />
            {/* Car Image + Info */}
            <div className="md:col-span-1 flex flex-col items-center md:items-start">
              <div className="rounded-xl overflow-hidden mb-3 shadow-md">
                <img src={booking.car.image} alt="" className="w-36 h-24 md:w-full md:h-auto aspect-video object-cover"/>
              </div>
              <p className="text-lg font-bold mt-2 text-gray-800">{booking.car.brand} {booking.car.model}</p>
              <p className="text-gray-500 text-sm">{booking.car.year} • {booking.car.category} • {booking.car.location}</p>
            </div>
            {/* Booking Info */}
            <div className="md:col-span-2 flex flex-col justify-center">
              <div className="flex items-center gap-3 mb-2">
                <span className="px-3 py-1.5 bg-blue-50 text-blue-700 rounded-full font-semibold text-xs shadow-sm">Booking #{index+1}</span>
                <span className={`px-3 py-1.5 text-xs rounded-full font-bold shadow-sm ${booking.status === 'confirmed' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-600'}`}>{booking.status}</span>
              </div>
              <div className="flex items-start gap-3 mt-2">
                <img src={assets.calendar_icon_colored} alt="" className="w-5 h-5 mt-1"/>
                <div>
                  <p className="text-gray-500 text-xs">Rental Period</p>
                  <p className="font-medium text-gray-700">{booking.pickupDate.split('T')[0]} to {booking.returnDate.split('T')[0]}</p>
                </div>
              </div>
              <div className="flex items-start gap-3 mt-2">
                <img src={assets.location_icon_colored} alt="" className="w-5 h-5 mt-1"/>
                <div>
                  <p className="text-gray-500 text-xs">Pick-up Location</p>
                  <p className="font-medium text-gray-700">{booking.car.location}</p>
                </div>
              </div>
              {/* Contact Owner Button - only if confirmed and owner email exists */}
              {booking.status === 'confirmed' && booking.car.owner && booking.car.owner.email && (
                <a
                  href={`mailto:${booking.car.owner.email}?subject=Car Rental Booking Inquiry`}
                  className="mt-4 inline-block px-4 py-2 bg-primary text-white rounded-lg shadow hover:bg-primary-dull transition"
                >
                  Contact Owner
                </a>
              )}
            </div>
            {/* Price */}
            <div className="md:col-span-1 flex flex-col justify-between items-end gap-6">
              <div className="text-sm text-gray-500 text-right">
                <p>Total Price</p>
                <h1 className="text-3xl font-bold text-primary">{currency}{booking.price}</h1>
                <p className="text-xs mt-1">Booked on {booking.createdAt.split('T')[0]}</p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  )
}

export default MyBookings
