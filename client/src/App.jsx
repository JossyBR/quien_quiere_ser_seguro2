import { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/Home/Home";
import FormularioPostEdit from "./Components/FormularioPostEdit";
import Preguntas from "./pages/Preguntas/Preguntas";
import "./App.css";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/crear" element={<FormularioPostEdit />} />
          <Route path="/juego" element={<Preguntas />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
