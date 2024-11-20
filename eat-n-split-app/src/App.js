import "./App.css";
import { useState } from "react";
import jospeh from "./images/joseph.jpg";
import emmi from "./images/emmi.jpg";
import dp from "./images/dp.jpg";

function App() {
  let eaterslst = [
    {
      name: "joseph",
      imgurl: jospeh,
      amount: 0,
    },
    {
      name: "emmi",
      imgurl: emmi,
      amount: -5,
    },
    { name: "dp", imgurl: dp, amount: 0 },
  ];

  let [splitwisers, setSplitwisers] = useState(eaterslst);

  return (
    <div className="App">
      <center>
        <EatNSplit eaters={splitwisers} modifyeaters={setSplitwisers} />
      </center>
    </div>
  );
}

function EatNSplit({ eaters, modifyeaters }) {
  return (
    <div>
      {eaters.map((eater, curr) => (
        <DisplayEachEater
          eater={eater}
          key={curr}
          modifyeaters={modifyeaters}
        />
      ))}
      <AddNewEater modifyeaters={modifyeaters} />
    </div>
  );
}

function DisplayEachEater({ eater, modifyeaters }) {
  let [isselected, SetIsSelected] = useState(true);
  return (
    <div>
      <img src={eater.imgurl} alt="notfound"></img>
      <br></br>
      <b>{eater.name.toUpperCase()}</b>
      <br></br>
      <div
        style={{
          color:
            eater.amount === 0 ? "black" : eater.amount > 0 ? "green" : "red",
        }}
      >
        {eater.amount === 0
          ? `You and ${eater.name} are even`
          : eater.amount > 0
          ? `${eater.name} owes you ${eater.amount}Ruppes`
          : `You owe ${eater.name} ${Math.abs(eater.amount)} Ruppes`}
      </div>
      {isselected ? (
        <ShowSplitDetails
          isselected={isselected}
          friend={eater}
          modifyeaters={modifyeaters}
        />
      ) : null}
      <button
        onClick={() => {
          SetIsSelected((isselected) => !isselected);
        }}
      >
        {isselected ? `Close` : `SplitNow`}
      </button>
      <br></br>
      <br></br>
      <br></br>
      <h1>==================================================</h1>
    </div>
  );
}

function ShowSplitDetails({ isselected, friend, modifyeaters }) {
  let [bill, setBill] = useState("");
  let [yourexpense, setYourExpense] = useState("");
  let [friendexpense, setFriendExpense] = useState("");
  let [whospayingbill, setWhosPayingBill] = useState("you");
  return (
    <div>
      {isselected ? (
        <>
          <span>
            <h1>SPLIT A BILL WITH {friend.name.toUpperCase()}</h1>
            <h2>💰Bill Value</h2>
            <input
              type="text"
              value={bill}
              onChange={(e) => {
                setBill(Number(e.target.value));
              }}
              onBlur={() => setYourExpense(bill)}
            />
          </span>
          <br></br>
          <span>
            <h2>👦Your Expense</h2>
            <input
              type="text"
              value={yourexpense}
              onChange={(e) => {
                setYourExpense(Number(e.target.value));
              }}
              onBlur={() => setFriendExpense(bill - yourexpense)}
            />
          </span>
          <br></br>
          <span>
            <h2>😊{friend.name} Expense</h2>
            <input
              type="text"
              value={friendexpense}
              onChange={(e) => setFriendExpense(Number(e.target.value))}
              onBlur={() => setYourExpense(bill - friendexpense)}
            />
          </span>
          <br></br>
          <span>
            <h2>Who is paying the bill?</h2>
            <select
              value={whospayingbill}
              onChange={(e) => setWhosPayingBill(e.target.value)}
            >
              <option value="you">You</option>
              <option value={friend.name}>{friend.name}</option>
            </select>
          </span>
          <br></br>
          <br></br>
          <button
            onClick={() => {
              modifyeaters((eaters) =>
                eaters.map((x) =>
                  x.name === friend.name
                    ? {
                        ...friend,
                        amount: x.amount + (yourexpense - friendexpense) / 2,
                      }
                    : x
                )
              );
              setBill("");
              setYourExpense("");
              setFriendExpense("");
              setWhosPayingBill("you");
            }}
          >
            Split bill
          </button>
          <br></br>
          <br></br>
        </>
      ) : null}
    </div>
  );
}

function AddNewEater({ modifyeaters }) {
  let [eatername, setEaterName] = useState("");
  let [eaterimgurl, setEaterImgUrl] = useState("");
  let [closebtn, setCloseBtn] = useState(true);
  return (
    <div>
      {closebtn && (
        <>
          <h1>Want to add a new Eater?</h1>
          🍴Eater Name:
          <span>
            <input
              type="text"
              value={eatername}
              onChange={(e) => {
                setEaterName(e.target.value);
              }}
            />
          </span>
          <br></br>
          🍴😎Eater Image Url:
          <span>
            <input
              type="text"
              value={eaterimgurl}
              onChange={(e) => {
                setEaterImgUrl(e.target.value);
              }}
            />
          </span>
          <button
            onClick={() => {
              let newEater = {
                name: eatername,
                amount: 0,
                imgurl: eaterimgurl,
              };
              setEaterName("");
              setEaterImgUrl("");
              modifyeaters((eaters) => [...eaters, newEater]);
            }}
          >
            Add
          </button>
          <br></br>
        </>
      )}
      <button
        onClick={() => {
          setCloseBtn((closebtn) => !closebtn);
        }}
      >
        {closebtn ? `Close` : `Add a new Eater`}
      </button>
    </div>
  );
}
export default App;
