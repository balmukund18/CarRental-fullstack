import React, { useEffect, useState } from 'react'
import Title from '../../components/owner/Title'
import { useAppContext } from '../../context/AppContext'
import toast from 'react-hot-toast'
import { motion } from 'framer-motion'

const ManageBookings = () => {
  const { currency, axios } = useAppContext()
  const [bookings, setBookings] = useState([])
  const [loading, setLoading] = useState(true)

  const fetchOwnerBookings = async ()=>{
    setLoading(true)
    try {
      const { data } = await axios.get('/api/bookings/owner')
      data.success ? setBookings(data.bookings) : toast.error(data.message)
    } catch (error) {
      toast.error(error.message)
    } finally {
      setLoading(false)
    }
  }

  const changeBookingStatus = async (bookingId, status)=>{
    try {
      const { data } = await axios.post('/api/bookings/change-status', {bookingId, status})
      if(data.success){
        toast.success(data.message)
        fetchOwnerBookings()
      }else{
        toast.error(data.message)
      }
    } catch (error) {
      toast.error(error.message)
    }
  }

  useEffect(()=>{
    fetchOwnerBookings()
  },[])

  return (
    <div className="px-4 pt-10 md:px-10 w-full min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
      <Title title="Manage Bookings" subTitle="Track all customer bookings, approve or cancel requests, and manage booking statuses."/>
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-4xl w-full rounded-2xl overflow-hidden border border-white/40 bg-white/60 backdrop-blur-md shadow-xl mt-8 mx-auto"
      >
        {loading ? (
          <div className="flex flex-col items-center justify-center py-16 text-gray-400">
            <svg width="40" height="40" className="animate-spin mb-4 text-blue-400" viewBox="0 0 24 24" fill="none"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"/></svg>
            <p className="text-lg font-semibold">Loading bookings...</p>
          </div>
        ) : bookings.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16 text-gray-400">
            <svg width="64" height="64" fill="none" viewBox="0 0 24 24" className="mb-4 opacity-60"><path d="M12 2a10 10 0 100 20 10 10 0 000-20zm0 18a8 8 0 110-16 8 8 0 010 16zm-1-7V7h2v6h-2zm0 4v-2h2v2h-2z" fill="currentColor"/></svg>
            <p className="text-lg font-semibold">No bookings found</p>
            <p className="text-sm mt-1">Bookings will appear here as customers reserve your cars.</p>
          </div>
        ) : (
          <div className="w-full overflow-x-auto">
            <table className="w-full border-collapse text-left text-base text-gray-700 min-w-[600px]">
            <thead className="text-gray-500 bg-gradient-to-r from-blue-100 to-blue-50">
              <tr>
                <th className="p-4 font-semibold">Car</th>
                <th className="p-4 font-semibold max-md:hidden">Date Range</th>
                <th className="p-4 font-semibold">Total</th>
                <th className="p-4 font-semibold max-md:hidden">Payment</th>
                <th className="p-4 font-semibold">Actions</th>
              </tr>
            </thead>
            <tbody>
              {bookings.map((booking, index)=>(
                <motion.tr
                  key={index}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className={`border-t border-white/30 ${index % 2 === 0 ? 'bg-white/70' : 'bg-blue-50/40'} hover:bg-blue-100/60 transition-all`}
                >
                  <td className="p-4 flex items-center gap-4">
                    <img src={booking.car.image} alt="" className="h-14 w-14 aspect-square rounded-lg object-cover shadow-md"/>
                    <div className="max-md:hidden">
                      <p className="font-semibold text-gray-800">{booking.car.brand} {booking.car.model}</p>
                    </div>
                  </td>
                  <td className="p-4 max-md:hidden">
                    {booking.pickupDate.split('T')[0]} to {booking.returnDate.split('T')[0]}
                  </td>
                  <td className="p-4">{currency}{booking.price}</td>
                  <td className="p-4 max-md:hidden">
                    <span className="bg-gray-100 px-3 py-1 rounded-full text-xs">offline</span>
                  </td>
                  <td className="p-4">
                    {booking.status === 'pending' ? (
                      <select onChange={e=> changeBookingStatus(booking._id, e.target.value)} value={booking.status} className="px-2 py-1.5 mt-1 text-gray-600 border border-blue-200 rounded-md outline-none bg-white/80 shadow-sm focus:border-primary transition-all">
                        <option value="pending">Pending</option>
                        <option value="cancelled">Cancelled</option>
                        <option value="confirmed">Confirmed</option>
                      </select>
                    ): (
                      <span className={`px-3 py-1 rounded-full text-xs font-semibold shadow-sm ${booking.status === 'confirmed' ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'}`}>{booking.status}</span>
                    )}
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
          </div>
        )}
      </motion.div>
    </div>
  )
}

export default ManageBookings
