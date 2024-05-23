import { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/Home/Home";
import FormularioPostEdit from "./Components/FormularioPostEdit/FormularioPostEdit";
import Inicio from "./pages/Inicio/Inicio";
import "./App.css";
import AdminPreguntas from "./pages/Admin/AdminPreguntas";
import DeletePreguntas from "./Components/DeletePreguntas/DeletePreguntas";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Inicio />} />
          <Route path="/juego" element={<Home />} />
          <Route path="/crear" element={<FormularioPostEdit />} />
          <Route path="/editar/:preguntaId" element={<FormularioPostEdit />} />
          <Route path="/admin" element={<AdminPreguntas />} />
          <Route
            path="/admin/eliminar/:preguntaId"
            element={<DeletePreguntas />}
          />
        </Routes>
      </Router>
    </>
  );
}

export default App;
