import { meals } from "./App";
import Meal from "./Meal";

export default function Meals({ makeDefault, selectedMeal, defaultMeal }) {
  return (
    <ul className="lists">
      {meals.map((meal) => (
        <Meal
          meal={meal}
          key={meal.name}
          makeDefault={makeDefault}
          selectedMeal={selectedMeal}
          defaultMeal={defaultMeal}
        ></Meal>
      ))}
    </ul>
  );
}
