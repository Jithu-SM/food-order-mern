import { ShoppingCart, Sun, Moon, Home, User, LogIn, UtensilsCrossed, LogOut, Settings } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { useAuth } from '../context/AuthContext';

export default function Navbar({ setView }) {
  const { isDark, setIsDark } = useTheme();
  const { isLoggedIn, isAdmin, user, logout } = useAuth();
  
  const handleLogout = () => {
    logout();
    setView('home');
  };
  
  return (
    <nav className="sticky top-0 z-50 bg-gradient-to-r from-green-600 to-yellow-500 dark:from-green-800 dark:to-yellow-700 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-2 cursor-pointer" onClick={() => setView('home')}>
            <UtensilsCrossed className="w-8 h-8 text-white" />
            <span className="text-2xl font-bold text-white">FoodOrder</span>
          </div>
          
          <div className="flex items-center space-x-6">
            <button 
              onClick={() => setView('home')}
              className="flex items-center space-x-1 text-white hover:text-gray-200 transition"
            >
              <Home className="w-5 h-5" />
              <span>Home</span>
            </button>

            {isLoggedIn ? (
              <>
                {!isAdmin && (
                  <button 
                    onClick={() => setView('cart')}
                    className="flex items-center space-x-1 text-white hover:text-gray-200 transition"
                  >
                    <ShoppingCart className="w-5 h-5" />
                    <span>Cart</span>
                  </button>
                )}

                {isAdmin && (
                  <button 
                    onClick={() => setView('admin')}
                    className="flex items-center space-x-1 text-white hover:text-gray-200 transition"
                  >
                    <Settings className="w-5 h-5" />
                    <span>Admin</span>
                  </button>
                )}

                <button 
                  onClick={() => setView('profile')}
                  className="flex items-center space-x-1 text-white hover:text-gray-200 transition"
                >
                  <User className="w-5 h-5" />
                  <span>{user?.username || 'Profile'}</span>
                </button>
                
                <button 
                  onClick={handleLogout}
                  className="flex items-center space-x-1 text-white hover:text-gray-200 transition"
                >
                  <LogOut className="w-5 h-5" />
                  <span>Logout</span>
                </button>
              </>
            ) : (
              <>
                <button 
                  onClick={() => setView('register')}
                  className="flex items-center space-x-1 text-white hover:text-gray-200 transition"
                >
                  <User className="w-5 h-5" />
                  <span>Register</span>
                </button>
                <button 
                  onClick={() => setView('login')}
                  className="flex items-center space-x-1 text-white hover:text-gray-200 transition"
                >
                  <LogIn className="w-5 h-5" />
                  <span>Login</span>
                </button>
              </>
            )}
            
            <button
              onClick={() => setIsDark(!isDark)}
              className="p-2 rounded-full bg-white/20 hover:bg-white/30 transition"
            >
              {isDark ? <Sun className="w-5 h-5 text-white" /> : <Moon className="w-5 h-5 text-white" />}
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}
