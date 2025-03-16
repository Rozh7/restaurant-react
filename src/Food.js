import { useState } from "react";

export default function Food({ food, handleAddFood }) {
  const [foods, setFood] = useState(food.name);
  const [image, SetImage] = useState(food.image);
  const [price, setPrice] = useState(food.price);
  function addFood() {
    setFood(food.name);
    SetImage(food.image);
    setPrice(food.price);
    const newFood = {
      foods,
      image,
      id: Date.now(),
      quantity: 1,
      price,
    };
    handleAddFood(newFood);
  }

  return (
    <li>
      <img src={food.image} alt={food.name} />
      <>
        <h3>{food.name}</h3>
        <div>
          <span>${food.price}</span>
          <button
            className="add"
            onClick={() => {
              addFood();
            }}
          >
            Add
          </button>
        </div>
      </>
    </li>
  );
}
