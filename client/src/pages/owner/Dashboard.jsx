import React, { useEffect, useState } from 'react'
import { assets } from '../../assets/assets'
import Title from '../../components/owner/Title'
import { useAppContext } from '../../context/AppContext'
import toast from 'react-hot-toast'
import { motion } from 'framer-motion'

const Dashboard = () => {
  const {axios, isOwner, currency} = useAppContext()
  const [data, setData] = useState({
    totalCars: 0,
    totalBookings: 0,
    pendingBookings: 0,
    completedBookings: 0,
    recentBookings: [],
    monthlyRevenue: 0,
  })

  const dashboardCards = [
    {title: "Total Cars", value: data.totalCars, icon: assets.carIconColored, color: 'from-blue-400 to-blue-600'},
    {title: "Total Bookings", value: data.totalBookings, icon: assets.listIconColored, color: 'from-purple-400 to-purple-600'},
    {title: "Pending", value: data.pendingBookings, icon: assets.cautionIconColored, color: 'from-yellow-300 to-yellow-500'},
    {title: "Confirmed", value: data.completedBookings, icon: assets.listIconColored, color: 'from-green-400 to-green-600'},
  ]

  const fetchDashboardData = async ()=>{
    try {
       const { data } = await axios.get('/api/owner/dashboard')
       if (data.success){
        setData(data.dashboardData)
       }else{
        toast.error(data.message)
       }
    } catch (error) {
      toast.error(error.message)
    }
  }

  useEffect(()=>{
    if(isOwner){
      fetchDashboardData()
    }
  },[isOwner])

  return (
    <div className="px-4 pt-10 md:px-10 flex-1 min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
      <Title title="Admin Dashboard" subTitle="Monitor overall platform performance including total cars, bookings, revenue, and recent activities"/>

      {/* Dashboard Cards */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 my-10 max-w-4xl mx-auto"
      >
        {dashboardCards.map((card, index)=>(
          <motion.div
            key={index}
            whileHover={{ scale: 1.04, boxShadow: "0 8px 32px 0 rgba(31, 38, 135, 0.15)" }}
            className="flex gap-4 items-center justify-between p-6 rounded-2xl bg-white/60 backdrop-blur-md shadow-xl border border-white/40 transition-all cursor-pointer hover:bg-white/80"
          >
            <div>
              <h1 className="text-xs text-gray-500 font-semibold tracking-wide mb-1">{card.title}</h1>
              <p className="text-2xl font-bold text-gray-800">{card.value}</p>
            </div>
            <div className={`flex items-center justify-center w-14 h-14 rounded-xl bg-gradient-to-br ${card.color} shadow-lg`}>
              <img src={card.icon} alt="" className="h-7 w-7"/>
            </div>
          </motion.div>
        ))}
      </motion.div>

      {/* Recent Bookings & Revenue */}
      <div className="flex flex-wrap items-start gap-8 mb-8 w-full max-w-5xl mx-auto">
        {/* Recent Bookings */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="p-6 border border-white/40 rounded-2xl bg-white/60 backdrop-blur-md shadow-xl max-w-xl w-full"
        >
          <h1 className="text-xl font-semibold mb-1">Recent Bookings</h1>
          <p className="text-gray-500 mb-4">Latest customer bookings</p>
          <div className="divide-y divide-gray-200">
            {data.recentBookings.length === 0 && (
              <div className="py-8 text-center text-gray-400">No recent bookings</div>
            )}
            {data.recentBookings.map((booking, index)=>(
              <div key={index} className="py-4 flex items-center justify-between gap-2">
                <div className="flex items-center gap-3">
                  <div className="flex items-center justify-center w-12 h-12 rounded-full bg-gradient-to-br from-blue-100 to-blue-300 shadow-md">
                    <img src={assets.listIconColored} alt="" className="h-6 w-6"/>
                  </div>
                  <div>
                    <p className="font-medium text-gray-700">{booking.car.brand} {booking.car.model}</p>
                    <p className="text-xs text-gray-400">{booking.createdAt.split('T')[0]}</p>
                  </div>
                </div>
                <div className="flex flex-col items-end gap-1 font-medium">
                  <p className="text-sm text-gray-500">{currency}{booking.price}</p>
                  <span className={`px-3 py-0.5 rounded-full text-xs font-semibold ${booking.status === 'confirmed' ? 'bg-green-100 text-green-600' : booking.status === 'pending' ? 'bg-yellow-100 text-yellow-600' : 'bg-red-100 text-red-600'}`}>{booking.status}</span>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Monthly Revenue */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="p-6 border border-white/40 rounded-2xl bg-white/60 backdrop-blur-md shadow-xl w-full md:max-w-xs flex flex-col items-center justify-center"
        >
          <h1 className="text-xl font-semibold mb-1">Monthly Revenue</h1>
          <p className="text-gray-500 mb-4">Revenue for current month</p>
          <p className="text-4xl font-bold text-primary mt-2">{currency}{data.monthlyRevenue}</p>
        </motion.div>
      </div>
    </div>
  )
}

export default Dashboard
