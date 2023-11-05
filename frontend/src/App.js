import { Routes, Route, Navigate } from "react-router-dom";
import "./App.css";
import Home from "./components/Home/Home";
import Login from "./components/Login/Login";
import Register from "./components/Register/Register";
import Breweries from "./components/Breweries/Breweries";
import BreweryInfo from "./components/BreweryInfo/BreweryInfo";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/breweries" element={<Breweries />} />
      <Route path="/brewery/:id" element={<BreweryInfo />} />
    </Routes>
  );
}

export default App;
