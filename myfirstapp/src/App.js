import logo from "./logo.svg";
import "./App.css";
import Increment from "./Components/Increment";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "../node_modules/bootstrap/dist/js/bootstrap.bundle";
import { Route, Routes } from "react-router-dom";
import ConditionalRendering from "./Components/ConditionalRendering";
import CakeGallery from "./Components/CakeGallery";
import NavBar from "./Components/NavBar";
import Passport from "./Components/Passport";
import PassportRegualr from "./Components/PassportRegualr";
import PassportTatkal from "./Components/PassportTatkal";
import DisplayClickedCakeDetails from "./Components/DisplayClickedCakeDetails";
import ClassComponentUserDetails from "./Components/ClassComponentUserDetails";
import LifeCycle from "./Components/LifeCycle";
import Form from "./Components/Form";
import Axios from "./Components/Axios";
import WithoutReactContext from "./Components/WithoutReactContext";
import ReactContext from "./Components/ReactContext";

function App() {
  return (
    <div>
      <NavBar></NavBar>
      <Routes>
        <Route path="/" element={<ConditionalRendering />} />
        <Route path="/cakegallery" element={<CakeGallery />} />
        <Route path="/increment" element={<Increment />} />
        <Route path="/conditional" element={<ConditionalRendering />} />
        <Route path="/passport" element={<Passport />}>
          <Route path="/passport/regular" element={<PassportRegualr />} />
          <Route path="/passport/tatkal" element={<PassportTatkal />} />
        </Route>
        <Route
          path="/displaycake/:cakeid/:name/:price"
          element={<DisplayClickedCakeDetails />}
        />
        <Route
          path="/classcomponentuserdetails"
          element={<ClassComponentUserDetails />}
        />
        <Route path="/LifeCycle" element={<LifeCycle />} />
        <Route path="/Form" element={<Form />} />
        <Route path="/Axios" element={<Axios />} />
        <Route path="/WithoutReactContext" element={<WithoutReactContext />} />
        <Route path="/ReactContext" element={<ReactContext />} />
      </Routes>
    </div>
  );
}

export default App;
