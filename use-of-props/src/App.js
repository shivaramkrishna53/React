import logo from "./logo.svg";
import "./App.css";
import DisplayIncrementDecrement from "./Components/DisplayIncrementDecrement";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "../node_modules/bootstrap/dist/js/bootstrap.bundle";
import ConditionalRendering from "./Components/ConditionalRendering";
function App() {
  return (
    <div className="App">
      <DisplayIncrementDecrement></DisplayIncrementDecrement>
      <ConditionalRendering></ConditionalRendering>
    </div>
  );
}

export default App;
