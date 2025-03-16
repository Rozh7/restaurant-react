export default function Order({
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
