import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { addPregunta } from "../features/preguntas/preguntasSlice";

const FormularioPostEdit = () => {
  const dispatch = useDispatch();
  const preguntas = useSelector((state) => state.preguntas);

  const [form, setForm] = useState({
    pregunta: "",
    respuesta1: "",
    respuesta2: "",
    respuesta3: "",
    respuesta4: "",
    respuesta_correcta: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    //1RO VALIDACIÓN
    if (
      !form.pregunta ||
      !form.respuesta1 ||
      !form.respuesta2 ||
      !form.respuesta3 ||
      !form.respuesta4 ||
      !form.respuesta_correcta
    ) {
      alert("Por favor completa todos los campos.");
      return;
    }
    const url = "http://localhost:3001/preguntas/";

    fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json", // Especificamos que el cuerpo de la solicitud es un JSON
      },
      body: JSON.stringify(form), // Convertimos el estado del formulario a JSON
    })
      .then((response) => {
        console.log("response1: ", response);
        if (!response.ok) {
          console.log("response2: ", response);
          throw new Error("Respuesta no exitosa");
        }
        console.log("response3: ", response);
        return response.json();
      })

      .then((data) => {
        console.log("Success:", data);
        alert("Pregunta creada con exito");
        // dispatch(addPregunta(form));
        setForm({
          pregunta: "",
          respuesta1: "",
          respuesta2: "",
          respuesta3: "",
          respuesta4: "",
          respuesta_correcta: "",
        });
      })
      .catch((error) => {
        console.error("Error", error);
        alert("Error al crear la pregunta");
      });

    // Opción de almacenar en Local Storage antes de enviar
    // localStorage.setItem("currentQuestion", JSON.stringify(form));
    // console.log("guardado en Local Storage", form);
  };
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="pregunta">Escribe una pregunta</label>
          <input
            type="text"
            id="pregunta"
            name="pregunta"
            value={form.pregunta}
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

        <button type="submit">Crear pregunta</button>
      </form>
    </div>
  );
};

export default FormularioPostEdit;
