import { useState } from "react";
import Home from "./Home";
import Logo from "./Logo";
import Meals from "./Meals";
import Main from "./Main";
import Orders from "./Orders";

export const meals = [
  { name: "Breakfast", image: "./images/home/breakfast.png" },
  { name: "Lunch", image: "./images/home/lunch.png" },
  { name: "Dinner", image: "./images/home/dinner.png" },
  { name: "Appetizers", image: "./images/home/appetizers.png" },
  { name: "Fishes", image: "./images/home/fishs.png" },
  { name: "Diet", image: "./images/home/diet.png" },
];

export const lunch = [
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

export const breakfast = [
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
export const dinner = [
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
export const appetizers = [
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
      >
        <Logo />
        <Meals
          makeDefault={makeDefault}
          selectedMeal={selectedMeal}
          defaultMeal={defaultMeal}
        ></Meals>
      </Home>

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
