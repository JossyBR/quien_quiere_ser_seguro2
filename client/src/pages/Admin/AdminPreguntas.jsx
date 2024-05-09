import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { loadPreguntas } from "../../features/preguntas/preguntasSlice";

const AdminPreguntas = () => {
  const dispatch = useDispatch();
  const preguntas = useSelector((state) => state.preguntas.preguntas);
  console.log("preguntas: ", preguntas);

  useEffect(() => {
    dispatch(loadPreguntas());
  }, [dispatch]);

  const handleDelete = (id) => {
    console.log("Eliminar pregunta con ID:", id);
  };

  return (
    <div>
      <h2>Administrar Preguntas</h2>

      <div>
        <Link to="/juego"> Regresar al juego</Link>
      </div>
      <div>
        <Link to="/crear">Crear Preguntas</Link>
      </div>
      <div>
        <table>
          <thead>
            <tr>
              <th> Preguntas</th>
              <th> Respuesta 1</th>
              <th> Respuesta 2</th>
              <th> Respuesta 3</th>
              <th> Respuesta 4</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {preguntas.map((pregunta) => (
              <tr key={pregunta.id}>
                <td>{pregunta.preguntas}</td>
                <td>{pregunta.respuesta1}</td>
                <td>{pregunta.respuesta2}</td>
                <td>{pregunta.respuesta3}</td>
                <td>{pregunta.respuesta4}</td>
                <td>{pregunta.respuesta_correcta}</td>
                <td>
                  <Link to={`/editar/${pregunta.id}`}>Editar</Link>
                  <button onClick={() => handleDelete(pregunta.id)}>
                    Eliminar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminPreguntas;
