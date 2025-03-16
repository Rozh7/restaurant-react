export default function Clear({ setOrder, total }) {
  return total > 0 ? (
    <button onClick={() => setOrder([])}>Cancel Order</button>
  ) : (
    ""
  );
}
