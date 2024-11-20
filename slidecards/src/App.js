import "./styles.css";
import "./App.css";
import { useState } from "react";

const faqs = [
  {
    title: "Where are these chairs assembled?",
    text: "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Accusantium, quaerat temporibus quas dolore provident nisi ut aliquid ratione beatae sequi aspernatur veniam repellendus.",
  },
  {
    title: "How long do I have to return my chair?",
    text: "Pariatur recusandae dignissimos fuga voluptas unde optio nesciunt commodi beatae, explicabo natus.",
  },
  {
    title: "Do you ship to countries outside the EU?",
    text: "Excepturi velit laborum, perspiciatis nemo perferendis reiciendis aliquam possimus dolor sed! Dolore laborum ducimus veritatis facere molestias!",
  },
];
function App() {
  return (
    <div>
      <Accordion data={faqs} />
    </div>
  );
}

function Accordion({ data }) {
  let [currentOpen, SetcurrentOpen] = useState(null);
  return (
    <div className="accordion">
      {data.map((ele, i) => (
        <AccordionItem
          number={i + 1}
          title={ele.title}
          currentOpen={currentOpen}
          SetcurrentOpen={SetcurrentOpen}
          key={i}
        >
          {ele.text}
        </AccordionItem>
      ))}
    </div>
  );
}

function AccordionItem({
  number,
  title,
  currentOpen,
  SetcurrentOpen,
  children,
}) {
  let isOpen = number === currentOpen;
  return (
    <div
      className={`item ${isOpen ? "open" : ""}`}
      onClick={() => {
        isOpen ? SetcurrentOpen(null) : SetcurrentOpen(number);
      }}
    >
      <p className="number">{number < 9 ? `0${number}` : { number }}</p>
      <p className="title">{title}</p>
      <p className="icon">{isOpen ? "-" : "+"}</p>
      {isOpen && <p className="content-box">{children}</p>}
    </div>
  );
}

export default App;
