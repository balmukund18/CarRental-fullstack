import React, { useState } from 'react'
import Title from '../../components/owner/Title'
import { assets } from '../../assets/assets'
import { useAppContext } from '../../context/AppContext'
import toast from 'react-hot-toast'
import LocationAutocomplete from '../../components/LocationAutocomplete';
import { FaCarSide, FaTag, FaCalendarAlt, FaUsers, FaGasPump, FaCogs, FaDollarSign, FaMapMarkerAlt, FaUpload } from 'react-icons/fa';
import { motion } from 'framer-motion';

const AddCar = () => {

  const {axios, currency} = useAppContext()

  const [image, setImage] = useState(null)
  const [car, setCar] = useState({
    brand: '',
    model: '',
    year: '',
    pricePerDay: '',
    category: '',
    transmission: '',
    fuel_type: '',
    seating_capacity: '',
    location: '',
    location_lat: null,
    location_lon: null,
    description: '',
  })

  const [isLoading, setIsLoading] = useState(false)
  const onSubmitHandler = async (e)=>{
    e.preventDefault()
    if(isLoading) return null

    setIsLoading(true)
    try {
      const formData = new FormData()
      formData.append('image', image)
      formData.append('carData', JSON.stringify(car))

      const {data} = await axios.post('/api/owner/add-car', formData)

      if(data.success){
        toast.success(data.message)
        setImage(null)
        setCar({
          brand: '',
          model: '',
          year: '',
          pricePerDay: '',
          category: '',
          transmission: '',
          fuel_type: '',
          seating_capacity: '',
          location: '',
          location_lat: null,
          location_lon: null,
          description: '',
        })
      }else{
        toast.error(data.message)
      }
    } catch (error) {
      toast.error(error.message)
    }finally{
      setIsLoading(false)
    }
  }

  return (
    <div className="flex justify-center items-center min-h-screen bg-light px-2 py-8">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-2xl bg-white rounded-2xl shadow-2xl p-8"
      >
        <h2 className="text-2xl font-bold mb-1 flex items-center gap-2"><FaCarSide className="text-primary" /> Add a New Car</h2>
        <p className="text-gray-500 mb-6">Fill in details to list your car for booking, including pricing, availability, and car specifications.</p>
        <form onSubmit={onSubmitHandler} className="flex flex-col gap-6 text-gray-600 text-base">
          {/* Image Upload */}
          <div className="flex flex-col gap-2">
            <label className="font-medium flex items-center gap-2"><FaUpload /> Car Image</label>
            <div className="flex items-center gap-4">
              <label htmlFor="car-image" className="w-24 h-24 flex items-center justify-center bg-light border-2 border-dashed border-primary/40 rounded-lg cursor-pointer hover:bg-primary/5 transition-all">
                {image ? (
                  <img src={URL.createObjectURL(image)} alt="Preview" className="w-full h-full object-cover rounded-lg" />
                ) : (
                  <FaUpload className="text-3xl text-primary/60" />
                )}
                <input type="file" id="car-image" accept="image/*" hidden onChange={e=> setImage(e.target.files[0])}/>
              </label>
              <span className="text-gray-400 text-sm">Drag & drop or click to upload</span>
            </div>
          </div>
          {/* Car Details */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="relative">
              <FaTag className="absolute left-3 top-3 text-primary/60" />
              <input type="text" placeholder="Brand (e.g. BMW, Mercedes)" required className="pl-10 pr-3 py-3 border border-borderColor rounded-lg outline-none w-full focus:border-primary transition-all" value={car.brand} onChange={e=> setCar({...car, brand: e.target.value})}/>
            </div>
            <div className="relative">
              <FaCarSide className="absolute left-3 top-3 text-primary/60" />
              <input type="text" placeholder="Model (e.g. X5, E-Class)" required className="pl-10 pr-3 py-3 border border-borderColor rounded-lg outline-none w-full focus:border-primary transition-all" value={car.model} onChange={e=> setCar({...car, model: e.target.value})}/>
            </div>
            <div className="relative">
              <FaCalendarAlt className="absolute left-3 top-3 text-primary/60" />
              <input type="number" placeholder="Year (e.g. 2025)" required className="pl-10 pr-3 py-3 border border-borderColor rounded-lg outline-none w-full focus:border-primary transition-all" value={car.year} onChange={e=> setCar({...car, year: e.target.value})}/>
            </div>
            <div className="relative">
              <FaDollarSign className="absolute left-3 top-3 text-primary/60" />
              <input type="number" placeholder={`Daily Price (${currency})`} required className="pl-10 pr-3 py-3 border border-borderColor rounded-lg outline-none w-full focus:border-primary transition-all" value={car.pricePerDay} onChange={e=> setCar({...car, pricePerDay: e.target.value})}/>
            </div>
            <div className="relative">
              <FaTag className="absolute left-3 top-3 text-primary/60" />
              <select onChange={e=> setCar({...car, category: e.target.value})} value={car.category} className="pl-10 pr-3 py-3 border border-borderColor rounded-lg outline-none w-full focus:border-primary transition-all">
                <option value="">Category</option>
                <option value="Sedan">Sedan</option>
                <option value="SUV">SUV</option>
                <option value="Van">Van</option>
              </select>
            </div>
            <div className="relative">
              <FaCogs className="absolute left-3 top-3 text-primary/60" />
              <select onChange={e=> setCar({...car, transmission: e.target.value})} value={car.transmission} className="pl-10 pr-3 py-3 border border-borderColor rounded-lg outline-none w-full focus:border-primary transition-all">
                <option value="">Transmission</option>
                <option value="Automatic">Automatic</option>
                <option value="Manual">Manual</option>
                <option value="Semi-Automatic">Semi-Automatic</option>
              </select>
            </div>
            <div className="relative">
              <FaGasPump className="absolute left-3 top-3 text-primary/60" />
              <select onChange={e=> setCar({...car, fuel_type: e.target.value})} value={car.fuel_type} className="pl-10 pr-3 py-3 border border-borderColor rounded-lg outline-none w-full focus:border-primary transition-all">
                <option value="">Fuel Type</option>
                <option value="Gas">Gas</option>
                <option value="Diesel">Diesel</option>
                <option value="Petrol">Petrol</option>
                <option value="Electric">Electric</option>
                <option value="Hybrid">Hybrid</option>
              </select>
            </div>
            <div className="relative">
              <FaUsers className="absolute left-3 top-3 text-primary/60" />
              <input type="number" placeholder="Seating Capacity (e.g. 4)" required className="pl-10 pr-3 py-3 border border-borderColor rounded-lg outline-none w-full focus:border-primary transition-all" value={car.seating_capacity} onChange={e=> setCar({...car, seating_capacity: e.target.value})}/>
            </div>
          </div>
          {/* Location Autocomplete */}
          <div className="flex flex-col gap-2">
            <label className="font-medium flex items-center gap-2"><FaMapMarkerAlt /> Location</label>
            <LocationAutocomplete
              value={car.location}
              onChange={val => setCar({ ...car, location: val })}
              onSelect={({ name, lat, lon }) => setCar({ ...car, location: name, location_lat: lat, location_lon: lon })}
              placeholder="Enter car location"
              className="h-11 text-base font-medium border-2 border-primary/60 focus:border-primary shadow-md bg-white rounded-md px-5 transition-all duration-200 placeholder-gray-400 focus:ring-2 focus:ring-primary/20 mt-1"
            />
          </div>
          {/* Description */}
          <div className="flex flex-col gap-2">
            <label className="font-medium">Description</label>
            <textarea rows={4} placeholder="e.g. A luxurious SUV with a spacious interior and a powerful engine." required className="px-4 py-3 border border-borderColor rounded-lg outline-none w-full focus:border-primary transition-all" value={car.description} onChange={e=> setCar({...car, description: e.target.value})}></textarea>
          </div>
          {/* Add Car Button */}
          <button className="flex items-center justify-center gap-2 px-6 py-3 mt-2 bg-primary text-white rounded-xl font-semibold text-lg w-full shadow-md hover:bg-primary-dull transition-all duration-200 disabled:opacity-60" disabled={isLoading}>
            <img src={assets.tick_icon} alt="" className="h-5" />
            {isLoading ? 'Listing...' : 'List Your Car'}
          </button>
        </form>
      </motion.div>
    </div>
  )
}

export default AddCar
