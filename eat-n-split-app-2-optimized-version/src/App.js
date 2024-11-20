import { useState } from "react";

function App() {
  let eaters = [
    {
      id: 101,
      name: "joseph",
      imgurl: "https://i.pravatar.cc/48?u=118836",
      amount: 0,
    },
    {
      id: 102,
      name: "emmi",
      imgurl: "https://i.pravatar.cc/48?u=499476",
      amount: 20,
    },
    {
      id: 103,
      name: "dp",
      imgurl: "https://i.pravatar.cc/48?u=933372",
      amount: -30,
    },
  ];

  let [friends, setFriends] = useState(eaters);
  let [showAddFriend, setShowAddFriend] = useState(false);
  let [selectedFriend, setSelectedFriend] = useState(null);

  function handleShowAddFriend() {
    setShowAddFriend((show) => !show);
  }

  function handleAddNewFriend(friend) {
    setFriends((friends) => [...friends, friend]);
    handleShowAddFriend();
  }

  function handleSelectedFriend(friend) {
    console.log("inside handleselected");
    setSelectedFriend((x) => (x?.id === friend.id ? null : friend));
    setShowAddFriend(false);
  }

  return (
    <div className="app">
      <div className="sidebar">
        <FriendsList
          friends={friends}
          handleSelectedFriend={handleSelectedFriend}
          selectedFriend={selectedFriend}
        />

        {showAddFriend && <AddFriend handleAddNewFriend={handleAddNewFriend} />}

        <Button handleonclick={handleShowAddFriend}>
          {showAddFriend ? "Close" : "Add Friend"}
        </Button>
      </div>
      {selectedFriend && (
        <FormSplitBill
          friend={selectedFriend}
          setFriends={setFriends}
          setSelectedFriend={setSelectedFriend}
          key={selectedFriend.id}
        />
      )}
    </div>
  );
}

function FriendsList({ friends, handleSelectedFriend, selectedFriend }) {
  return (
    <ul>
      {friends.map((friend, key) => (
        <Friend
          friend={friend}
          key={key}
          handleSelectedFriend={handleSelectedFriend}
          selectedFriend={selectedFriend}
        />
      ))}
    </ul>
  );
}

function Friend({ friend, handleSelectedFriend, selectedFriend }) {
  let isfriendselected = friend.id === selectedFriend?.id;
  return (
    <li>
      <img src={friend.imgurl} alt={friend.name} />
      <h3>{friend.name}</h3>
      {friend.amount === 0 && (
        <p className="black">You and {friend.name} are even</p>
      )}
      {friend.amount > 0 && (
        <p className="green">
          {friend.name} owes You {Math.abs(friend.amount)} $
        </p>
      )}
      {friend.amount < 0 && (
        <p className="red">
          You owe {friend.name} {Math.abs(friend.amount)} $
        </p>
      )}
      <Button handleonclick={() => handleSelectedFriend(friend)}>
        {isfriendselected ? "Close" : "Select"}
      </Button>
    </li>
  );
}

function AddFriend({ handleAddNewFriend }) {
  let [friendname, setFriendName] = useState("");
  let [imageurl, setImageUrl] = useState("https://i.pravatar.cc/48?u=");
  let generatedid =
    Math.floor(Math.random() * (Math.floor(10000000) - Math.ceil(1) + 1)) +
    Math.ceil(1);

  let newPerson = {
    id: generatedid,
    name: friendname,
    imgurl: imageurl + generatedid,
    amount: 0,
  };
  return (
    <form
      className="form-add-friend"
      onSubmit={(e) => {
        e.preventDefault();
        console.log(newPerson);
        setFriendName("");
        setImageUrl("https://i.pravatar.cc/48?u=");
        handleAddNewFriend(newPerson);
      }}
    >
      <label>🧑‍🤝‍🧑Friend name</label>
      <input
        type="text"
        value={friendname}
        onChange={(e) => setFriendName(e.target.value)}
      ></input>
      <label>🌄Image Url</label>
      <input
        type="text"
        value={imageurl}
        onChange={(e) => setImageUrl(e.target.value)}
      ></input>
      <Button>Add</Button>
    </form>
  );
}

function FormSplitBill({ friend, setFriends, setSelectedFriend, key }) {
  let [bill, setBill] = useState("");
  let [yourexpense, setYourExpense] = useState("");
  let friendexpense = Number(bill - yourexpense);
  let [whoispaying, setWhoIsPaying] = useState("you");
  return (
    <form className="form-split-bill" onSubmit={(e) => handleSplitBill(e)}>
      {key}
      <h2>Split a bill with {friend.name}</h2>

      <label>💲Bill Value</label>
      <input
        type="text"
        value={bill}
        onChange={(e) => setBill(Number(e.target.value))}
      />
      <label>🧔‍♂️ Your Expense</label>
      <input
        type="text"
        value={yourexpense}
        onChange={(e) => setYourExpense(e.target.value)}
      />
      <label>👦 {friend.name}'s Expense</label>
      <input type="text" value={friendexpense} disabled />
      <label>🤑 Who is paying the bill</label>
      <select
        value={whoispaying}
        onChange={(e) => setWhoIsPaying(e.target.value)}
      >
        <option value="you">You</option>
        <option value={friend.name}>{friend.name}</option>
      </select>
      <Button>Split bill</Button>
    </form>
  );

  function handleSplitBill(e) {
    e.preventDefault();
    let amounttobepaid = 0;
    if (whoispaying === "you") amounttobepaid = friendexpense;
    else amounttobepaid = -yourexpense;

    setFriends((friends) =>
      friends.map((x) =>
        x.id === friend.id
          ? { ...x, amount: x.amount + Number(amounttobepaid) }
          : x
      )
    );
    setBill("");
    setYourExpense("");
    setWhoIsPaying("you");
    setSelectedFriend(null);
  }
}

function Button({ children, handleonclick }) {
  return (
    <button className="button" onClick={handleonclick}>
      {children}
    </button>
  );
}

export default App;
