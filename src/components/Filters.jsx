
import { useState } from 'react';
import { cars } from '../data';

const Filters = ({ onFilterChange, onSortChange }) => {
  const [filters, setFilters] = useState({
    brand: '',
    fuelType: '',
    seats: '',
    minPrice: '',
    maxPrice: ''
  });
  
 
  const brands = [...new Set(cars.map(car => car.brand))].sort();
  const fuelTypes = [...new Set(cars.map(car => car.fuelType))].sort();
  const seatingOptions = [...new Set(cars.map(car => car.seats))].sort((a, b) => a - b);
  
  
  const minPriceOptions = [0, 10000, 20000, 30000, 50000, 75000];
  const maxPriceOptions = [10000, 20000, 30000, 50000, 75000, 100000, 150000];
  
  
  const sortOptions = [
    { value: 'price-asc', label: 'Price: Low to High' },
    { value: 'price-desc', label: 'Price: High to Low' },
    { value: 'name-asc', label: 'Name: A to Z' },
    { value: 'name-desc', label: 'Name: Z to A' }
  ];
  
 
  const handleFilterChange = (name, value) => {
    const newFilters = { ...filters, [name]: value };
    setFilters(newFilters);
    onFilterChange(newFilters);
  };
  
  return (
    <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md mb-6">
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
        {/* Brand Filter */}
        <div>
          <label htmlFor="brand" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Brand
          </label>
          <select
            id="brand"
            value={filters.brand}
            onChange={(e) => handleFilterChange('brand', e.target.value)}
            className="w-full p-2 border border-gray-300 dark:border-gray-700 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
          >
            <option value="">All Brands</option>
            {brands.map(brand => (
              <option key={brand} value={brand}>{brand}</option>
            ))}
          </select>
        </div>
        
        {/* Fuel Type Filter */}
        <div>
          <label htmlFor="fuelType" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Fuel Type
          </label>
          <select
            id="fuelType"
            value={filters.fuelType}
            onChange={(e) => handleFilterChange('fuelType', e.target.value)}
            className="w-full p-2 border border-gray-300 dark:border-gray-700 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
          >
            <option value="">All Fuel Types</option>
            {fuelTypes.map(fuel => (
              <option key={fuel} value={fuel}>{fuel}</option>
            ))}
          </select>
        </div>
        
        {/* Seats Filter */}
        <div>
          <label htmlFor="seats" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Seats
          </label>
          <select
            id="seats"
            value={filters.seats}
            onChange={(e) => handleFilterChange('seats', e.target.value)}
            className="w-full p-2 border border-gray-300 dark:border-gray-700 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
          >
            <option value="">Any Seats</option>
            {seatingOptions.map(seat => (
              <option key={seat} value={seat}>{seat}</option>
            ))}
          </select>
        </div>
        
        {/* Price Range Filters */}
        <div>
          <label htmlFor="minPrice" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Min Price
          </label>
          <select
            id="minPrice"
            value={filters.minPrice}
            onChange={(e) => handleFilterChange('minPrice', e.target.value)}
            className="w-full p-2 border border-gray-300 dark:border-gray-700 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
          >
            <option value="">No Min</option>
            {minPriceOptions.map(price => (
              <option key={price} value={price}>${price.toLocaleString()}</option>
            ))}
          </select>
        </div>
        
        <div>
          <label htmlFor="maxPrice" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Max Price
          </label>
          <select
            id="maxPrice"
            value={filters.maxPrice}
            onChange={(e) => handleFilterChange('maxPrice', e.target.value)}
            className="w-full p-2 border border-gray-300 dark:border-gray-700 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
          >
            <option value="">No Max</option>
            {maxPriceOptions.map(price => (
              <option key={price} value={price}>${price.toLocaleString()}</option>
            ))}
          </select>
        </div>
      </div>
      
      {/* Sort Options */}
      <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
        <div className="flex items-center">
          <label htmlFor="sort" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mr-3">
            Sort By:
          </label>
          <select
            id="sort"
            onChange={(e) => onSortChange(e.target.value)}
            className="p-2 border border-gray-300 dark:border-gray-700 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
          >
            <option value="">Default</option>
            {sortOptions.map(option => (
              <option key={option.value} value={option.value}>{option.label}</option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
};

export default Filters;