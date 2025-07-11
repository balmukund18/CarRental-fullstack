import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { assets, dummyCarData } from '../assets/assets'
import Loader from '../components/Loader'
import { useAppContext } from '../context/AppContext'
import toast from 'react-hot-toast'
import { motion } from 'framer-motion'

const CarDetails = () => {
  const {id} = useParams()
  const {cars, axios, pickupDate, setPickupDate, returnDate, setReturnDate} = useAppContext()
  const navigate = useNavigate()
  const [car, setCar] = useState(null)
  const currency = import.meta.env.VITE_CURRENCY

  const handleSubmit = async (e)=>{
    e.preventDefault();
    try {
      const {data} = await axios.post('/api/bookings/create', {
        car: id,
        pickupDate, 
        returnDate
      })
      if (data.success){
        toast.success(data.message)
        navigate('/my-bookings')
      }else{
        toast.error(data.message)
      }
    } catch (error) {
      toast.error(error.message)
    }
  }

  useEffect(()=>{
    setCar(cars.find(car => car._id === id))
  },[cars, id])

  return car ? (
    <>
      <style>{`
        .car-details-image-hover {
          transition: transform 0.4s cubic-bezier(0.4,0,0.2,1), box-shadow 0.4s cubic-bezier(0.4,0,0.2,1);
        }
        .car-details-image-hover:hover {
          transform: scale(1.06) rotate(-2deg);
          box-shadow: 0 8px 32px 0 rgba(37,99,235,0.18), 0 1.5px 8px 0 rgba(0,0,0,0.10);
          z-index: 2;
        }
      `}</style>
      <div className="px-6 md:px-16 lg:px-24 xl:px-32 mt-16 pb-16 min-h-[60vh] bg-gradient-to-br from-gray-50 to-blue-50 overflow-x-hidden">
        <button
          onClick={()=> navigate(-1)}
          className="group flex items-center gap-2 mb-6 px-5 py-2 rounded-full bg-white/70 backdrop-blur-md shadow-md border border-white/60 text-gray-500 hover:text-primary hover:bg-blue-50/80 transition-all duration-200 font-semibold text-base focus:outline-none focus:ring-2 focus:ring-primary/30 active:scale-95"
          style={{ boxShadow: '0 2px 12px 0 rgba(37,99,235,0.08)' }}
        >
          <span className="flex items-center justify-center w-8 h-8 rounded-full bg-blue-100 group-hover:bg-primary/90 group-hover:text-white transition-all duration-200">
            <img src={assets.arrow_icon} alt="" className="rotate-180 opacity-70 w-4 h-4 group-hover:opacity-100" />
          </span>
          Back to all cars
        </button>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 lg:gap-14">
          {/* Left: Car Image & Details */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-2 flex flex-col gap-8"
          >
            <div
              className="relative rounded-3xl overflow-hidden shadow-lg bg-white/80 mb-6 flex items-center justify-center p-6 max-w-3xl mx-auto"
            >
              <img src={car.image} alt="" className="w-full h-auto max-h-80 object-contain drop-shadow-lg car-details-image-hover"/>
              <div className="absolute bottom-0 left-0 right-0 h-12 bg-gradient-to-t from-white/80 to-transparent pointer-events-none" />
            </div>
            <motion.div className="space-y-8 bg-white/80 rounded-2xl shadow-lg p-8"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.5 }}
            >
              <div>
                <h1 className="text-3xl md:text-4xl font-extrabold text-gray-800 mb-1">{car.brand} {car.model}</h1>
                <p className="text-primary text-lg font-semibold mb-2">{car.category} • {car.year}</p>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                {[
                  {icon: assets.users_icon, text: `${car.seating_capacity} Seats`, color: 'bg-blue-50 text-blue-700'},
                  {icon: assets.fuel_icon, text: car.fuel_type, color: 'bg-green-50 text-green-700'},
                  {icon: assets.car_icon, text: car.transmission, color: 'bg-purple-50 text-purple-700'},
                  {icon: assets.location_icon, text: car.location, color: 'bg-yellow-50 text-yellow-700'},
                ].map(({icon, text, color})=>(
                  <div key={text} className={`flex flex-col items-center p-4 rounded-xl shadow bg-white/80 border border-gray-100 ${color} font-semibold text-base`}>
                    <img src={icon} alt="" className="h-6 mb-2"/>
                    {text}
                  </div>
                ))}
              </div>
              {/* Description */}
              <div>
                <h1 className="text-xl font-bold mb-2 text-gray-800">Description</h1>
                <p className="text-gray-500 text-base leading-relaxed">{car.description}</p>
              </div>
              {/* Features */}
              <div>
                <h1 className="text-xl font-bold mb-2 text-gray-800">Features</h1>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {[
                    "360 Camera", "Bluetooth", "GPS", "Heated Seats", "Rear View Mirror"
                  ].map((item)=>(
                    <li key={item} className="flex items-center text-gray-600 font-medium">
                      <img src={assets.check_icon} className="h-4 mr-2 text-green-500" alt="" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          </motion.div>
          {/* Right: Booking Form */}
          <motion.form 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            onSubmit={handleSubmit}
            className="shadow-lg h-max sticky top-24 rounded-3xl p-8 space-y-8 text-gray-600 bg-white/90 border border-white/60 flex flex-col items-center"
          >
            <p className="flex items-center justify-between text-3xl text-primary font-extrabold w-full">{currency}{car.pricePerDay}<span className="text-base text-gray-400 font-normal">per day</span></p>
            <hr className="border-gray-200 my-4 w-full"/>
            <div className="flex flex-col gap-2 w-full">
              <label htmlFor="pickup-date" className="font-semibold">Pickup Date</label>
              <input value={pickupDate} onChange={(e)=>setPickupDate(e.target.value)}
                type="date" className="border-2 border-gray-200 px-4 py-2 rounded-xl focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none bg-white shadow-sm text-base font-medium" required id='pickup-date' min={new Date().toISOString().split('T')[0]}/>
            </div>
            <div className="flex flex-col gap-2 w-full">
              <label htmlFor="return-date" className="font-semibold">Return Date</label>
              <input value={returnDate} onChange={(e)=>setReturnDate(e.target.value)}
                type="date" className="border-2 border-gray-200 px-4 py-2 rounded-xl focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none bg-white shadow-sm text-base font-medium" required id='return-date'/>
            </div>
            <button className="w-full bg-primary hover:bg-primary-dull transition-all py-3 font-bold text-white rounded-xl shadow-lg text-lg tracking-wide">Book Now</button>
            <p className="text-center text-sm text-gray-400">No credit card required to reserve</p>
          </motion.form>
        </div>
      </div>
    </>
  ) : <Loader />
}

export default CarDetails
