import React from "react";
import ReactDom from "react-dom/client";
import "./index.css";
const pizzaData = [
  {
    name: "Focaccia",
    ingredients: "Bread with italian olive oil and rosemary",
    price: 6,
    photoName: "pizzas/focaccia.jpg",
    soldOut: false,
  },
  {
    name: "Pizza Margherita",
    ingredients: "Tomato and mozarella",
    price: 10,
    photoName: "pizzas/margherita.jpg",
    soldOut: false,
  },
  {
    name: "Pizza Spinaci",
    ingredients: "Tomato, mozarella, spinach, and ricotta cheese",
    price: 12,
    photoName: "pizzas/spinaci.jpg",
    soldOut: false,
  },
  {
    name: "Pizza Funghi",
    ingredients: "Tomato, mozarella, mushrooms, and onion",
    price: 12,
    photoName: "pizzas/funghi.jpg",
    soldOut: false,
  },
  {
    name: "Pizza Salamino",
    ingredients: "Tomato, mozarella, and pepperoni",
    price: 15,
    photoName: "pizzas/salamino.jpg",
    soldOut: true,
  },
  {
    name: "Pizza Prosciutto",
    ingredients: "Tomato, mozarella, ham, aragula, and burrata cheese",
    price: 18,
    photoName: "pizzas/prosciutto.jpg",
    soldOut: false,
  },
];

function App() {
  return (
    <div className="container">
      <Header></Header>
      <main className="menu">
        <h2>Our Menu</h2>

        {pizzaData.length > 0 ? (
          <>
            <h3>We have WorldClass Collections of Pizza's!!!</h3>
            <ul className="pizzas">
              {pizzaData.map((pizza) => (
                <Pizza pizzaobj={pizza} key={pizza.name} />
              ))}
            </ul>
          </>
        ) : (
          <>
            <h4>Hold ON</h4>
            <h5>We're still working on the menu...</h5>
          </>
        )}
      </main>
      <Footer></Footer>
    </div>
  );
}

function Pizza({ pizzaobj }) {
  console.log(pizzaobj);

  // if (pizzaobj.soldOut) return null;

  return (
    <li className={`pizza ${pizzaobj.soldOut ? "sold-out" : ""}`}>
      <img src={pizzaobj.photoName} alt={pizzaobj.name} />
      <div>
        <h3>{pizzaobj.name}</h3>
        <p>{pizzaobj.ingredients}</p>
        {/* {pizzaobj.soldOut ? (
          <span>SOLD OUT</span>
        ) : (
          <span>{pizzaobj.price}</span>
        )} */}
        <span>{pizzaobj.soldOut ? "SOLD OUT" : pizzaobj.price}</span>
      </div>
    </li>
  );
}

function Header() {
  // const stylesOfHeader = { color: "red", fontSize: 32, fontFamily: "fantasy" };

  return (
    <header className="header">
      <h1>Fast React Pizza Co.</h1>
    </header>
  );
}

const Footer = () => {
  const currentHour = new Date().getHours();
  const openHours = 10;
  const closeHours = 23;
  const isOpen = currentHour >= openHours && currentHour <= closeHours;
  console.log(isOpen);

  return (
    <footer className="footer">
      {/* {new Date().toLocaleTimeString()}
      {isOpen ? ` We're Open now` : ` We're Close now`} */}

      {/* {isOpen && (
        <div className="order">
          <p>We're Open now</p>
          <button className="btn">Order Now</button>
        </div>
      )} */}
      {/* shortcircuit operator(&&) */}

      {isOpen ? (
        <Order closeHours={closeHours} openHours={openHours} />
      ) : (
        <p>
          We're Close now, We're open from {openHours}:00 Hrs to {closeHours}
          :00 Hrs
        </p>
      )}
      {/* Tirnary Operator(?) */}
    </footer>
  );
};

function Order({ openHours, closeHours }) {
  return (
    <div className="order">
      <p>
        We're Open now! Open from {openHours}:00 Hrs to {closeHours}:00 Hrs
      </p>
      <button className="btn">Order Now</button>
    </div>
  );
}

const root = ReactDom.createRoot(document.getElementById("root"));

root.render(
  <React.StrictMode>
    <App></App>
  </React.StrictMode>
);
