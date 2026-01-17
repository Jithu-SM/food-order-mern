import { Store } from 'lucide-react';

export default function RestaurantCard({ restaurant, onClick }) {
  return (
    <div 
      onClick={onClick}
      className="bg-white dark:bg-gray-800 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden cursor-pointer transform hover:-translate-y-1"
    >
      <div className="h-48 bg-gradient-to-br from-green-400 to-yellow-400 dark:from-green-600 dark:to-yellow-600 flex items-center justify-center">
        <Store className="w-20 h-20 text-white opacity-80" />
      </div>
      <div className="p-6">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">{restaurant.name}</h2>
        <p className="text-gray-600 dark:text-gray-300 mb-4">{restaurant.description}</p>
        <button className="w-full bg-gradient-to-r from-green-500 to-yellow-500 hover:from-green-600 hover:to-yellow-600 text-white font-semibold py-2 px-4 rounded-lg transition">
          View Menu
        </button>
      </div>
    </div>
  );
}
