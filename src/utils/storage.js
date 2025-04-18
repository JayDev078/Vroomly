
export const getWishlist = () => {
    const wishlist = localStorage.getItem('carFinderWishlist');
    return wishlist ? JSON.parse(wishlist) : [];
  };
  
  export const addToWishlist = (carId) => {
    const wishlist = getWishlist();
    if (!wishlist.includes(carId)) {
      const newWishlist = [...wishlist, carId];
      localStorage.setItem('carFinderWishlist', JSON.stringify(newWishlist));
      return true;
    }
    return false; 
  };
  
  export const removeFromWishlist = (carId) => {
    const wishlist = getWishlist();
    if (wishlist.includes(carId)) {
      const newWishlist = wishlist.filter(id => id !== carId);
      localStorage.setItem('carFinderWishlist', JSON.stringify(newWishlist));
      return true; 
    }
    return false; 
  };
  
  export const isInWishlist = (carId) => {
    const wishlist = getWishlist();
    return wishlist.includes(carId);
  };