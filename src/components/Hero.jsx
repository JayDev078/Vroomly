import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search } from 'lucide-react';

const Hero = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/cars?search=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  return (
    <div className="relative bg-gradient-to-b from-primary-light to-primary py-32 text-white overflow-hidden">
      <div className="absolute inset-0 bg-pattern opacity-10"></div>
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto text-center flex flex-col items-center">
        
          <div className="mb-12 transform transition-transform duration-500 hover:scale-105">
            <img
              src="public/download.svg"
              alt="Vroomly Logo"
              className="w-80 md:w-96 h-auto drop-shadow-2xl"
            />
          </div>

          <h1 className="text-4xl md:text-6xl font-bold mb-8 tracking-tight">
            Find Your Perfect Car
          </h1>
          
          <p className="text-xl md:text-2xl mb-12 max-w-3xl mx-auto text-white text-opacity-90 leading-relaxed">
            Browse our collection of premium cars and find the one that fits your lifestyle.
          </p>

          
          <form onSubmit={handleSearch} className="w-full max-w-2xl mx-auto mb-12">
            <div className="relative flex items-center">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search by brand or model..."
                className="w-full px-8 py-5 pr-16 rounded-full bg-white text-gray-800 shadow-2xl focus:outline-none focus:ring-4 focus:ring-white focus:ring-opacity-30 transition-all text-lg"
              />
              <button
                type="submit"
                className="absolute right-4 top-1/2 transform -translate-y-1/2 p-4 bg-primary text-white rounded-full hover:bg-primary-dark transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-dark"
                aria-label="Search"
              >
                <Search className="h-6 w-6" />
              </button>
            </div>
          </form>

          
          <div className="flex flex-wrap justify-center gap-6 mt-6">
            <span className="px-8 py-3 text-gray-400 bg-white bg-opacity-15 backdrop-blur-sm rounded-full text-base font-medium shadow-lg transition-transform hover:transform hover:scale-105">
              20+ Brands
            </span>
            <span className="px-8 py-3 text-gray-400 bg-white bg-opacity-15 backdrop-blur-sm rounded-full text-base font-medium  shadow-lg transition-transform hover:transform hover:scale-105">
              100+ Models
            </span>
            <span className="px-8 py-3 text-gray-400 bg-white bg-opacity-15 backdrop-blur-sm rounded-full text-base font-medium  shadow-lg transition-transform hover:transform hover:scale-105">
              Best Prices
            </span>
          </div>
        </div>
      </div>
      
      
      <div className="absolute -bottom-24 -left-24 w-96 h-96 rounded-full bg-white opacity-5"></div>
      <div className="absolute -top-32 -right-32 w-96 h-96 rounded-full bg-white opacity-5"></div>
    </div>
  );
};

export default Hero;