import "./App.css";
import { useEffect, useState } from "react";

function App() {
  const [fromcurrency, setFromcurrency] = useState("USD");
  const [tocurrency, setToCurrency] = useState("INR");
  const [amount, setAmount] = useState("10");
  const [convertedamount, setConvertedamount] = useState("");
  const [isloading, setIsloading] = useState(false);

  if (!amount) setAmount(1);

  useEffect(
    function () {
      async function docurrencyconvertion() {
        setIsloading(true);
        const resp = await fetch(
          `https://api.frankfurter.app/latest?amount=${amount}&from=${fromcurrency}&to=${tocurrency}`
        );

        if (resp.ok) {
          const data = await resp.json();
          setConvertedamount(data.rates[tocurrency]);
        }
        setIsloading(false);
      }
      if (fromcurrency === tocurrency) return setConvertedamount(amount);

      docurrencyconvertion();
    },
    [amount, fromcurrency, tocurrency]
  );

  return (
    <div className="App">
      <>
        <input
          type="text"
          disabled={isloading}
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />
        <select
          value={fromcurrency}
          disabled={isloading}
          onChange={(e) => setFromcurrency(e.target.value)}
        >
          <option value="USD">USD</option>
          <option value="EUR">EUR</option>
          <option value="CAD">CAD</option>
          <option value="INR">INR</option>
        </select>

        <select
          value={tocurrency}
          disabled={isloading}
          onChange={(e) => setToCurrency(e.target.value)}
        >
          <option value="USD">USD</option>
          <option value="EUR">EUR</option>
          <option value="CAD">CAD</option>
          <option value="INR">INR</option>
        </select>
        <p>{convertedamount + "  " + tocurrency}</p>
        {console.log(
          "amnt::" +
            amount +
            " from curr::" +
            fromcurrency +
            " to curr ::" +
            tocurrency
        )}
      </>
    </div>
  );
}

export default App;
