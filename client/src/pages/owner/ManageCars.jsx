import React, { useEffect, useState } from 'react'
import { assets} from '../../assets/assets'
import Title from '../../components/owner/Title'
import { useAppContext } from '../../context/AppContext'
import toast from 'react-hot-toast'
import { motion } from 'framer-motion'

const ManageCars = () => {
  const {isOwner, axios, currency} = useAppContext()
  const [cars, setCars] = useState([])
  const [loading, setLoading] = useState(true)

  const fetchOwnerCars = async ()=>{
    setLoading(true)
    try {
      const {data} = await axios.get('/api/owner/cars')
      if(data.success){
        setCars(data.cars)
      }else{
        toast.error(data.message)
      }
    } catch (error) {
      toast.error(error.message)
    } finally {
      setLoading(false)
    }
  }

  const toggleAvailability = async (carId)=>{
    try {
      const {data} = await axios.post('/api/owner/toggle-car', {carId})
      if(data.success){
        toast.success(data.message)
        fetchOwnerCars()
      }else{
        toast.error(data.message)
      }
    } catch (error) {
      toast.error(error.message)
    }
  }

  const deleteCar = async (carId)=>{
    try {
      const confirm = window.confirm('Are you sure you want to delete this car?')
      if(!confirm) return null
      const {data} = await axios.post('/api/owner/delete-car', {carId})
      if(data.success){
        toast.success(data.message)
        fetchOwnerCars()
      }else{
        toast.error(data.message)
      }
    } catch (error) {
      toast.error(error.message)
    }
  }

  useEffect(()=>{
    isOwner && fetchOwnerCars()
  },[isOwner])

  return (
    <div className="px-4 pt-10 md:px-10 w-full min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
      <Title title="Manage Cars" subTitle="View all listed cars, update their details, or remove them from the booking platform."/>
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-4xl w-full rounded-2xl overflow-hidden border border-white/40 bg-white/60 backdrop-blur-md shadow-xl mt-8 mx-auto"
      >
        {loading ? (
          <div className="flex flex-col items-center justify-center py-16 text-gray-400">
            <svg className="animate-spin h-10 w-10 mb-4 text-blue-400" viewBox="0 0 24 24" fill="none"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"/></svg>
            <p className="text-lg font-semibold">Loading cars...</p>
          </div>
        ) : cars.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16 text-gray-400">
            <img src={assets.carIconColored} alt="No cars" className="h-16 w-16 mb-4 opacity-60" />
            <p className="text-lg font-semibold">No cars listed yet</p>
            <p className="text-sm mt-1">Add a car to get started!</p>
          </div>
        ) : (
          <div className="w-full overflow-x-auto">
            <table className="w-full border-collapse text-left text-base text-gray-700 min-w-[600px]">
              <thead className="text-gray-500 bg-gradient-to-r from-blue-100 to-blue-50">
                <tr>
                  <th className="p-4 font-semibold">Car</th>
                  <th className="p-4 font-semibold max-md:hidden">Category</th>
                  <th className="p-4 font-semibold">Price</th>
                  <th className="p-4 font-semibold max-md:hidden">Status</th>
                  <th className="p-4 font-semibold">Actions</th>
                </tr>
              </thead>
              <tbody>
                {cars.map((car, index)=>(
                  <motion.tr
                    key={index}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                    className={`border-t border-white/30 ${index % 2 === 0 ? 'bg-white/70' : 'bg-blue-50/40'} hover:bg-blue-100/60 transition-all`}
                  >
                    <td className="p-4 flex items-center gap-4">
                      <img src={car.image} alt="" className="h-14 w-14 aspect-square rounded-lg object-cover shadow-md"/>
                      <div className="max-md:hidden">
                        <p className="font-semibold text-gray-800">{car.brand} {car.model}</p>
                        <p className="text-xs text-gray-500 mt-1">{car.seating_capacity} • {car.transmission}</p>
                      </div>
                    </td>
                    <td className="p-4 max-md:hidden">{car.category}</td>
                    <td className="p-4">{currency}{car.pricePerDay}/day</td>
                    <td className="p-4 max-md:hidden">
                      <span className={`px-3 py-1 rounded-full text-xs font-semibold shadow-sm ${car.isAvaliable ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'}`}>
                        {car.isAvaliable ? "Available" : "Unavailable" }
                      </span>
                    </td>
                    <td className="flex items-center gap-3 p-4">
                      <button onClick={()=> toggleAvailability(car._id)} title={car.isAvaliable ? 'Mark Unavailable' : 'Mark Available'} className="p-2 rounded-full bg-blue-100 hover:bg-blue-200 transition-all shadow-md">
                        <img src={car.isAvaliable ? assets.eye_close_icon : assets.eye_icon} alt="Toggle" className="h-5 w-5"/>
                      </button>
                      <button onClick={()=> deleteCar(car._id)} title="Delete" className="p-2 rounded-full bg-red-100 hover:bg-red-200 transition-all shadow-md">
                        <img src={assets.delete_icon} alt="Delete" className="h-5 w-5"/>
                      </button>
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

export default ManageCars
