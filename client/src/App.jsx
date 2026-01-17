import { useState } from 'react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Menu from './pages/Menu';
import Login from './pages/Login';
import Register from './pages/Register';
import Cart from './pages/Cart';
import Profile from './pages/Profile';
import Admin from './pages/Admin';
import { ThemeProvider } from './context/ThemeContext';
import { AuthProvider } from './context/AuthContext';
import { CartProvider } from './context/CartContext';

export default function App() {
  const [view, setView] = useState('home');
  const [restaurantId, setRestaurantId] = useState(null);

  return (
    <ThemeProvider>
      <AuthProvider>
        <CartProvider>
          <div className="flex flex-col min-h-screen">
            <Navbar setView={setView} />
            
            <main className="flex-grow">
              {view === 'home' && <Home setView={setView} setRestaurantId={setRestaurantId} />}
              {view === 'menu' && <Menu restaurantId={restaurantId} onBack={() => setView('home')} />}
              {view === 'login' && <Login setView={setView} />}
              {view === 'register' && <Register setView={setView} />}
              {view === 'cart' && <Cart setView={setView} />}
              {view === 'profile' && <Profile setView={setView} />}
              {view === 'admin' && <Admin setView={setView} />}
            </main>
            
            <Footer />
          </div>
        </CartProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}
