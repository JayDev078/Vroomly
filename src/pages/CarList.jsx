import { useState, useEffect } from 'react';
import { cars } from '../data';
import Header from '../components/Header';
import Filters from '../components/Filters';
import CarCard from '../components/CarCard';
import Pagination from '../components/Pagination';
import Toast from '../components/Toast';
import { Search } from 'lucide-react';

const CarList = () => {
  const [allFilteredCars, setAllFilteredCars] = useState(cars);
  const [displayedCars, setDisplayedCars] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilters, setActiveFilters] = useState({
    brand: '',
    fuelType: '',
    seats: '',
    minPrice: '',
    maxPrice: ''
  });
  const [sortOption, setSortOption] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [toast, setToast] = useState(null);
  
  const carsPerPage = 8;
  
  
  const totalPages = Math.ceil(allFilteredCars.length / carsPerPage);
  
 
  const handleSearch = (e) => {
    e.preventDefault();
    applyFiltersAndSearch(activeFilters, searchQuery, sortOption);
    setCurrentPage(1); 
  };
  
  
  const handleFilterChange = (filters) => {
    setActiveFilters(filters);
    applyFiltersAndSearch(filters, searchQuery, sortOption);
    setCurrentPage(1); 
  };
  
  
  const handleSortChange = (sort) => {
    setSortOption(sort);
    applyFiltersAndSearch(activeFilters, searchQuery, sort);
  };
  
  
  const handleWishlistChange = ({ car, action }) => {
    setToast({
      message: action === 'added' 
        ? `${car.brand} ${car.model} added to wishlist` 
        : `${car.brand} ${car.model} removed from wishlist`,
      type: 'success'
    });
  };
  
  
  const applyFiltersAndSearch = (filters, query, sort) => {
    let results = [...cars];
    
    
    if (query) {
      const searchLower = query.toLowerCase();
      results = results.filter(car => 
        car.brand.toLowerCase().includes(searchLower) || 
        car.model.toLowerCase().includes(searchLower)
      );
    }
    
    // Apply filters
    if (filters.brand) {
      results = results.filter(car => car.brand === filters.brand);
    }
    
    if (filters.fuelType) {
      results = results.filter(car => car.fuelType === filters.fuelType);
    }
    
    if (filters.seats) {
      results = results.filter(car => car.seats.toString() === filters.seats);
    }
    
    if (filters.minPrice) {
      results = results.filter(car => car.price >= parseInt(filters.minPrice));
    }
    
    if (filters.maxPrice) {
      results = results.filter(car => car.price <= parseInt(filters.maxPrice));
    }
    
    // Apply sorting
    if (sort) {
      switch (sort) {
        case 'price-asc':
          results.sort((a, b) => a.price - b.price);
          break;
        case 'price-desc':
          results.sort((a, b) => b.price - a.price);
          break;
        case 'name-asc':
          results.sort((a, b) => `${a.brand} ${a.model}`.localeCompare(`${b.brand} ${b.model}`));
          break;
        case 'name-desc':
          results.sort((a, b) => `${b.brand} ${b.model}`.localeCompare(`${a.brand} ${a.model}`));
          break;
        default:
          break;
      }
    }
    
    setAllFilteredCars(results);
  };
  
  
  useEffect(() => {
    const startIndex = (currentPage - 1) * carsPerPage;
    const endIndex = startIndex + carsPerPage;
    setDisplayedCars(allFilteredCars.slice(startIndex, endIndex));
  }, [allFilteredCars, currentPage, carsPerPage]);
  
  
  useEffect(() => {
    setAllFilteredCars(cars);
  }, []);
  
  return (
    <div className="min-h-screen flex flex-col bg-gray-50 dark:bg-gray-900">
      <Header />
      
      <main className="flex-grow container mx-auto px-4 py-6">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Browse Available Cars</h1>
        
        {/* Search Bar */}
        <div className="mb-6">
          <form onSubmit={handleSearch} className="max-w-lg">
            <div className="relative">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search by brand or model..."
                className="w-full px-5 py-3 pr-12 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white shadow-sm focus:outline-none focus:ring-2 focus:ring-primary"
              />
              <button 
                type="submit"
                className="absolute right-2 top-1/2 transform -translate-y-1/2 p-2 bg-primary text-white rounded-full hover:bg-primary-dark focus:outline-none"
              >
                <Search className="h-5 w-5" />
              </button>
            </div>
          </form>
        </div>
        
        {/* Filters */}
        <Filters 
          onFilterChange={handleFilterChange} 
          onSortChange={handleSortChange} 
        />
        
        {/* Results Count */}
        <div className="flex justify-between items-center mb-4">
          <p className="text-gray-700 dark:text-gray-300">
            {allFilteredCars.length} {allFilteredCars.length === 1 ? 'car' : 'cars'} found
          </p>
        </div>
        
        {/* Car Grid */}
        {displayedCars.length > 0 ? (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {displayedCars.map(car => (
                <CarCard key={car.id} car={car} onWishlistChange={handleWishlistChange} />
              ))}
            </div>
            
            {/* Pagination */}
            {totalPages > 1 && (
              <Pagination 
                currentPage={currentPage} 
                totalPages={totalPages} 
                onPageChange={setCurrentPage} 
              />
            )}
          </>
        ) : (
          <div className="text-center py-12">
            <p className="text-lg text-gray-600 dark:text-gray-400">No cars found matching your criteria.</p>
            <button 
              onClick={() => {
                setActiveFilters({
                  brand: '',
                  fuelType: '',
                  seats: '',
                  minPrice: '',
                  maxPrice: ''
                });
                setSearchQuery('');
                setSortOption('');
                setAllFilteredCars(cars);
                setCurrentPage(1);
              }}
              className="mt-4 px-4 py-2 bg-primary text-white rounded-md hover:bg-primary-dark"
            >
              Reset Filters
            </button>
          </div>
        )}
      </main>
      
      <footer className="bg-gray-100 dark:bg-gray-800 py-6">
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

export default CarList;
