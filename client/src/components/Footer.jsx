import React, { useState, useRef, useEffect } from 'react'
import { assets } from '../assets/assets'
import { motion, AnimatePresence } from 'framer-motion';

const Footer = () => {
  const [showTop, setShowTop] = useState(false);
  const quickRef = useRef(null);
  const resourcesRef = useRef(null);
  const contactRef = useRef(null);
  const [openSection, setOpenSection] = useState(null);

  // Show Back to Top button on scroll
  useEffect(() => {
    const onScroll = () => setShowTop(window.scrollY > 200);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Collapsible section handler for mobile
  const handleSection = (section) => {
    setOpenSection(openSection === section ? null : section);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="relative px-6 md:px-16 lg:px-24 xl:px-32 mt-60 text-sm text-gray-600 bg-white shadow-t-xl rounded-t-3xl overflow-hidden"
    >
      {/* Back to Top Button */}
      <AnimatePresence>
        {showTop && (
          <motion.button
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 40 }}
            transition={{ duration: 0.4 }}
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="fixed z-50 bottom-8 right-8 bg-blue-500 hover:bg-blue-600 text-white p-3 rounded-full shadow-xl flex items-center justify-center focus:outline-none"
            aria-label="Back to top"
          >
            <svg width="22" height="22" fill="none" viewBox="0 0 24 24"><path d="M12 19V5M5 12l7-7 7 7" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
          </motion.button>
        )}
      </AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="flex flex-wrap justify-between items-start gap-8 pb-6 border-borderColor border-b"
      >
        <div>
          <motion.img
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            src={assets.logo} alt="logo" className="h-8 md:h-9" />
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="max-w-80 mt-3"
          >
            Premium car rental service with a wide selection of luxury and everyday vehicles for all your driving needs.
          </motion.p>
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="flex items-center gap-3 mt-6"
          >
            {[{icon: assets.facebook_logo, label: 'Facebook'}, {icon: assets.instagram_logo, label: 'Instagram'}, {icon: assets.twitter_logo, label: 'Twitter'}, {icon: assets.gmail_logo, label: 'Gmail'}].map((item, i) => (
              <motion.a
                key={item.label}
                href="#"
                whileHover={{ scale: 1.2, rotate: -8 + i * 5, boxShadow: "0 4px 16px 0 rgba(59,130,246,0.15)" }}
                className="transition-all"
                aria-label={item.label}
              >
                <img src={item.icon} className="w-5 h-5" alt={item.label} />
              </motion.a>
            ))}
          </motion.div>
        </div>
        {/* Collapsible Sections for Mobile */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="flex flex-wrap justify-between w-1/2 gap-8"
        >
          {/* Quick Links */}
          <div ref={quickRef} className="w-full md:w-auto">
            <button
              className="flex items-center justify-between w-full md:w-auto text-base font-semibold text-gray-700 uppercase focus:outline-none md:cursor-default"
              onClick={() => handleSection('quick')}
              aria-expanded={openSection === 'quick'}
            >
              Quick Links
              <span className="md:hidden ml-2">{openSection === 'quick' ? '▲' : '▼'}</span>
            </button>
            <AnimatePresence initial={false}>
              {(openSection === 'quick' || window.innerWidth >= 768) && (
                <motion.ul
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="mt-3 flex flex-col gap-1.5 overflow-hidden"
                >
                  {['Home', 'Browse Cars', 'List Your Car', 'About Us'].map((text, i) => (
                    <li key={text}>
                      <a href="#" className="group relative inline-block py-0.5">
                        <span className="transition-colors duration-200 group-hover:text-blue-600 group-hover:font-bold">{text}</span>
                        <motion.span
                          layoutId="footer-link-underline"
                          className="absolute left-0 bottom-0 w-full h-0.5 bg-blue-400 rounded-full origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-200"
                        />
                      </a>
                    </li>
                  ))}
                </motion.ul>
              )}
            </AnimatePresence>
          </div>
          {/* Resources */}
          <div ref={resourcesRef} className="w-full md:w-auto">
            <button
              className="flex items-center justify-between w-full md:w-auto text-base font-semibold text-gray-700 uppercase focus:outline-none md:cursor-default"
              onClick={() => handleSection('resources')}
              aria-expanded={openSection === 'resources'}
            >
              Resources
              <span className="md:hidden ml-2">{openSection === 'resources' ? '▲' : '▼'}</span>
            </button>
            <AnimatePresence initial={false}>
              {(openSection === 'resources' || window.innerWidth >= 768) && (
                <motion.ul
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="mt-3 flex flex-col gap-1.5 overflow-hidden"
                >
                  {['Help Center', 'Terms of Service', 'Privacy Policy', 'Insurance'].map((text, i) => (
                    <li key={text}>
                      <a href="#" className="group relative inline-block py-0.5">
                        <span className="transition-colors duration-200 group-hover:text-blue-600 group-hover:font-bold">{text}</span>
                        <motion.span
                          layoutId="footer-link-underline"
                          className="absolute left-0 bottom-0 w-full h-0.5 bg-blue-400 rounded-full origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-200"
                        />
                      </a>
                    </li>
                  ))}
                </motion.ul>
              )}
            </AnimatePresence>
          </div>
          {/* Contact */}
          <div ref={contactRef} className="w-full md:w-auto">
            <button
              className="flex items-center justify-between w-full md:w-auto text-base font-semibold text-gray-700 uppercase focus:outline-none md:cursor-default"
              onClick={() => handleSection('contact')}
              aria-expanded={openSection === 'contact'}
            >
              Contact
              <span className="md:hidden ml-2">{openSection === 'contact' ? '▲' : '▼'}</span>
            </button>
            <AnimatePresence initial={false}>
              {(openSection === 'contact' || window.innerWidth >= 768) && (
                <motion.ul
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="mt-3 flex flex-col gap-1.5 overflow-hidden"
                >
                  {['1234 Luxury Drive', 'San Francisco, CA 94107', '+1 234 567890', 'info@example.com'].map((text, i) => (
                    <li key={text} className="text-gray-600">{text}</li>
                  ))}
                </motion.ul>
              )}
            </AnimatePresence>
          </div>
        </motion.div>
      </motion.div>
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.6 }}
        className="flex flex-col md:flex-row gap-2 items-center justify-between py-5 border-t border-gray-100 mt-2"
      >
        <div className="flex items-center gap-2 text-gray-500">
          <img src={assets.carIconColored} alt="Car Icon" className="h-5 w-5 opacity-80" />
          <span className="font-semibold text-gray-700">© {new Date().getFullYear()} Brand.</span>
          <span>All rights reserved.</span>
        </div>
        <ul className="flex items-center gap-4">
          {[{icon: assets.facebook_logo, label: 'Facebook'}, {icon: assets.instagram_logo, label: 'Instagram'}, {icon: assets.twitter_logo, label: 'Twitter'}, {icon: assets.gmail_logo, label: 'Gmail'}].map((item, i) => (
            <li key={item.label}>
              <a href="#" className="hover:text-blue-600 transition-colors" aria-label={item.label}>
                <img src={item.icon} className="w-5 h-5" alt={item.label} />
              </a>
            </li>
          ))}
        </ul>
      </motion.div>
    </motion.div>
  )
}

export default Footer
