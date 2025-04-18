
import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Heart } from 'lucide-react';
import { addToWishlist, removeFromWishlist, isInWishlist } from '../utils/storage';

const CarCard = ({ car, onWishlistChange }) => {
  const [isWishlisted, setIsWishlisted] = useState(false);
  const navigate = useNavigate();
  
  useEffect(() => {
    setIsWishlisted(isInWishlist(car.id));
  }, [car.id]);
  
  const toggleWishlist = (e) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (isWishlisted) {
      removeFromWishlist(car.id);
      setIsWishlisted(false);
      if (onWishlistChange) {
        onWishlistChange({ car, action: 'removed' });
      }
    } else {
      addToWishlist(car.id);
      setIsWishlisted(true);
      if (onWishlistChange) {
        onWishlistChange({ car, action: 'added' });
      }
    }
  };
  
  const handleCardClick = () => {
    navigate(`/cars/${car.id}`);
  };
  
  return (
    <div 
      className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden transition-transform hover:shadow-lg hover:-translate-y-1 cursor-pointer"
      onClick={handleCardClick}
    >
      <div className="relative">
        <img 
          src={car.image} 
          alt={`${car.brand} ${car.model}`}
          className="w-full h-48 object-cover"
        />
        <button 
          className="absolute top-2 right-2 p-1.5 bg-white dark:bg-gray-800 rounded-full shadow hover:bg-gray-100 dark:hover:bg-gray-700"
          onClick={toggleWishlist}
          aria-label={isWishlisted ? "Remove from wishlist" : "Add to wishlist"}
        >
          <Heart 
            className={`h-5 w-5 ${isWishlisted ? 'text-red-500 fill-red-500' : 'text-gray-400'}`} 
          />
        </button>
      </div>
      
      <div className="p-4">
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-lg font-bold text-gray-900 dark:text-white">{car.brand} {car.model}</h3>
          <span className="text-sm px-2 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-100 rounded-full">
            {car.year}
          </span>
        </div>
        
        <p className="text-sm text-gray-600 dark:text-gray-300 mb-3 line-clamp-2">{car.description}</p>
        
        <div className="flex flex-wrap gap-2 mb-3">
          <span className="text-xs px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-full">
            {car.fuelType}
          </span>
          <span className="text-xs px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-full">
            {car.seats} Seats
          </span>
          <span className="text-xs px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-full">
            {car.mileage === 0 ? 'New' : `${car.mileage.toLocaleString()} mi`}
          </span>
        </div>
        
        <div className="flex justify-between items-center mt-4">
          <span className="text-xl font-bold text-gray-900 dark:text-white">
            ${car.price.toLocaleString()}
          </span>
          <button className="px-3 py-1.5 bg-primary hover:bg-primary-dark text-white text-sm font-medium rounded-lg transition-colors">
            View Details
          </button>
        </div>
      </div>
    </div>
  );
};

export default CarCard;