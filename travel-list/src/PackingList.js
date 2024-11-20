import { useState } from "react";
import { ItemDisplayer } from "./ItemDisplayer";

export default function PackingList({
  itemslst,
  removeItemFromList,
  updateToggleItemFromList,
  clearlist,
}) {
  let [sortby, setSortby] = useState("input");

  let sortedlist = [];

  if (sortby === "input") sortedlist = itemslst;

  if (sortby === "description")
    sortedlist = itemslst
      .slice()
      .sort((a, b) => a.description.localeCompare(b.description));

  if (sortby === "packed")
    sortedlist = itemslst.slice().sort((a, b) => a.packed - b.packed);

  return (
    <div className="list">
      <ul>
        {sortedlist.map((item) => (
          <ItemDisplayer
            item={item}
            removeItemFromList={removeItemFromList}
            updateToggleItemFromList={updateToggleItemFromList}
            key={item.id}
          />
        ))}
      </ul>
      <div className="actions">
        <select value={sortby} onChange={(e) => setSortby(e.target.value)}>
          <option value="input">sort by input</option>
          <option value="description">sort by description</option>
          <option value="packed">sort by packed status</option>
        </select>
        <button
          onClick={() => {
            let confirmed = window.confirm(
              "Are you sure you want to delete all items in List?"
            );
            if (confirmed) clearlist([]);
          }}
        >
          clear list
        </button>
      </div>
    </div>
  );
}
