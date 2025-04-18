import { ChevronLeft, ChevronRight } from 'lucide-react';

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  const goToPage = (page) => {
    if (page >= 1 && page <= totalPages) {
      onPageChange(page);
      window.scrollTo(0, 0);
    }
  };
  

  const getPageNumbers = () => {
    const pages = [];
    const maxPagesToShow = 5;
    
    if (totalPages <= maxPagesToShow) {
     
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      
      let startPage = Math.max(currentPage - 2, 1);
      let endPage = startPage + maxPagesToShow - 1;
      
      if (endPage > totalPages) {
        endPage = totalPages;
        startPage = Math.max(endPage - maxPagesToShow + 1, 1);
      }
      
      for (let i = startPage; i <= endPage; i++) {
        pages.push(i);
      }
      
     
      if (startPage > 1) {
        pages.unshift('...');
        pages.unshift(1);
      }
      
      if (endPage < totalPages) {
        pages.push('...');
        pages.push(totalPages);
      }
    }
    
    return pages;
  };
  
  return (
    <div className="flex justify-center items-center mt-8 mb-4">
      <div className="flex items-center space-x-1">
       
        <button
          onClick={() => goToPage(currentPage - 1)}
          disabled={currentPage === 1}
          className={`px-3 py-1 rounded-md ${
            currentPage === 1
              ? 'text-gray-400 cursor-not-allowed'
              : 'text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
          }`}
          aria-label="Previous page"
        >
          <ChevronLeft className="h-5 w-5" />
        </button>
        
        
        {getPageNumbers().map((page, idx) => (
          <button
            key={idx}
            onClick={() => (typeof page === 'number' ? goToPage(page) : null)}
            disabled={page === '...'}
            className={`px-3 py-1 rounded-md ${
              page === currentPage
                ? 'bg-primary text-white'
                : page === '...'
                ? 'text-gray-500 cursor-default'
                : 'text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
            }`}
          >
            {page}
          </button>
        ))}
        
        
        <button
          onClick={() => goToPage(currentPage + 1)}
          disabled={currentPage === totalPages}
          className={`px-3 py-1 rounded-md ${
            currentPage === totalPages
              ? 'text-gray-400 cursor-not-allowed'
              : 'text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
          }`}
          aria-label="Next page"
        >
          <ChevronRight className="h-5 w-5" />
        </button>
      </div>
    </div>
  );
};

export default Pagination;
