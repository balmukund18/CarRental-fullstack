import React from 'react'
import { useAppContext } from '../context/AppContext';
import toast from 'react-hot-toast';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { motion } from 'framer-motion';
import { assets } from '../assets/assets';

const Login = () => {

    const {setShowLogin, axios, setToken, navigate} = useAppContext()

    const [state, setState] = React.useState("login");
    const [name, setName] = React.useState("");
    const [email, setEmail] = React.useState("");
    const [password, setPassword] = React.useState("");
    const [showPassword, setShowPassword] = React.useState(false);

    // Floating label focus/value states
    const [focus, setFocus] = React.useState({
      name: false,
      email: false,
      password: false
    });

    const onSubmitHandler = async (event)=>{
        try {
            event.preventDefault();
            const {data} = await axios.post(`/api/user/${state}`, {name, email, password})

            if (data.success) {
                navigate('/')
                setToken(data.token)
                localStorage.setItem('token', data.token)
                setShowLogin(false)
            }else{
                toast.error(data.message)
            }

        } catch (error) {
            toast.error(error.message)
        }
        
    }

  return (
    <div onClick={()=> setShowLogin(false)} className='fixed top-0 bottom-0 left-0 right-0 z-100 flex items-center justify-center text-sm text-gray-600 bg-gradient-to-br from-blue-100/60 via-white/80 to-blue-200/60 backdrop-blur-[2px]'>
      <motion.form 
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        onSubmit={onSubmitHandler} 
        onClick={(e)=>e.stopPropagation()} 
        className="relative flex flex-col gap-5 m-auto items-center p-8 py-12 w-[90vw] max-w-[370px] rounded-3xl shadow-2xl border border-white/60 bg-white/70 backdrop-blur-xl glass-card"
      >
        <img src={assets.logo} alt="logo" className="h-12 mb-2 drop-shadow-lg" />
        <div className="w-16 h-16 rounded-full bg-blue-100 flex items-center justify-center mb-2 shadow-md">
          <img src={assets.user_profile} alt="user" className="w-10 h-10 object-cover rounded-full" />
        </div>
        <p className="text-2xl font-extrabold text-gray-800 mb-2 tracking-tight">
          {state === "login" ? "Welcome Back!" : "Create Account"}
        </p>
        {state === "register" && (
          <div className="w-full mb-1">
            <label htmlFor="name" className="block font-semibold text-gray-700 mb-1">Name</label>
            <input
              onChange={(e) => setName(e.target.value)}
              value={name}
              className="border border-gray-200 rounded-xl w-full px-4 py-3 bg-white/80 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all font-medium text-base"
              type="text"
              required
              id="name"
              autoComplete="name"
              placeholder="Enter your name"
            />
          </div>
        )}
        <div className="w-full mb-1">
          <label htmlFor="email" className="block font-semibold text-gray-700 mb-1">Email</label>
          <input
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            className="border border-gray-200 rounded-xl w-full px-4 py-3 bg-white/80 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all font-medium text-base"
            type="email"
            required
            autoComplete="username"
            id="email"
            placeholder="Enter your email"
          />
        </div>
        <div className="w-full mb-1">
          <label htmlFor="password" className="block font-semibold text-gray-700 mb-1">Password</label>
          <div className="relative">
            <input
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              className="border border-gray-200 rounded-xl w-full px-4 py-3 bg-white/80 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all font-medium text-base pr-10"
              type={showPassword ? "text" : "password"}
              required
              autoComplete="current-password"
              id="password"
              placeholder="Enter your password"
            />
            <button
              type="button"
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-primary"
              tabIndex={-1}
              onClick={() => setShowPassword((v) => !v)}
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </button>
          </div>
        </div>
        {state === "register" ? (
          <p className="text-sm text-gray-500 w-full text-left">
            Already have an account? <span onClick={() => setState("login")} className="text-primary cursor-pointer font-semibold">Login</span>
          </p>
        ) : (
          <p className="text-sm text-gray-500 w-full text-left">
            New here? <span onClick={() => setState("register")} className="text-primary cursor-pointer font-semibold">Create an account</span>
          </p>
        )}
        <button className="w-full bg-primary hover:bg-primary-dull transition-all py-3 font-bold text-white rounded-xl shadow-lg text-lg tracking-wide mt-2">
          {state === "register" ? "Create Account" : "Login"}
        </button>
      </motion.form>
      <style>{`
        .glass-card {
          box-shadow: 0 8px 32px 0 rgba(37,99,235,0.10), 0 1.5px 8px 0 rgba(0,0,0,0.08);
        }
      `}</style>
    </div>
  )
}

export default Login
