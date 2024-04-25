const { Preguntas } = require("../db");

const getPreguntas = async (req, res) => {
  try {
    const preguntas = await Preguntas.findAll();
    res.status(200).json(preguntas);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "Hubo un error al obtener todas las preguntas" });
  }
};

module.exports = getPreguntas;
