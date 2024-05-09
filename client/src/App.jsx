import { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/Home/Home";
import FormularioPostEdit from "./Components/FormularioPostEdit";
import Preguntas from "./pages/Preguntas/Preguntas";
import "./App.css";
import AdminPreguntas from "./pages/Admin/AdminPreguntas";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/juego" element={<Preguntas />} />
          <Route path="/crear" element={<FormularioPostEdit />} />
          <Route path="/editar/:id" element={<FormularioPostEdit />} />
          <Route path="/admin" element={<AdminPreguntas />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
