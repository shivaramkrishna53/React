import { useState } from "react";
import Logo from "./Logo";
import Form from "./Form";
import PackingList from "./PackingList";
import Stats from "./Stats";
function App() {
  let [itemslst, setItemslst] = useState([]);

  function addItemstoList(newItem) {
    setItemslst((itemslst) => [...itemslst, newItem]);
  }

  function removeItemFromList(id) {
    console.log(id);
    setItemslst((itemslst) => itemslst.filter((item) => item.id !== id));
  }

  function updateToggleItemFromList(id) {
    setItemslst((itemslst) =>
      itemslst.map((item) =>
        item.id === id ? { ...item, packed: !item.packed } : item
      )
    );
  }

  return (
    <div className="App">
      <Logo />
      <Form addItemstoList={addItemstoList} />
      <PackingList
        itemslst={itemslst}
        removeItemFromList={removeItemFromList}
        updateToggleItemFromList={updateToggleItemFromList}
        clearlist={setItemslst}
      />
      <Stats itemslst={itemslst} />
    </div>
  );
}

export default App;
