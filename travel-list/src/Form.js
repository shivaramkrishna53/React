import { useState } from "react";

export default function Form({ addItemstoList }) {
  let [description, setDescription] = useState("");
  let [quantity, setQuantity] = useState(1);

  return (
    <form className="add-form" onSubmit={(e) => handleSubmit(e)}>
      <h3>What you need for your 😍trip?</h3>
      <select
        value={quantity}
        onChange={(e) => setQuantity(Number(e.target.value))}
      >
        {/* <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option> */}

        {Array.from({ length: 20 }, (current, i) => i + 1).map((ele) => (
          <option value={ele} key={ele}>
            {ele}
          </option>
        ))}
      </select>
      <input
        type="text"
        value={description}
        placeholder="Items..."
        onChange={(e) => setDescription(e.target.value)}
      />
      <button>Add</button>
    </form>
  );

  function handleSubmit(e) {
    e.preventDefault();

    if (!description) return;

    let newItem = {
      id: Math.floor(Math.random() * (10000 - 1 + 1)) + 1,
      description,
      quantity,
      packed: false,
    };
    console.log(newItem);
    addItemstoList(newItem);
    setDescription("");
    setQuantity(1);
  }
}
