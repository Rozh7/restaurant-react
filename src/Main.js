import { useState } from "react";
import { breakfast, lunch, dinner, appetizers } from "./App";
import Food from "./Food";

export default function Main({
  handleAddFood,
  handleSearch,
  defaultMeal,
  allFood,
}) {
  const [sorted, setSorted] = useState("default");
  let foodSelect;
  let sortFood;
  if (defaultMeal === "Breakfast") foodSelect = breakfast;
  if (defaultMeal === "Lunch") foodSelect = lunch;
  if (defaultMeal === "Dinner") foodSelect = dinner;
  if (defaultMeal === "Appetizers") foodSelect = appetizers;

  if (sorted === "default") sortFood = foodSelect;
  if (sorted === "high")
    sortFood = foodSelect.slice().sort((a, b) => a.price - b.price);

  if (sorted === "low")
    sortFood = foodSelect.slice().sort((a, b) => b.price - a.price);
  function onSearch(e) {
    handleSearch(e);
  }

  return (
    <div className="main">
      <div className="main--top">
        <div>
          <input
            type="text"
            placeholder="Search for what do you need?"
            onChange={(e) => onSearch(e.target.value)}
          ></input>
          <button className="search">Search</button>
        </div>
        <span className="date">{new Date().toLocaleDateString()}</span>
      </div>
      <div className="sorts">
        <p>Sorted by</p>
        <select value={sorted} onChange={(e) => setSorted(e.target.value)}>
          <option value="default">Default</option>
          <option value="high">Low to high</option>
          <option value="low">High to low</option>
        </select>
      </div>
      <ul className="lists--food">
        {allFood
          ? allFood.map((food) => (
              <Food
                food={food}
                key={`${food.name} - ${food.price}`}
                handleAddFood={handleAddFood}
              ></Food>
            ))
          : sortFood.map((food) => (
              <Food
                food={food}
                key={food.name}
                handleAddFood={handleAddFood}
              ></Food>
            ))}
      </ul>
    </div>
  );
}
