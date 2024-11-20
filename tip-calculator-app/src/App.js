import "./App.css";
import { useState } from "react";
function App() {
  return (
    <div>
      <TipCalculator />
    </div>
  );
}

function TipCalculator() {
  let [bill, setBill] = useState("");
  let [mytip, setMytip] = useState("0");
  let [friendtip, setFriendtip] = useState("0");
  let totaltip = (((mytip + friendtip) / 2) * bill) / 100;
  return (
    <div>
      <center>
        <Bill bill={bill} setBill={setBill} />
        <Service text="you" tip={mytip} settip={setMytip} />
        <Service text="your friend" tip={friendtip} settip={setFriendtip} />
        {bill > 0 && (
          <>
            <FinalBill bill={bill} tip={totaltip} />
            <Reset resetAll={resetAll} />
          </>
        )}
      </center>
    </div>
  );

  function resetAll() {
    setBill("");
    setMytip("0");
    setFriendtip("0");
  }
}

function Bill({ bill, setBill }) {
  return (
    <div>
      How much was the bill?
      <input
        type="text"
        placeholder="Bill value"
        value={bill}
        onChange={(e) => setBill(Number(e.target.value))}
      />
    </div>
  );
}

function Service({ text, tip, settip }) {
  return (
    <div>
      <span>How did {text} like the service?</span>
      <select value={tip} onChange={(e) => settip(Number(e.target.value))}>
        <option value="0">Disappointed (0%)</option>
        <option value="5">It was okay (5%)</option>
        <option value="10">It was good (10%)</option>
        <option value="20">Absolutley Amazing! (20%)</option>
      </select>
    </div>
  );
}

function FinalBill({ bill, tip }) {
  let total = bill + tip;
  return (
    <div>
      <b>
        You pay ${total} (${bill} + ${tip})
      </b>
      <br></br>
    </div>
  );
}

function Reset({ resetAll }) {
  return (
    <div>
      <button onClick={resetAll}>RESET🔄️</button>
    </div>
  );
}

export default App;
