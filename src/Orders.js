// import { Order, Total, Clear } from "./App";
import Order from "./Order";
import Total from "./Total";
import Clear from "./Clear";

export default function Orders({
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
