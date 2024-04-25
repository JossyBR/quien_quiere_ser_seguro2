const { Preguntas } = require("../db");

const deletePreguntas = async (req, res) => {
  try {
    const { id } = req.params;
    const preguntas = await Preguntas.findByPk(id);

    if (!preguntas) throw new Error("No existe una pregunta con este id");

    await preguntas.destroy();
    res.status(200).json({ message: "Pregunta eliminada" });
  } catch (error) {
    console.log(error);

    res
      .status(500)
      .json({ message: error.messages || "Error al eliminar la pregunta" });
  }
};

module.exports = deletePreguntas;
