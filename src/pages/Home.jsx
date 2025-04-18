import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Hero from '../components/Hero';

const Home = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow">
        <Hero />
        <div className="container mx-auto px-4 py-12">
          <div className="text-center">
            <Link 
              to="/cars"
              className="px-6 py-3 bg-primary text-white font-medium rounded-lg hover:bg-primary-dark transition-colors"
            >
              Browse All Cars
            </Link>
          </div>
        </div>
      </main>
      <footer className="bg-gray-100 dark:bg-gray-900 py-6">
        <div className="container mx-auto px-4 text-center text-gray-600 dark:text-gray-400">
          <p>  Made with 💗 By Jay</p>
        </div>
      </footer>
    </div>
  );
};

export default Home;
