//Este archivo configura el servidor Express con todos los middlewares necesarios y las rutas
const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const routes = require("./routes/index.js");
const process = require("process");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");

const app = express();

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true, limit: "50mb" }));
app.use(bodyParser.json({ limit: "50mb" }));
app.use(cookieParser());
app.use(morgan("dev"));

app.use("/", routes);
app.use((err, req, res, next) => {
  const status = err.status || 500;
  const message = err.message || "Internal app Error";
  console.error(err);
  res.status(status).send(message);
});

module.exports = app;
