import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Moon, Sun, Menu, X } from 'lucide-react';

const Header = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  
  useEffect(() => {
    
    const isDark = localStorage.getItem('darkMode') === 'true';
    setDarkMode(isDark);
    document.documentElement.setAttribute('data-theme', isDark ? 'dark' : 'light');
  }, []);

  const toggleDarkMode = () => {
    const newMode = !darkMode;
    setDarkMode(newMode);
    localStorage.setItem('darkMode', newMode);
    document.documentElement.setAttribute('data-theme', newMode ? 'dark' : 'light');
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };
  
  const isActive = (path) => {
    return location.pathname === path;
  };

  return (
    <header className="sticky top-0 bg-white dark:bg-gray-900 shadow-md z-10">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center">
            <Link to="/" className="text-2xl font-bold text-primary-dark dark:text-primary-light">
              Vroomly 
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link 
              to="/" 
              className={`font-medium ${isActive('/') 
                ? 'text-primary-dark dark:text-primary-light' 
                : 'text-gray-700 dark:text-gray-200 hover:text-primary-dark dark:hover:text-primary-light'}`}
            >
              Home
            </Link>
            <Link 
              to="/cars" 
              className={`font-medium ${isActive('/cars') 
                ? 'text-primary-dark dark:text-primary-light' 
                : 'text-gray-700 dark:text-gray-200 hover:text-primary-dark dark:hover:text-primary-light'}`}
            >
              Browse Cars
            </Link>
            <Link 
              to="/wishlist" 
              className={`font-medium ${isActive('/wishlist') 
                ? 'text-primary-dark dark:text-primary-light' 
                : 'text-gray-700 dark:text-gray-200 hover:text-primary-dark dark:hover:text-primary-light'}`}
            >
              Wishlist
            </Link>
            <button
              onClick={toggleDarkMode}
              className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 focus:outline-none"
              aria-label="Toggle dark mode"
            >
              {darkMode ? (
                <Sun className="h-5 w-5 text-yellow-500" />
              ) : (
                <Moon className="h-5 w-5 text-gray-700" />
              )}
            </button>
          </nav>

          {/* Mobile Navigation Toggle */}
          <button
            className="md:hidden p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 focus:outline-none"
            onClick={toggleMenu}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? (
              <X className="h-6 w-6 text-gray-700 dark:text-gray-200" />
            ) : (
              <Menu className="h-6 w-6 text-gray-700 dark:text-gray-200" />
            )}
          </button>
        </div>

        {/* Mobile Navigation Menu */}
        {isMenuOpen && (
          <div className="md:hidden py-4 space-y-4">
            <Link
              to="/"
              className={`block font-medium ${isActive('/') 
                ? 'text-primary-dark dark:text-primary-light' 
                : 'text-gray-700 dark:text-gray-200 hover:text-primary-dark dark:hover:text-primary-light'}`}
              onClick={() => setIsMenuOpen(false)}
            >
              Home
            </Link>
            <Link
              to="/cars"
              className={`block font-medium ${isActive('/cars') 
                ? 'text-primary-dark dark:text-primary-light' 
                : 'text-gray-700 dark:text-gray-200 hover:text-primary-dark dark:hover:text-primary-light'}`}
              onClick={() => setIsMenuOpen(false)}
            >
              Browse Cars
            </Link>
            <Link
              to="/wishlist"
              className={`block font-medium ${isActive('/wishlist') 
                ? 'text-primary-dark dark:text-primary-light' 
                : 'text-gray-700 dark:text-gray-200 hover:text-primary-dark dark:hover:text-primary-light'}`}
              onClick={() => setIsMenuOpen(false)}
            >
              Wishlist
            </Link>
            <button
              onClick={toggleDarkMode}
              className="flex items-center space-x-2 text-gray-700 dark:text-gray-200 hover:text-primary-dark dark:hover:text-primary-light font-medium"
            >
              {darkMode ? (
                <>
                  <Sun className="h-5 w-5 text-yellow-500" />
                  <span>Light Mode</span>
                </>
              ) : (
                <>
                  <Moon className="h-5 w-5" />
                  <span>Dark Mode</span>
                </>
              )}
            </button>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;