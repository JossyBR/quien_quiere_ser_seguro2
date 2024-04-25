const postPreguntas = require("../../controllers/postPreguntas");
const getPreguntas = require("../../controllers/getPreguntas");

const { Router } = require("express");
const preguntasRouter = Router();

preguntasRouter.post("/", postPreguntas);
preguntasRouter.get("/", getPreguntas);

module.exports = preguntasRouter;
