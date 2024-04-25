const postPreguntas = require("../../controllers/postPreguntas");
const getPreguntas = require("../../controllers/getPreguntas");
const updatePreguntas = require("../../controllers/updatePreguntas");
const deletePreguntas = require("../../controllers/deletePreguntas");

const { Router } = require("express");
const preguntasRouter = Router();

preguntasRouter.post("/", postPreguntas);
preguntasRouter.get("/", getPreguntas);
preguntasRouter.put("/:id", updatePreguntas);
preguntasRouter.delete("/:id", deletePreguntas);

module.exports = preguntasRouter;
