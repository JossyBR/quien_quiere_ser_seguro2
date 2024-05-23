import React from "react";
import { Link } from "react-router-dom";

const Inicio = () => {
  return (
    <div className="border">
      <Link to="/juego">Iniciar Juego</Link>
    </div>
  );
};

export default Inicio;
