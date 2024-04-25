const { Router } = require("express");
const preguntasRouter = require("./preguntas/preguntas.routes");

const routes = Router();

routes.use("/preguntas", preguntasRouter);

module.exports = routes;
