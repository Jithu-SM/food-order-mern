import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="bg-gray-900 text-white p-4 flex justify-between">
      <Link to="/" className="font-bold">FoodOrder</Link>
      <div className="space-x-4">
        <Link to="/login">Login</Link>
        <Link to="/cart">Cart</Link>
      </div>
    </nav>
  );
}
