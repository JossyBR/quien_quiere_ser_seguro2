const { Preguntas } = require("../db");
const { v4: uuidv4 } = require("uuid");

const postPreguntas = async (req, res) => {
  try {
    const id = uuidv4();
    const {
      preguntas,
      respuesta1,
      respuesta2,
      respuesta3,
      respuesta4,
      respuesta_correcta,
    } = req.body;

    if (
      !id ||
      !preguntas ||
      !respuesta1 ||
      !respuesta2 ||
      !respuesta3 ||
      !respuesta4 ||
      !respuesta_correcta
    )
      throw new Error("Faltan campos Obligatorios");

    const nuevaPregunta = await Preguntas.create({
      id,
      preguntas,
      respuesta1,
      respuesta2,
      respuesta3,
      respuesta4,
      respuesta_correcta,
    });

    return res.status(201).json(nuevaPregunta);
  } catch (error) {
    console.error("Error al crear la pregunta:", error);
    res
      .status(500)
      .json({ message: error.message || "Error al crear la pregunta" });
  }
};

module.exports = postPreguntas;
