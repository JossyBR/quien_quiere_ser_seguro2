const crearPreguntas = require("../../controllers/crearPreguntas");

const { Router } = require("express");
const preguntasRouter = Router();

preguntasRouter.post("/", crearPreguntas);

module.exports = preguntasRouter;
