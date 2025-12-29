import { Link } from "react-router-dom";

export default function RestaurantCard({ restaurant }) {
  return (
    <div className="border rounded p-4">
      <h2 className="font-bold">{restaurant.name}</h2>
      <p>{restaurant.description}</p>
      <Link to={`/menu/${restaurant._id}`} className="text-blue-600">
        View Menu
      </Link>
    </div>
  );
}
