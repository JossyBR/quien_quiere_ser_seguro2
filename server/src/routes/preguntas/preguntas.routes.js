const postPreguntas = require("../../controllers/postPreguntas");
const getPreguntas = require("../../controllers/getPreguntas");
const updatePreguntas = require("../../controllers/updatePreguntas");

const { Router } = require("express");
const preguntasRouter = Router();

preguntasRouter.post("/", postPreguntas);
preguntasRouter.get("/", getPreguntas);
preguntasRouter.put("/:id", updatePreguntas);

module.exports = preguntasRouter;
