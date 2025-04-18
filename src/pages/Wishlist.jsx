import { useState, useEffect } from 'react';
import { cars } from '../data';
import { getWishlist } from '../utils/storage';
import Header from '../components/Header';
import CarCard from '../components/CarCard';
import Toast from '../components/Toast';
import { X } from 'lucide-react';

const Wishlist = () => {
  const [wishlistCars, setWishlistCars] = useState([]);
  const [toast, setToast] = useState(null);
  

  useEffect(() => {
    loadWishlist();
  }, []);
  
  const loadWishlist = () => {
    const wishlistIds = getWishlist();
    const wishlistItems = cars.filter(car => wishlistIds.includes(car.id));
    setWishlistCars(wishlistItems);
  };
  
 
  const handleWishlistChange = ({ car, action }) => {
   
    if (action === 'removed') {
      loadWishlist();
    }
    
    setToast({
      message: action === 'added' 
        ? `${car.brand} ${car.model} added to wishlist` 
        : `${car.brand} ${car.model} removed from wishlist`,
      type: 'success'
    });
  };
  
  return (
    <div className="min-h-screen flex flex-col bg-gray-50 dark:bg-gray-900">
      <Header />
      
      <main className="flex-grow container mx-auto px-4 py-6">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">My Wishlist</h1>
        
        {wishlistCars.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {wishlistCars.map(car => (
              <CarCard key={car.id} car={car} onWishlistChange={handleWishlistChange} />
            ))}
          </div>
        ) : (
          <div className="text-center py-16 bg-white dark:bg-gray-800 rounded-lg shadow">
            <div className="mb-4 flex justify-center">
              <div className="p-3 bg-gray-100 dark:bg-gray-700 rounded-full">
                <X className="h-8 w-8 text-gray-400" />
              </div>
            </div>
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">Your wishlist is empty</h2>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              Start adding cars to your wishlist while browsing our collection.
            </p>
          </div>
        )}
      </main>
      
      <footer className="bg-gray-100 dark:bg-gray-800 py-6 mt-auto">
        <div className="container mx-auto px-4 text-center text-gray-600 dark:text-gray-400">
          <p>Made with 💗 By Jay</p>
        </div>
      </footer>
      
    
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

export default Wishlist;
