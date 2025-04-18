
import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ChevronLeft, Heart, Share2, Calendar, Fuel, Users, TrendingUp } from 'lucide-react';
import Header from '../components/Header';
import Toast from '../components/Toast';
import { cars } from '../data';
import { addToWishlist, removeFromWishlist, isInWishlist } from '../utils/storage';

const CarDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [car, setCar] = useState(null);
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [toast, setToast] = useState(null);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    
    const foundCar = cars.find(c => c.id === parseInt(id) || c.id === id);
    
    if (foundCar) {
      setCar(foundCar);
      setIsWishlisted(isInWishlist(foundCar.id));
    }
    
    setLoading(false);
  }, [id]);
  
  const toggleWishlist = () => {
    if (!car) return;
    
    if (isWishlisted) {
      removeFromWishlist(car.id);
      setIsWishlisted(false);
      setToast({
        message: `${car.brand} ${car.model} removed from wishlist`,
        type: 'success'
      });
    } else {
      addToWishlist(car.id);
      setIsWishlisted(true);
      setToast({
        message: `${car.brand} ${car.model} added to wishlist`,
        type: 'success'
      });
    }
  };
  
  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: `${car.brand} ${car.model}`,
        text: `Check out this ${car.year} ${car.brand} ${car.model}!`,
        url: window.location.href
      }).catch(error => console.log('Error sharing', error));
    } else {
      navigator.clipboard.writeText(window.location.href);
      setToast({
        message: 'Link copied to clipboard',
        type: 'success'
      });
    }
  };
  
  if (loading) {
    return (
      <div className="min-h-screen flex flex-col bg-gray-50 dark:bg-gray-900">
        <Header />
        <main className="flex-grow container mx-auto px-4 py-8 flex justify-center items-center">
          <div className="animate-pulse text-xl text-gray-600 dark:text-gray-400">Loading...</div>
        </main>
      </div>
    );
  }
  
  if (!car) {
    return (
      <div className="min-h-screen flex flex-col bg-gray-50 dark:bg-gray-900">
        <Header />
        <main className="flex-grow container mx-auto px-4 py-8">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-8 text-center">
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Car Not Found</h1>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              The car you're looking for doesn't exist or has been removed.
            </p>
            <button
              onClick={() => navigate('/cars')}
              className="px-6 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors"
            >
              Browse All Cars
            </button>
          </div>
        </main>
      </div>
    );
  }
  
  return (
    <div className="min-h-screen flex flex-col bg-gray-50 dark:bg-gray-900">
      <Header />
      
      <main className="flex-grow container mx-auto px-4 py-6">
        {/* Back button */}
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 mb-6 text-gray-600 dark:text-gray-400 hover:text-primary dark:hover:text-primary-light transition-colors"
        >
          <ChevronLeft className="h-5 w-5" />
          <span>Back to results</span>
        </button>
        
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden">
          {/* Car Image */}
          <div className="relative h-64 md:h-96 bg-gray-200 dark:bg-gray-700">
            <img 
              src={car.image} 
              alt={`${car.brand} ${car.model}`} 
              className="w-full h-full object-cover"
            />
            
            {/* Action buttons */}
            <div className="absolute top-4 right-4 flex gap-2">
              <button
                onClick={toggleWishlist}
                className="p-2 bg-white dark:bg-gray-800 rounded-full shadow-md hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                aria-label={isWishlisted ? "Remove from wishlist" : "Add to wishlist"}
              >
                <Heart 
                  className={`h-5 w-5 ${isWishlisted ? 'text-red-500 fill-red-500' : 'text-gray-600 dark:text-gray-400'}`} 
                />
              </button>
              
              <button
                onClick={handleShare}
                className="p-2 bg-white dark:bg-gray-800 rounded-full shadow-md hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                aria-label="Share"
              >
                <Share2 className="h-5 w-5 text-gray-600 dark:text-gray-400" />
              </button>
            </div>
          </div>
          
          {/* Car Details */}
          <div className="p-6">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h1 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white">{car.brand} {car.model}</h1>
                <p className="text-lg text-gray-600 dark:text-gray-400">{car.year}</p>
              </div>
              
              <div className="text-2xl md:text-3xl font-bold text-primary dark:text-primary-light">
                ${car.price.toLocaleString()}
              </div>
            </div>
            
            {/* Key Features */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
              <div className="flex items-center gap-2">
                <Calendar className="h-5 w-5 text-gray-600 dark:text-gray-400" />
                <span className="text-gray-700 dark:text-gray-300">{car.year}</span>
              </div>
              <div className="flex items-center gap-2">
                <Fuel className="h-5 w-5 text-gray-600 dark:text-gray-400" />
                <span className="text-gray-700 dark:text-gray-300">{car.fuelType}</span>
              </div>
              <div className="flex items-center gap-2">
                <Users className="h-5 w-5 text-gray-600 dark:text-gray-400" />
                <span className="text-gray-700 dark:text-gray-300">{car.seats} Seats</span>
              </div>
              <div className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5 text-gray-600 dark:text-gray-400" />
                <span className="text-gray-700 dark:text-gray-300">
                  {car.mileage === 0 ? 'New' : `${car.mileage.toLocaleString()} mi`}
                </span>
              </div>
            </div>
            
            {/* Description */}
            <div className="mb-8">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">Description</h2>
              <p className="text-gray-700 dark:text-gray-300">{car.description}</p>
            </div>
            
            {/* Specifications */}
            {car.specifications && (
              <div className="mb-8">
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Specifications</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {Object.entries(car.specifications).map(([key, value]) => (
                    <div key={key} className="flex justify-between p-3 bg-gray-50 dark:bg-gray-750 rounded-md">
                      <span className="text-gray-600 dark:text-gray-400">{key}</span>
                      <span className="text-gray-900 dark:text-white font-medium">{value}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
            
            {/* Contact Section */}
            <div className="mt-8 p-4 bg-gray-50 dark:bg-gray-750 rounded-lg">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Interested in this car?</h2>
              <div className="flex flex-col sm:flex-row gap-4">
                <button className="flex-1 py-3 bg-primary text-white font-medium rounded-lg hover:bg-primary-dark transition-colors">
                  Schedule Test Drive
                </button>
                <button className="flex-1 py-3 bg-white dark:bg-gray-700 text-gray-900 dark:text-white font-medium border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-650 transition-colors">
                  Contact Dealer
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>
      
      <footer className="bg-gray-100 dark:bg-gray-800 py-6 mt-8">
        <div className="container mx-auto px-4 text-center text-gray-600 dark:text-gray-400">
          <p>Made with 💗 By Jay</p>
        </div>
      </footer>
      
      {/* Toast Notification */}
      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(null)}
        />
      )}
    </div>
  );
};

export default CarDetail;
