import React, { useState, useRef, useEffect } from 'react';
import axios from 'axios';
import { FaMapMarkedAlt, FaEye, FaEyeSlash } from 'react-icons/fa';

const LocationAutocomplete = ({ value, onChange, onSelect, placeholder = 'Enter location', className = '' }) => {
  const [suggestions, setSuggestions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const inputRef = useRef(null);
  const mapRef = useRef(null);
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [mapVisible, setMapVisible] = useState(false);
  // No API key needed in frontend now

  const fetchSuggestions = async (query) => {
    console.log('Fetching suggestions for query:', query);
    if (!query) {
      setSuggestions([]);
      return;
    }
    setLoading(true);
    try {
      const { data } = await axios.get(`/api/user/location-autocomplete?q=${encodeURIComponent(query)}`);
      console.log('API response:', data);
      setSuggestions(data);
      console.log('Suggestions:', data);

    } catch (err) {
      console.log('API error:', err);
      setSuggestions([]);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const val = e.target.value;
    onChange && onChange(val);
    fetchSuggestions(val);
    setShowDropdown(true);
    console.log('Input changed, showDropdown set to true');
    if (!val) {
      setSelectedLocation(null);
      setMapVisible(false);
    }
  };

  const handleSelect = (suggestion) => {
    console.log('Suggestion selected:', suggestion);
    const loc = {
      name: suggestion.display_place || suggestion.display_name,
      lat: suggestion.lat,
      lon: suggestion.lon,
      raw: suggestion
    };
    setSelectedLocation(loc);
    setMapVisible(false);
    onSelect && onSelect(loc);
    onChange && onChange(loc.name);
    setShowDropdown(false);
    setSuggestions([]);
  };

  const handleBlur = () => {
    setTimeout(() => setShowDropdown(false), 100); // allow click
  };

  console.log('Current suggestions:', suggestions, 'showDropdown:', showDropdown);

  return (
    <div className={`relative w-full ${className}`}>
      <div className="relative">
        <input
          ref={inputRef}
          type="text"
          value={value}
          onChange={handleInputChange}
          onFocus={() => { value && setShowDropdown(true); console.log('Input focused, showDropdown set to', !!value); }}
          onBlur={handleBlur}
          placeholder={placeholder}
          className="px-3 py-2 bg-transparent border-none outline-none w-full shadow-none"
          autoComplete="off"
        />
        {/* Show Map icon button inside input */}
        {selectedLocation && selectedLocation.lat && selectedLocation.lon && !mapVisible && (
          <button
            type="button"
            className="absolute right-2 top-1/2 -translate-y-1/2 p-1.5 bg-primary text-white rounded-full text-base hover:bg-primary-dull transition-all"
            style={{ lineHeight: 0 }}
            onClick={() => setMapVisible(true)}
            title="Show Map"
          >
            <FaMapMarkedAlt />
          </button>
        )}
      </div>
      {showDropdown && suggestions.length > 0 && (
        <ul className="absolute z-10 left-0 right-0 bg-white border border-borderColor rounded-md mt-1 max-h-56 overflow-y-auto shadow-lg">
          {suggestions.map((s, idx) => (
            <li
              key={s.place_id || idx}
              className="px-3 py-2 cursor-pointer hover:bg-gray-100 text-sm"
              onMouseDown={() => handleSelect(s)}
            >
              {s.display_place || s.display_name}
              <span className="block text-xs text-gray-400">{s.display_address || s.display_name}</span>
            </li>
          ))}
        </ul>
      )}
      {loading && <div className="absolute right-3 top-3 text-xs text-gray-400">Loading...</div>}
      {/* Embedded map preview */}
      {selectedLocation && selectedLocation.lat && selectedLocation.lon && mapVisible && (
        <>
          <div ref={mapRef} className="mt-3 rounded-md overflow-hidden border border-gray-200 shadow-sm">
            <iframe
              title="Selected Location Map"
              width="100%"
              height="180"
              frameBorder="0"
              scrolling="no"
              marginHeight="0"
              marginWidth="0"
              src={`https://www.openstreetmap.org/export/embed.html?bbox=${parseFloat(selectedLocation.lon)-0.01}%2C${parseFloat(selectedLocation.lat)-0.01}%2C${parseFloat(selectedLocation.lon)+0.01}%2C${parseFloat(selectedLocation.lat)+0.01}&layer=mapnik&marker=${selectedLocation.lat}%2C${selectedLocation.lon}`}
              style={{ border: 0 }}
              allowFullScreen=""
              aria-hidden="false"
              tabIndex="0"
            ></iframe>
          </div>
          <button
            type="button"
            className="mt-2 px-2 py-1 bg-gray-200 text-gray-700 rounded text-xs font-medium hover:bg-gray-300 transition-all"
            onClick={() => setMapVisible(false)}
            style={{ display: 'block', marginLeft: 'auto' }}
          >
            <FaEyeSlash className="inline mr-1" /> Hide Map
          </button>
        </>
      )}
    </div>
  );
};

export default LocationAutocomplete; 