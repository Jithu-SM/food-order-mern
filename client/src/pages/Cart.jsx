import { ShoppingCart, Trash2, Check, UtensilsCrossed } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';

export default function Cart({ setView }) {
  const { cart, removeFromCart, clearCart } = useCart();
  const { isLoggedIn } = useAuth();
  
  const total = cart.reduce((sum, item) => sum + item.price, 0);
  
  const placeOrder = () => {
    if (!isLoggedIn) {
      alert('Please login to place an order');
      setView('login');
      return;
    }
    
    alert(`Order placed successfully! Total: ₹${total}`);
    clearCart();
  };
  
  if (!isLoggedIn && cart.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center py-16">
            <ShoppingCart className="w-24 h-24 mx-auto text-gray-400 dark:text-gray-600 mb-4" />
            <p className="text-xl text-gray-600 dark:text-gray-400 mb-6">Your cart is empty</p>
            <button
              onClick={() => setView('login')}
              className="bg-gradient-to-r from-green-500 to-yellow-500 text-white px-6 py-3 rounded-lg hover:from-green-600 hover:to-yellow-600 transition"
            >
              Login to Browse Items
            </button>
          </div>
        </div>
      </div>
    );
  }
  
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Shopping Cart
          </h1>
          <p className="text-gray-600 dark:text-gray-300">
            {cart.length} {cart.length === 1 ? 'item' : 'items'} in your cart
          </p>
        </div>
        
        {!isLoggedIn && (
          <div className="mb-6 p-4 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 rounded-lg">
            <p className="mb-3">You must be logged in to checkout.</p>
            <button
              onClick={() => setView('login')}
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
            >
              Login Now
            </button>
          </div>
        )}
        
        {cart.length === 0 ? (
          <div className="text-center py-16">
            <ShoppingCart className="w-24 h-24 mx-auto text-gray-400 dark:text-gray-600 mb-4" />
            <p className="text-xl text-gray-600 dark:text-gray-400">Your cart is empty</p>
          </div>
        ) : (
          <>
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden mb-8">
              {cart.map((item, index) => (
                <div 
                  key={`${item._id}-${index}`}
                  className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700 last:border-b-0 hover:bg-gray-50 dark:hover:bg-gray-750 transition"
                >
                  <div className="flex items-center space-x-4">
                    <div className="w-16 h-16 bg-gradient-to-br from-green-400 to-yellow-400 rounded-lg flex items-center justify-center">
                      <UtensilsCrossed className="w-8 h-8 text-white" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{item.name}</h3>
                      <p className="text-green-600 dark:text-green-400 font-bold">₹{item.price}</p>
                    </div>
                  </div>
                  
                  <button
                    onClick={() => removeFromCart(item._id)}
                    className="p-2 text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                </div>
              ))}
            </div>
            
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
              <div className="flex justify-between items-center mb-6">
                <span className="text-xl font-semibold text-gray-900 dark:text-white">Total Amount</span>
                <span className="text-3xl font-bold text-green-600 dark:text-green-400">₹{total}</span>
              </div>
              
              <div className="flex gap-4">
                <button
                  onClick={placeOrder}
                  disabled={!isLoggedIn}
                  className="flex-1 bg-gradient-to-r from-green-500 to-yellow-500 hover:from-green-600 hover:to-yellow-600 text-white font-bold py-4 px-6 rounded-lg transition transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
                >
                  <Check className="w-6 h-6" />
                  <span>Place Order</span>
                </button>
                
                {cart.length > 0 && (
                  <button
                    onClick={clearCart}
                    className="flex-1 bg-gray-300 dark:bg-gray-700 hover:bg-gray-400 dark:hover:bg-gray-600 text-gray-900 dark:text-white font-bold py-4 px-6 rounded-lg transition"
                  >
                    Clear Cart
                  </button>
                )}
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );

  
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Shopping Cart
          </h1>
          <p className="text-gray-600 dark:text-gray-300">
            {cart.length} {cart.length === 1 ? 'item' : 'items'} in your cart
          </p>
        </div>
        
        {cart.length === 0 ? (
          <div className="text-center py-16">
            <ShoppingCart className="w-24 h-24 mx-auto text-gray-400 dark:text-gray-600 mb-4" />
            <p className="text-xl text-gray-600 dark:text-gray-400">Your cart is empty</p>
          </div>
        ) : (
          <>
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden mb-8">
              {cart.map((item, index) => (
                <div 
                  key={`${item._id}-${index}`}
                  className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700 last:border-b-0 hover:bg-gray-50 dark:hover:bg-gray-750 transition"
                >
                  <div className="flex items-center space-x-4">
                    <div className="w-16 h-16 bg-gradient-to-br from-green-400 to-yellow-400 rounded-lg flex items-center justify-center">
                      <UtensilsCrossed className="w-8 h-8 text-white" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{item.name}</h3>
                      <p className="text-green-600 dark:text-green-400 font-bold">₹{item.price}</p>
                    </div>
                  </div>
                  
                  <button
                    onClick={() => removeFromCart(item._id)}
                    className="p-2 text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                </div>
              ))}
            </div>
            
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
              <div className="flex justify-between items-center mb-6">
                <span className="text-xl font-semibold text-gray-900 dark:text-white">Total Amount</span>
                <span className="text-3xl font-bold text-green-600 dark:text-green-400">₹{total}</span>
              </div>
              
              <button
                onClick={placeOrder}
                className="w-full bg-gradient-to-r from-green-500 to-yellow-500 hover:from-green-600 hover:to-yellow-600 text-white font-bold py-4 px-6 rounded-lg transition transform hover:scale-105 flex items-center justify-center space-x-2"
              >
                <Check className="w-6 h-6" />
                <span>Place Order</span>
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}