import { ShoppingCart, Check, UtensilsCrossed } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useState } from 'react';

export default function FoodCard({ food }) {
  const { addToCart } = useCart();
  const [added, setAdded] = useState(false);
  
  const handleAdd = () => {
    addToCart(food);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };
  
  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden">
      <div className="h-40 bg-gradient-to-br from-yellow-300 to-green-400 dark:from-yellow-600 dark:to-green-600 flex items-center justify-center">
        <UtensilsCrossed className="w-16 h-16 text-white opacity-80" />
      </div>
      <div className="p-5">
        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">{food.name}</h3>
        <p className="text-2xl font-bold text-green-600 dark:text-green-400 mb-4">₹{food.price}</p>
        <button
          onClick={handleAdd}
          disabled={added}
          className={`w-full font-semibold py-2 px-4 rounded-lg transition flex items-center justify-center space-x-2 ${
            added 
              ? 'bg-green-500 text-white' 
              : 'bg-gradient-to-r from-green-500 to-yellow-500 hover:from-green-600 hover:to-yellow-600 text-white'
          }`}
        >
          {added ? (
            <>
              <Check className="w-5 h-5" />
              <span>Added!</span>
            </>
          ) : (
            <>
              <ShoppingCart className="w-5 h-5" />
              <span>Add to Cart</span>
            </>
          )}
        </button>
      </div>
    </div>
  );
}
