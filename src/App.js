import { useState } from "react";

const meals = [
  { name: "Breakfast", image: "./images/home/breakfast.png" },
  { name: "Lunch", image: "./images/home/lunch.png" },
  { name: "Dinner", image: "./images/home/dinner.png" },
  { name: "Appetizers", image: "./images/home/appetizers.png" },
  { name: "Fishes", image: "./images/home/fishs.png" },
  { name: "Diet", image: "./images/home/diet.png" },
];

const lunch = [
  { name: "Pizza", price: 11, image: "./images/foods/Pizza.jpg" },
  { name: "Kntaki", price: 21, image: "./images/foods/Kntaki.jpg" },
  { name: "Kabab", price: 43, image: "./images/foods/Kabab.jpg" },
  { name: "Burger", price: 6, image: "./images/foods/Burger.jpg" },
  { name: "Qozi", price: 2, image: "./images/foods/Qozi.jpg" },
  { name: "Babaruni", price: 15, image: "./images/foods/Babaruni.jpg" },
  {
    name: "Sandawich Italy",
    price: 8,
    image: "../../images/foods/SandawichItaly.jpg",
  },
  {
    name: "Sandawich",
    price: 5,
    image: "./images/foods/Sandawich.jpg",
  },
  {
    name: "Burger Iraqi",
    price: 10,
    image: "./images/foods/BurgerIraq.jpg",
  },
  { name: "Finger", price: 4, image: "./images/foods/Finger.jpg" },
];

const breakfast = [
  { name: "Strawbery", price: 3, image: "./images/Breakfast/Bayani 1.jpg" },
  { name: "Coffee", price: 9, image: "./images/Breakfast/Bayani 2.jpg" },
  { name: "Fruits", price: 5, image: "./images/Breakfast/Bayani 3.jpg" },
  { name: "Eggs", price: 15, image: "./images/Breakfast/Bayani 4.jpg" },
  { name: "Potato", price: 14, image: "./images/Breakfast/Bayani 5.jpg" },
  { name: "Milkshake", price: 4, image: "./images/Breakfast/Bayani 6.jpg" },

  {
    name: "Capochino",
    price: 1,
    image: "./images/Breakfast/Bayani 7.jpg",
  },
  {
    name: "Sandawich",
    price: 1.6,
    image: "./images/Breakfast/Bayani 8.jpg",
  },
];
const dinner = [
  { name: "Hot Chiken", price: 11, image: "./images/Dinner/1.jpg" },
  { name: "Tomato and Egg", price: 1, image: "./images/Dinner/2.jpg" },
  { name: "Sup", price: 14, image: "./images/Dinner/3.jpg" },
  { name: "Spaketi", price: 7, image: "./images/Dinner/5.jpg" },
  { name: "Stek", price: 6, image: "./images/Dinner/6.jpg" },

  {
    name: "Chiken",
    price: 4,
    image: "./images/Dinner/7.jpg",
  },
  {
    name: "Kabab",
    price: 1,
    image: "./images/Dinner/8.jpg",
  },
];
const appetizers = [
  { name: "Shrin", price: 21, image: "./images/Appetizers/1.jpg" },
  { name: "Nasti", price: 19, image: "./images/Appetizers/2.jpg" },
  { name: "Shars", price: 12, image: "./images/Appetizers/3.jpg" },
  { name: "Nazanm", price: 7, image: "./images/Appetizers/4.jpg" },
  { name: "Afri", price: 12, image: "./images/Appetizers/5.jpg" },
];

export default function App() {
  const [orders, setOrder] = useState([]);
  function removeOrder(ordered) {
    setOrder((orders) =>
      orders.slice().filter((order) => order.foods !== ordered.foods)
    );
  }
  function handleAddFood(foods) {
    const orderExist = orders.some((order) => order.foods === foods.foods);
    if (!orderExist) setOrder((orders) => [...orders, foods]);
    // else handleAddQuantity(foods);
  }

  function handleSearch(search) {
    const word = search.toLowerCase().charAt(0).toUpperCase() + search.slice(1);
    setOrder(
      orders.filter((order) =>
        order.foods === word ? { ...order, foods: word } : order
      )
    );
  }

  function handleAddQuantity(name) {
    const quantity = name.quantity + 1;
    const orderPrice = name.price * quantity;
    setOrder(
      orders.map((order) =>
        order.foods === name.foods
          ? {
              ...order,
              quantity,
              orderPrice,
            }
          : order
      )
    );
  }
  function handleRemoveQuantity(name) {
    const orderPrice = name.orderPrice - name.price;
    setOrder(
      orders.map((order) =>
        order.foods === name.foods
          ? {
              ...order,
              quantity: order.quantity - 1,
              orderPrice,
            }
          : order
      )
    );
  }

  const subtotal = orders.reduce(
    (acc, order, _) =>
      acc + Number(order.orderPrice > 0 ? order.orderPrice : order.price),
    0
  );
  const service = (subtotal / 100) * orders.length;

  const total = service + subtotal;

  const [defaultMeal, setDefaultMeal] = useState("Lunch");
  const [selectedMeal, setSelectedMeal] = useState(false);
  function makeDefault(meal) {
    setDefaultMeal(meal);
    setSelectedMeal(!selectedMeal);
  }

  return (
    <div className="app">
      <Home
        makeDefault={makeDefault}
        defaultMeal={defaultMeal}
        selectedMeal={selectedMeal}
      ></Home>
      <Main
        handleAddFood={handleAddFood}
        handleSearch={handleSearch}
        defaultMeal={defaultMeal}
      ></Main>
      <Orders
        orders={orders}
        subtotal={subtotal}
        service={service}
        total={total}
        setOrder={setOrder}
        handleAddQuantity={handleAddQuantity}
        handleRemoveQuantity={handleRemoveQuantity}
        removeOrder={removeOrder}
      ></Orders>
    </div>
  );
}

function Home({ makeDefault, selectedMeal, defaultMeal }) {
  return (
    <div className="home">
      <Logo></Logo>
      <Meals
        makeDefault={makeDefault}
        selectedMeal={selectedMeal}
        defaultMeal={defaultMeal}
      ></Meals>
    </div>
  );
}

function Logo() {
  return <h1>Restaurant Logo</h1>;
}

function Meals({ makeDefault, selectedMeal, defaultMeal }) {
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

function Meal({ meal, makeDefault, selectedMeal, defaultMeal }) {
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
function Main({ handleAddFood, handleSearch, defaultMeal }) {
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
        {sortFood ? (
          sortFood.map((food) => (
            <Food
              food={food}
              key={food.name}
              handleAddFood={handleAddFood}
            ></Food>
          ))
        ) : (
          <p>Sorry there is no {defaultMeal}!</p>
        )}
      </ul>
    </div>
  );
}

function Food({ food, handleAddFood }) {
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
function Orders({
  orders,
  subtotal,
  total,
  service,
  setOrder,
  handleAddQuantity,
  handleRemoveQuantity,
  removeOrder,
}) {
  return (
    <div className="order">
      <h2>Orders List</h2>
      <ul className="order--lists">
        {orders.map((order) => (
          <Order
            order={order}
            key={order.id}
            handleAddQuantity={handleAddQuantity}
            handleRemoveQuantity={handleRemoveQuantity}
            removeOrder={removeOrder}
          ></Order>
        ))}
      </ul>
      <div className="order--price">
        <div className="subtotal">
          <span className="sub--total">Subtotal: ${subtotal.toFixed(2)}</span>
          <span className="service">Service: {service.toFixed(2)}%</span>
        </div>
        <div className="cancel">
          <Total total={total} />
          <Clear setOrder={setOrder} total={total} />
        </div>
      </div>
    </div>
  );
}

function Order({
  order,
  handleAddQuantity,
  handleRemoveQuantity,
  removeOrder,
}) {
  function onAddFood() {
    handleAddQuantity(order);
  }

  function onRemoveFood() {
    if (order.quantity > 1) handleRemoveQuantity(order);
    else removeOrder(order);
  }
  return (
    <li>
      <img src={order.image} alt={order.name} />
      <div className="orders--names">
        <h4>{order.foods}</h4>
        <div className="adds">
          <span>${order.orderPrice > 0 ? order.orderPrice : order.price}</span>
          <div className="btns">
            <button onClick={onRemoveFood}>-</button>
            <span>{order.quantity}</span>
            <button onClick={onAddFood}>+</button>
          </div>
        </div>
      </div>
    </li>
  );
}

function Total({ total }) {
  return <h1>Total: ${total.toFixed(2)}</h1>;
}

function Clear({ setOrder, total }) {
  return total > 0 ? (
    <button onClick={() => setOrder([])}>Cancel Order</button>
  ) : (
    ""
  );
}
