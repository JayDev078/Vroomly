//  toast notification component
import { useState, useEffect } from 'react';
import { X } from 'lucide-react';

const Toast = ({ message, type = 'success', duration = 3000, onClose }) => {
  const [isVisible, setIsVisible] = useState(true);
  
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
      setTimeout(() => {
        onClose && onClose();
      }, 300); 
    }, duration);
    
    return () => clearTimeout(timer);
  }, [duration, onClose]);
  
  const bgColor = type === 'success' ? 'bg-green-500' : 'bg-red-500';
  
  return (
    <div
      className={`fixed bottom-4 right-4 flex items-center gap-2 px-4 py-2 rounded-md text-white shadow-lg transition-opacity duration-300 ${bgColor} ${
        isVisible ? 'opacity-100' : 'opacity-0'
      }`}
    >
      <span>{message}</span>
      <button
        onClick={() => {
          setIsVisible(false);
          setTimeout(() => onClose && onClose(), 300);
        }}
        className="p-1 rounded-full hover:bg-white hover:bg-opacity-20"
      >
        <X className="h-4 w-4" />
      </button>
    </div>
  );
};

export default Toast;