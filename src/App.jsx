
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import CarList from './pages/CarList';
import Wishlist from './pages/Wishlist';
import CarDetail from './pages/CarDetail';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/cars" element={<CarList />} />
        <Route path="/cars/:id" element={<CarDetail />} />
        <Route path="/wishlist" element={<Wishlist />} />
      </Routes>
    </Router>
  );
}

export default App;