import { useEffect, useState } from 'react';
import API from '../services/api';
import FoodCard from '../components/FoodCard';
import Loader from '../components/Loader';

export default function Menu({ restaurantId, onBack }) {
  const [foods, setFoods] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchFoods = async () => {
      try {
        setLoading(true);
        const response = await API.get(`/foods/restaurant/${restaurantId}`);
        setFoods(response.data);
      } catch (err) {
        console.error('Failed to fetch foods:', err);
        setError('Failed to load menu. Using mock data.');
        // Fallback to mock data
        setFoods([
          { _id: '1', name: 'Green Salad Bowl', price: 249 },
          { _id: '2', name: 'Sunshine Pasta', price: 349 },
          { _id: '3', name: 'Golden Rice Platter', price: 299 },
          { _id: '4', name: 'Fresh Veggie Wrap', price: 199 },
          { _id: '5', name: 'Garden Pizza', price: 399 },
          { _id: '6', name: 'Harvest Burger', price: 279 },
        ]);
      } finally {
        setLoading(false);
      }
    };

    if (restaurantId) {
      fetchFoods();
    }
  }, [restaurantId]);

  if (loading) return <Loader />;
  
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <button 
          onClick={onBack}
          className="mb-8 text-green-600 dark:text-green-400 hover:text-green-700 dark:hover:text-green-300 font-semibold"
        >
          ← Back to Restaurants
        </button>

        {error && (
          <div className="mb-6 p-4 bg-yellow-100 dark:bg-yellow-900 text-yellow-800 dark:text-yellow-200 rounded-lg">
            {error}
          </div>
        )}
        
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Menu
          </h1>
        </div>
        
        {foods.length === 0 ? (
          <p className="text-center text-gray-600 dark:text-gray-400">
            No items available on the menu
          </p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {foods.map(f => (
              <FoodCard key={f._id} food={f} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
