const { Preguntas } = require("../db");

const updatePreguntas = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      preguntas,
      respuesta1,
      respuesta2,
      respuesta3,
      respuesta4,
      respuesta_correcta,
    } = req.body;

    //Se verifica que la pregunta exista
    const existPreguntas = await Preguntas.findByPk(id);
    if (!existPreguntas) throw new Error("No existe una pregunta con ese ID");

    await Preguntas.update(
      {
        preguntas,
        respuesta1,
        respuesta2,
        respuesta3,
        respuesta4,
        respuesta_correcta,
      },
      {
        where: { id: id }, // Especificamos la cláusula where correctamente
      }
    );

    // Devolvemos la pregunta actualizada
    // return await Preguntas.findByPk(id);
    return res.status(200).json(updatePreguntas);
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ message: error.message || "Error al actualizar la pregunta" });
  }
};

module.exports = updatePreguntas;
