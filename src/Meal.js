export default function Meal({ meal, makeDefault, defaultMeal }) {
  return (
    <li>
      <button
        className={
          defaultMeal === meal.name ? "right-back meal--button" : "meal--button"
        }
        onClick={() => makeDefault(meal.name)}
      >
        <img src={meal.image} alt={meal.name} />
        <span>{meal.name}</span>
      </button>
    </li>
  );
}
