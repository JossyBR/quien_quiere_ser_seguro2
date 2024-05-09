import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useLocation, useParams } from "react-router-dom";
// import { addPregunta } from "../features/preguntas/preguntasSlice";
import {
  sendPregunta,
  editPregunta,
} from "../features/preguntas/preguntasSlice";

const FormularioPostEdit = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const { preguntaId } = useParams();
  const isEditing = location.pathname.includes("editar");

  const preguntas = useSelector((state) => state.preguntas.preguntas);

  const [form, setForm] = useState({
    preguntas: "",
    respuesta1: "",
    respuesta2: "",
    respuesta3: "",
    respuesta4: "",
    respuesta_correcta: "",
  });

  useEffect(() => {
    if (isEditing && preguntaId) {
      console.log("ID de la pregunta:", preguntaId);
      const pregunta = preguntas.find((p) => p.id === preguntaId);
      console.log("Pregunta encontrada:", pregunta);
      if (pregunta) {
        setForm({
          preguntas: pregunta.preguntas,
          respuesta1: pregunta.respuesta1,
          respuesta2: pregunta.respuesta2,
          respuesta3: pregunta.respuesta3,
          respuesta4: pregunta.respuesta4,
          respuesta_correcta: pregunta.respuesta_correcta,
        });
      } else {
        console.log("Pregunta no encontrada con ID:", preguntaId);
      }
    }
  }, [isEditing, preguntaId, preguntas]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    //1RO VALIDACIÓN
    if (
      !form.preguntas ||
      !form.respuesta1 ||
      !form.respuesta2 ||
      !form.respuesta3 ||
      !form.respuesta4 ||
      !form.respuesta_correcta
    ) {
      alert("Por favor completa todos los campos.");
      return;
    }
    const action = isEditing
      ? editPregunta({ id: preguntaId, ...form })
      : sendPregunta(form);
    dispatch(action);

    // if (isEditing) {
    //   dispatch(editPregunta({ id: preguntaId, ...form }));
    // } else {
    //   dispatch(sendPregunta(form));
    // }
    // Opción de almacenar en Local Storage antes de enviar
    // localStorage.setItem("currentQuestion", JSON.stringify(form));
    // console.log("guardado en Local Storage", form);
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="preguntas">Escribe una pregunta</label>
          <input
            type="text"
            id="preguntas"
            name="preguntas"
            value={form.preguntas}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label htmlFor="respuesta1">Respuesta 1</label>
          <input
            type="text"
            id="respuesta1"
            name="respuesta1"
            value={form.respuesta1}
            onChange={handleChange}
            required
          />
          /{" "}
        </div>
        <div>
          <label htmlFor="respuesta2">Respuesta 2</label>
          <input
            type="text"
            id="respuesta2"
            name="respuesta2"
            value={form.respuesta2}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="respuesta3">Respuesta 3</label>
          <input
            type="text"
            id="respuesta3"
            name="respuesta3"
            value={form.respuesta3}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="respuesta4">Respuesta 4</label>
          <input
            type="text"
            id="respuesta4"
            name="respuesta4"
            value={form.respuesta4}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="respuesta_correcta">
            Escoja la respuesta correcta
          </label>
          <select
            id="respuesta_correcta"
            name="respuesta_correcta"
            value={form.respuesta_correcta}
            onChange={handleChange}
            required
          >
            <option>Seleccione</option>
            {form.respuesta1 && (
              <option value={form.respuesta1}>{form.respuesta1}</option>
            )}
            {form.respuesta2 && (
              <option value={form.respuesta2}>{form.respuesta2}</option>
            )}
            {form.respuesta3 && (
              <option value={form.respuesta3}>{form.respuesta3}</option>
            )}
            {form.respuesta4 && (
              <option value={form.respuesta4}>{form.respuesta4}</option>
            )}
          </select>
        </div>
        <button type="submit">
          {isEditing ? "Editar Pregunta" : "Crear Pregunta"}
        </button>

        {/* <button type="submit">Crear pregunta</button> */}
      </form>
    </div>
  );
};

export default FormularioPostEdit;
