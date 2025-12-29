export default function FoodCard({ food }) {
  return (
    <div className="border rounded p-4">
      <h3 className="font-semibold">{food.name}</h3>
      <p>₹{food.price}</p>
      <button className="bg-green-600 text-white px-3 py-1 mt-2">
        Add to Cart
      </button>
    </div>
  );
}
