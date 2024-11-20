export function ItemDisplayer({
  item,
  removeItemFromList,
  updateToggleItemFromList,
}) {
  return (
    <li>
      <input
        type="checkbox"
        onChange={() => updateToggleItemFromList(item.id)}
      ></input>
      <span style={item.packed ? { textDecoration: "line-through" } : {}}>
        {item.quantity} {item.description}{" "}
        <button onClick={() => removeItemFromList(item.id)}>❌</button>
      </span>
    </li>
  );
}
