import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import API from "../services/api";
import FoodCard from "../components/FoodCard";

export default function Menu() {
  const { id } = useParams();
  const [foods, setFoods] = useState([]);

  useEffect(() => {
    API.get(`/foods/restaurant/${id}`).then(res => setFoods(res.data));
  }, [id]);

  return (
    <div className="p-6 grid grid-cols-3 gap-4">
      {foods.map(f => (
        <FoodCard key={f._id} food={f} />
      ))}
    </div>
  );
}
