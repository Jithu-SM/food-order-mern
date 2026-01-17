import { useEffect, useState } from 'react';
import RestaurantCard from '../components/RestaurantCard';
import API from '../services/api';
import Loader from '../components/Loader';

export default function Home({ setRestaurantId, setView }) {
  const [restaurants, setRestaurants] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchRestaurants = async () => {
      try {
        setLoading(true);
        const response = await API.get('/restaurants');
        setRestaurants(response.data);
      } catch (err) {
        console.error('Failed to fetch restaurants:', err);
        setError('Failed to load restaurants. Using mock data.');
        // Fallback to mock data
        setRestaurants([
          { _id: '1', name: 'Green Garden Cafe', description: 'Fresh organic meals with a modern twist' },
          { _id: '2', name: 'Golden Spice Kitchen', description: 'Authentic flavors from around the world' },
          { _id: '3', name: 'Sunshine Bistro', description: 'Comfort food that feels like home' },
          { _id: '4', name: 'Fresh Harvest', description: 'Farm-to-table dining experience' },
          { _id: '5', name: 'Urban Eats', description: 'Contemporary cuisine for modern tastes' },
          { _id: '6', name: 'The Green Leaf', description: 'Plant-based paradise for food lovers' },
        ]);
      } finally {
        setLoading(false);
      }
    };

    fetchRestaurants();
  }, []);

  if (loading) return <Loader />;
  
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {error && (
          <div className="mb-6 p-4 bg-yellow-100 dark:bg-yellow-900 text-yellow-800 dark:text-yellow-200 rounded-lg">
            {error}
          </div>
        )}
        
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-gray-900 dark:text-white mb-4">
            Discover Amazing Restaurants
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300">
            Order delicious food from your favorite local spots
          </p>
        </div>
        
        {restaurants.length === 0 ? (
          <p className="text-center text-gray-600 dark:text-gray-400">
            No restaurants available
          </p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {restaurants.map(r => (
              <RestaurantCard 
                key={r._id} 
                restaurant={r} 
                onClick={() => {
                  setRestaurantId(r._id);
                  setView('menu');
                }} 
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
