import { useEffect, useState } from "react";
import API from "../services/api";
import RestaurantCard from "../components/RestaurantCard";

export default function Home() {
  const [restaurants, setRestaurants] = useState([]);

  useEffect(() => {
    API.get("/restaurants").then(res => setRestaurants(res.data));
  }, []);

  return (
    <div className="p-6 grid grid-cols-3 gap-4">
      {restaurants.map(r => (
        <RestaurantCard key={r._id} restaurant={r} />
      ))}
    </div>
  );
}
